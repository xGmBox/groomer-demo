#!/usr/bin/env python3
"""
Groomer Mini App — Demo
=======================
Запуск:  python demo.py
Mini App у браузері: http://localhost:5050/app?role=groomer
                    http://localhost:5050/app?role=owner
"""
from __future__ import annotations

import asyncio
import os
import traceback
from collections import defaultdict
from contextlib import asynccontextmanager
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any

import aiosqlite
import uvicorn
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

load_dotenv()

# ── Конфіг ───────────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent
DB_FILE = str(ROOT / "salon.db")
PORT = int(os.getenv("PORT", "5050"))
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()
SALON_NAME = os.getenv("SALON_NAME", "Imperial Dog")
SALON_TAGLINE = os.getenv("SALON_TAGLINE", "Grooming & Spa")
SALON_ADDRESS = os.getenv("SALON_ADDRESS", "Zielonka, ul. Kolejowa 25")
SALON_PHONE = os.getenv("SALON_PHONE", "+48 519 356 900")
SALON_HOURS = {
    "uk": [
        ("Понеділок — П'ятниця", "09:00 – 19:00"),
        ("Субота",               "08:00 – 15:00"),
        ("Неділя",               "вихідний"),
    ],
    "pl": [
        ("Poniedziałek — Piątek", "09:00 – 19:00"),
        ("Sobota",                "08:00 – 15:00"),
        ("Niedziela",             "nieczynne"),
    ],
}
GROOMER_TELEGRAM = os.getenv("GROOMER_TELEGRAM", "anna_groomer")

# ── Прайс-лист Imperial Dog (3 послуги × порода). eligible=True → karta stałego klienta ──
PRICE_LIST = [
    {"breed_pl": "Yorkshire terrier",       "breed_uk": "Йоркширський тер'єр",
     "full": "170 zł",     "bath": "60-70 zł",  "care": "100 zł",     "eligible": True},
    {"breed_pl": "Shih tzu",                "breed_uk": "Ши-тцу",
     "full": "190 zł",     "bath": "70 zł",     "care": "150 zł",     "eligible": True},
    {"breed_pl": "Lhasa apso",              "breed_uk": "Лхаса апсо",
     "full": "190-200 zł", "bath": "70 zł",     "care": "150 zł",     "eligible": True},
    {"breed_pl": "Maltańczyk",              "breed_uk": "Мальтійський бішон",
     "full": "190 zł",     "bath": "70 zł",     "care": "150 zł",     "eligible": True},
    {"breed_pl": "Coton de tulear",         "breed_uk": "Котон де тулеар",
     "full": "190-200 zł", "bath": "70 zł",     "care": "150 zł",     "eligible": True},
    {"breed_pl": "Bolończyk",               "breed_uk": "Болонка",
     "full": "190-200 zł", "bath": "70 zł",     "care": "150 zł",     "eligible": True},
    {"breed_pl": "Pekińczyk",               "breed_uk": "Пекінес",
     "full": "180-190 zł", "bath": "50-70 zł",  "care": "90 zł",      "eligible": True},
    {"breed_pl": "Pudel toy / miniatura",   "breed_uk": "Пудель той / міні",
     "full": "200-220 zł", "bath": "80-100 zł", "care": "150 zł",     "eligible": True},
    {"breed_pl": "Pudel średni",            "breed_uk": "Пудель середній",
     "full": "220-250 zł", "bath": "130 zł",    "care": "150-170 zł", "eligible": True},
    {"breed_pl": "Pudel duży",              "breed_uk": "Пудель великий",
     "full": "120 zł/godz","bath": "100 zł/godz","care": "100 zł/godz","eligible": True},
    {"breed_pl": "Bichon frise",            "breed_uk": "Бішон фризе",
     "full": "200-240 zł", "bath": "90-100 zł", "care": "150 zł",     "eligible": True},
    {"breed_pl": "Maltipoo",                "breed_uk": "Мальтіпу",
     "full": "200 zł",     "bath": "70-80 zł",  "care": "150 zł",     "eligible": True},
    {"breed_pl": "Chiński grzywacz",        "breed_uk": "Китайський чубатий",
     "full": "190 zł",     "bath": "70 zł",     "care": "100-150 zł", "eligible": True},
    {"breed_pl": "Chihuahua długowłosy",    "breed_uk": "Чихуахуа довгошерсний",
     "full": "170 zł",     "bath": "50-70 zł",  "care": "—",          "eligible": True},
    {"breed_pl": "Chihuahua krótkowłosa",   "breed_uk": "Чихуахуа короткошерсний",
     "full": "130-140 zł", "bath": "50 zł",     "care": "—",          "eligible": True},
    {"breed_pl": "Papillon",                "breed_uk": "Папільйон",
     "full": "170-180 zł", "bath": "50-70 zł",  "care": "—",          "eligible": True},
    {"breed_pl": "Szpic miniaturowy",       "breed_uk": "Шпіц мініатюрний",
     "full": "160-180 zł", "bath": "70-80 zł",  "care": "—",          "eligible": True},
    {"breed_pl": "Sznaucer miniatura",      "breed_uk": "Шнауцер міні",
     "full": "200 zł / 120 zł/godz", "bath": "70-80 zł", "care": "100-150 zł", "eligible": False},
    {"breed_pl": "Sznaucer średni",         "breed_uk": "Шнауцер середній",
     "full": "220 zł / 120 zł/godz", "bath": "80-100 zł", "care": "150 zł", "eligible": False},
    {"breed_pl": "Sznaucer olbrzym",        "breed_uk": "Шнауцер гігант",
     "full": "120 zł/godz", "bath": "100 zł/godz", "care": "100 zł/godz", "eligible": False},
    {"breed_pl": "West highland white terrier", "breed_uk": "Вест-хайленд",
     "full": "200 zł / 120 zł/godz", "bath": "80 zł", "care": "150 zł", "eligible": False},
    {"breed_pl": "Terier szkocki",          "breed_uk": "Шотландський тер'єр",
     "full": "200-220 zł / 120 zł/godz", "bath": "80 zł", "care": "100-150 zł", "eligible": False},
    {"breed_pl": "Jamnik szorstkowłosy",    "breed_uk": "Такса жорсткошерста",
     "full": "190 zł / 120 zł/godz", "bath": "70 zł", "care": "—", "eligible": False},
    {"breed_pl": "Jack/Parson Russell terrier", "breed_uk": "Джек-рассел тер'єр",
     "full": "120 zł/godz", "bath": "70 zł", "care": "—", "eligible": False},
    {"breed_pl": "Cocker spaniel angielski","breed_uk": "Англійський кокер-спанієль",
     "full": "200-250 zł / 120 zł/godz", "bath": "100 zł", "care": "150-170 zł", "eligible": False},
    {"breed_pl": "Cocker spaniel amerykański", "breed_uk": "Американський кокер-спанієль",
     "full": "200-250 zł / 120 zł/godz", "bath": "100 zł", "care": "150-170 zł", "eligible": False},
    {"breed_pl": "Kawaler King Charles spaniel", "breed_uk": "Кавалер кінг чарльз спанієль",
     "full": "200-250 zł", "bath": "100 zł",    "care": "150 zł",     "eligible": True},
    {"breed_pl": "Foxterrier",              "breed_uk": "Фокстер'єр",
     "full": "200-220 zł / 120 zł/godz", "bath": "80 zł", "care": "100-150 zł", "eligible": False},
    {"breed_pl": "Airedale terrier",        "breed_uk": "Ердельтер'єр",
     "full": "220-250 zł / 120 zł/godz", "bath": "100 zł/godz", "care": "100 zł/godz", "eligible": False},
    {"breed_pl": "Czarny terrier rosyjski", "breed_uk": "Російський чорний тер'єр",
     "full": "120 zł/godz", "bath": "100 zł/godz", "care": "100 zł/godz", "eligible": False},
    {"breed_pl": "Beagle",                  "breed_uk": "Бігль",
     "full": "180 zł",     "bath": "—",         "care": "—",          "eligible": True},
    {"breed_pl": "Buldog angielski",        "breed_uk": "Англійський бульдог",
     "full": "180-190 zł", "bath": "—",         "care": "—",          "eligible": True},
    {"breed_pl": "Buldog francuski",        "breed_uk": "Французький бульдог",
     "full": "140 zł",     "bath": "—",         "care": "—",          "eligible": True},
    {"breed_pl": "Mops",                    "breed_uk": "Мопс",
     "full": "140 zł",     "bath": "—",         "care": "—",          "eligible": True},
    {"breed_pl": "Golden retriever",        "breed_uk": "Голден-ретривер",
     "full": "120 zł/godz", "bath": "—",        "care": "—",          "eligible": False},
    {"breed_pl": "Labrador retriever",      "breed_uk": "Лабрадор-ретривер",
     "full": "200 zł",     "bath": "—",         "care": "—",          "eligible": False},
    {"breed_pl": "Owczarek niemiecki",      "breed_uk": "Німецька вівчарка",
     "full": "120 zł/godz", "bath": "—",        "care": "—",          "eligible": False},
    {"breed_pl": "Husky",                   "breed_uk": "Хаскі",
     "full": "120 zł/godz", "bath": "—",        "care": "—",          "eligible": False},
    {"breed_pl": "Akita Inu",               "breed_uk": "Акіта-іну",
     "full": "200-240 zł", "bath": "—",         "care": "—",          "eligible": False},
    {"breed_pl": "Samoyed",                 "breed_uk": "Самоїд",
     "full": "120 zł/godz", "bath": "—",        "care": "—",          "eligible": False},
    {"breed_pl": "Pieski bezrasowe do 5 kg","breed_uk": "Метиси до 5 кг",
     "full": "180-190 zł", "bath": "70 zł",     "care": "100-150 zł", "eligible": True},
    {"breed_pl": "Pieski bezrasowe do 15 kg","breed_uk": "Метиси до 15 кг",
     "full": "190-200 zł", "bath": "—",         "care": "—",          "eligible": True},
    {"breed_pl": "Pieski bezrasowe od 15 kg","breed_uk": "Метиси понад 15 кг",
     "full": "120 zł/godz", "bath": "—",        "care": "—",          "eligible": True},
]

ADDITIONAL_SERVICES = [
    {"name_pl": "Obcinanie pazurków (mały pies)", "name_uk": "Стрижка кігтів (малий)", "price": "20 zł"},
    {"name_pl": "Obcinanie pazurków (duży pies)", "name_uk": "Стрижка кігтів (великий)", "price": "30 zł"},
    {"name_pl": "Rozczesywanie kołtunów",         "name_uk": "Розчісування ковтунів",    "price": "100 zł/godz"},
    {"name_pl": "Mycie zębów",                    "name_uk": "Чистка зубів",             "price": "20 zł"},
]


def breed_eligible_for_loyalty(breed: str | None) -> bool:
    if not breed:
        return False
    b = breed.lower().strip()
    for item in PRICE_LIST:
        if not item.get("eligible"):
            continue
        if item["breed_pl"].lower() in b or b in item["breed_pl"].lower():
            return True
        if item["breed_uk"].lower() in b or b in item["breed_uk"].lower():
            return True
    return False

# ── Схема ────────────────────────────────────────────────────────────────────
SCHEMA = """
CREATE TABLE IF NOT EXISTS groomers (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT NOT NULL,
    color    TEXT DEFAULT '#8B5E3C',
    is_admin INTEGER DEFAULT 0,
    role     TEXT DEFAULT 'groomer'
);

CREATE TABLE IF NOT EXISTS owners (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    telegram_id  INTEGER UNIQUE,
    name         TEXT NOT NULL,
    phone        TEXT,
    language     TEXT DEFAULT 'pl',
    created_at   TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS pets (
    id                      INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id                INTEGER REFERENCES owners(id) ON DELETE CASCADE,
    name                    TEXT NOT NULL,
    breed                   TEXT,
    birthday                TEXT,
    photo_url               TEXT,
    allergies               TEXT,
    preferred_cut           TEXT,
    notes                   TEXT,
    followup_weeks          INTEGER DEFAULT 6,
    perfumes_ok             INTEGER DEFAULT 1,
    treats_ok               INTEGER DEFAULT 1,
    health_notes            TEXT,
    groomer_note_for_owner  TEXT,
    internal_note           TEXT,
    created_at              TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS visits (
    id                      INTEGER PRIMARY KEY AUTOINCREMENT,
    pet_id                  INTEGER REFERENCES pets(id) ON DELETE CASCADE,
    groomer_id              INTEGER REFERENCES groomers(id),
    visit_date              TEXT NOT NULL,
    service                 TEXT,
    services_json           TEXT,
    cut_style               TEXT,
    price                   REAL,
    notes                   TEXT,
    groomer_note_for_owner  TEXT,
    internal_note           TEXT,
    photo_before            TEXT,
    photo_url               TEXT,
    rating                  INTEGER,
    rating_comment          TEXT,
    created_at              TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS reminders (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    pet_id              INTEGER REFERENCES pets(id) ON DELETE CASCADE,
    groomer_id          INTEGER REFERENCES groomers(id),
    kind                TEXT NOT NULL,
    scheduled_for       TEXT NOT NULL,
    sent_at             TEXT,
    payload             TEXT,
    confirmation_status TEXT,
    requested_by_owner  INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS consents (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id     INTEGER REFERENCES owners(id) ON DELETE CASCADE,
    kind         TEXT NOT NULL,
    consented_at TEXT DEFAULT (datetime('now','localtime'))
);
"""


async def db():
    conn = await aiosqlite.connect(DB_FILE)
    conn.row_factory = aiosqlite.Row
    await conn.execute("PRAGMA foreign_keys = ON")
    return conn


async def db_init():
    async with aiosqlite.connect(DB_FILE) as conn:
        await conn.executescript(SCHEMA)
        # Safe migrations for previously created databases
        for sql in [
            "ALTER TABLE visits ADD COLUMN photo_before TEXT",
            "ALTER TABLE visits ADD COLUMN groomer_id INTEGER",
            "ALTER TABLE visits ADD COLUMN rating INTEGER",
            "ALTER TABLE reminders ADD COLUMN groomer_id INTEGER",
            "ALTER TABLE reminders ADD COLUMN confirmation_status TEXT",
            "ALTER TABLE reminders ADD COLUMN requested_by_owner INTEGER DEFAULT 0",
            "ALTER TABLE groomers ADD COLUMN is_admin INTEGER DEFAULT 0",
            "ALTER TABLE groomers ADD COLUMN role TEXT DEFAULT 'groomer'",
            # v2 → prod migrations
            "ALTER TABLE pets ADD COLUMN perfumes_ok INTEGER DEFAULT 1",
            "ALTER TABLE pets ADD COLUMN treats_ok INTEGER DEFAULT 1",
            "ALTER TABLE pets ADD COLUMN health_notes TEXT",
            "ALTER TABLE pets ADD COLUMN groomer_note_for_owner TEXT",
            "ALTER TABLE pets ADD COLUMN internal_note TEXT",
            "ALTER TABLE visits ADD COLUMN services_json TEXT",
            "ALTER TABLE visits ADD COLUMN groomer_note_for_owner TEXT",
            "ALTER TABLE visits ADD COLUMN internal_note TEXT",
            "ALTER TABLE visits ADD COLUMN rating_comment TEXT",
            "CREATE TABLE IF NOT EXISTS consents (id INTEGER PRIMARY KEY AUTOINCREMENT, owner_id INTEGER REFERENCES owners(id) ON DELETE CASCADE, kind TEXT NOT NULL, consented_at TEXT DEFAULT (datetime('now','localtime')))",
            "ALTER TABLE pets ADD COLUMN loyalty_disabled INTEGER DEFAULT 0",
        ]:
            try:
                await conn.execute(sql)
            except Exception:
                pass
        await conn.commit()


# ── Допоміжне ────────────────────────────────────────────────────────────────
def row_to_dict(row: aiosqlite.Row | None) -> dict[str, Any] | None:
    return dict(row) if row else None


def age_string(birthday: str | None) -> str:
    if not birthday:
        return ""
    try:
        bd = datetime.strptime(birthday, "%Y-%m-%d").date()
    except ValueError:
        return ""
    today = date.today()
    years = today.year - bd.year - ((today.month, today.day) < (bd.month, bd.day))
    if years <= 0:
        months = (today.year - bd.year) * 12 + (today.month - bd.month)
        return f"{max(months, 1)} м"
    return f"{years} р"


def days_until_birthday(birthday: str | None) -> int | None:
    if not birthday:
        return None
    try:
        bd = datetime.strptime(birthday, "%Y-%m-%d").date()
    except ValueError:
        return None
    today = date.today()
    this_year = bd.replace(year=today.year)
    if this_year < today:
        this_year = bd.replace(year=today.year + 1)
    return (this_year - today).days


def loyalty_info(visit_count: int, breed: str | None = None, loyalty_disabled: int = 0) -> dict:
    """Karta stałego klienta: 5-та стрижка -10%, 10-та стрижка -25%.
    Доступна тільки для еліґібельних порід (yellow у прайсі).
    Groomer може вручну вимкнути/увімкнути через loyalty_disabled."""
    eligible = breed_eligible_for_loyalty(breed) and not loyalty_disabled
    base = {"visit_count": visit_count, "eligible": eligible, "loyalty_disabled": bool(loyalty_disabled)}
    if not eligible:
        return {**base, "cycle_position": 0, "next_milestone": 0,
                "visits_to_milestone": 0, "milestone_reached": False, "milestone_discount": 0}
    if visit_count == 0:
        return {**base, "cycle_position": 0, "next_milestone": 5,
                "visits_to_milestone": 5, "milestone_reached": False, "milestone_discount": 10}
    cycle = visit_count % 10
    if cycle == 0:
        return {**base, "cycle_position": 10, "next_milestone": visit_count,
                "visits_to_milestone": 0, "milestone_reached": True, "milestone_discount": 25}
    if cycle == 5:
        return {**base, "cycle_position": 5, "next_milestone": visit_count,
                "visits_to_milestone": 0, "milestone_reached": True, "milestone_discount": 10}
    if cycle < 5:
        return {**base, "cycle_position": cycle,
                "next_milestone": visit_count + (5 - cycle), "visits_to_milestone": 5 - cycle,
                "milestone_reached": False, "milestone_discount": 10}
    return {**base, "cycle_position": cycle,
            "next_milestone": visit_count + (10 - cycle), "visits_to_milestone": 10 - cycle,
            "milestone_reached": False, "milestone_discount": 25}


async def pet_full(conn, pet_id: int) -> dict[str, Any] | None:
    pet_row = await (await conn.execute(
        "SELECT * FROM pets WHERE id=?", (pet_id,)
    )).fetchone()
    if not pet_row:
        return None
    pet = dict(pet_row)
    owner = row_to_dict(await (await conn.execute(
        "SELECT * FROM owners WHERE id=?", (pet["owner_id"],)
    )).fetchone())
    visits = [dict(r) for r in await (await conn.execute(
        "SELECT * FROM visits WHERE pet_id=? ORDER BY visit_date DESC", (pet_id,)
    )).fetchall()]
    upcoming = row_to_dict(await (await conn.execute(
        "SELECT * FROM reminders WHERE pet_id=? AND kind='visit' AND sent_at IS NULL "
        "ORDER BY scheduled_for ASC LIMIT 1", (pet_id,)
    )).fetchone())
    pet["age"] = age_string(pet.get("birthday"))
    pet["days_to_birthday"] = days_until_birthday(pet.get("birthday"))
    pet["owner"] = owner
    pet["visits"] = visits
    pet["next_visit"] = upcoming
    last = visits[0] if visits else None
    pet["last_visit"] = last
    if last:
        last_dt = datetime.strptime(last["visit_date"], "%Y-%m-%d").date()
        pet["weeks_since_last_visit"] = (date.today() - last_dt).days // 7
    else:
        pet["weeks_since_last_visit"] = None
    pet["visit_count"] = len(visits)
    pet["loyalty"] = loyalty_info(len(visits), pet.get("breed"), pet.get("loyalty_disabled", 0))
    return pet


# ── FastAPI ──────────────────────────────────────────────────────────────────
scheduler = AsyncIOScheduler()
bot_app = None


@asynccontextmanager
async def lifespan(_app: FastAPI):
    await db_init()
    async with aiosqlite.connect(DB_FILE) as conn:
        cur = await conn.execute("SELECT COUNT(*) FROM pets")
        count = (await cur.fetchone())[0]
    if count == 0:
        from seed import seed_data
        await seed_data(DB_FILE)
        print("✓ Сід-дані додані")

    global bot_app
    if BOT_TOKEN:
        bot_app = await start_bot()
        print("✓ Telegram-бот запущено")
    else:
        print("ℹ Telegram-бот не налаштовано (порожній TELEGRAM_BOT_TOKEN)")
        print("  Демо повноцінно працює в браузері.")

    scheduler.add_job(dispatch_reminders, "cron", hour=9, minute=0, id="daily_reminders")
    scheduler.start()
    print(f"✓ Планувальник запущено (щодня о 09:00)")
    print(f"\n🐾 {SALON_NAME} — демо запущено")
    print(f"   Грумер: http://localhost:{PORT}/app?role=groomer")
    print(f"   Клієнт: http://localhost:{PORT}/app?role=owner")
    print()
    yield
    scheduler.shutdown(wait=False)
    if bot_app:
        await bot_app["dp"].stop_polling()
        await bot_app["bot"].session.close()


app = FastAPI(lifespan=lifespan, title=f"{SALON_NAME} Demo")
app.mount("/static", StaticFiles(directory=str(ROOT / "static")), name="static")
templates = Jinja2Templates(directory=str(ROOT / "templates"))

_TMPL_CTX = lambda req: {  # noqa: E731
    "request": req,
    "salon_name": SALON_NAME,
    "salon_tagline": SALON_TAGLINE,
    "salon_address": SALON_ADDRESS,
    "salon_phone": SALON_PHONE,
    "salon_hours": SALON_HOURS,
    "groomer_telegram": GROOMER_TELEGRAM,
    "bot_enabled": bool(BOT_TOKEN),
}


# ── Сторінки ─────────────────────────────────────────────────────────────────
@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    try:
        return templates.TemplateResponse("miniapp.html", _TMPL_CTX(request))
    except Exception:
        tb = traceback.format_exc()
        print(tb)
        return HTMLResponse(f"<pre>{tb}</pre>", status_code=500)


@app.get("/app", response_class=HTMLResponse)
async def miniapp(request: Request):
    try:
        return templates.TemplateResponse("miniapp.html", _TMPL_CTX(request))
    except Exception:
        tb = traceback.format_exc()
        print(tb)
        return HTMLResponse(f"<pre>{tb}</pre>", status_code=500)


@app.get("/ping")
async def ping():
    return {"ok": True, "salon": SALON_NAME}


# ── API ──────────────────────────────────────────────────────────────────────
@app.get("/api/config")
async def api_config():
    return {
        "salon_name": SALON_NAME,
        "salon_tagline": SALON_TAGLINE,
        "salon_address": SALON_ADDRESS,
        "salon_phone": SALON_PHONE,
        "salon_hours": SALON_HOURS,
        "groomer_telegram": GROOMER_TELEGRAM,
        "bot_enabled": bool(BOT_TOKEN),
    }


@app.get("/api/groomers")
async def api_groomers():
    conn = await db()
    try:
        rows = await (await conn.execute("SELECT * FROM groomers ORDER BY id")).fetchall()
        return [dict(r) for r in rows]
    finally:
        await conn.close()


@app.get("/api/services")
async def api_services(lang: str = "uk"):
    breed_key = "breed_pl" if lang == "pl" else "breed_uk"
    name_key  = "name_pl"  if lang == "pl" else "name_uk"
    col_uk = ["Повне грумування", "Купання + косметика", "Догляд"]
    col_pl = ["Pełne grooming",   "Kąpiel + kosmetyka",  "Pielęgnacje"]
    columns = col_pl if lang == "pl" else col_uk
    return {
        "columns": columns,
        "rows": [
            {
                "breed": r[breed_key],
                "full": r["full"],
                "bath": r["bath"],
                "care": r["care"],
                "eligible": r["eligible"],
            }
            for r in PRICE_LIST
        ],
        "additional": [
            {"name": r[name_key], "price": r["price"]}
            for r in ADDITIONAL_SERVICES
        ],
    }


class ConfirmIn(BaseModel):
    status: str  # confirmed | rescheduled | cancelled


@app.post("/api/reminders/{reminder_id}/confirm")
async def api_confirm_reminder(reminder_id: int, body: ConfirmIn):
    if body.status not in ("confirmed", "rescheduled", "cancelled"):
        raise HTTPException(400, "Invalid status")
    conn = await db()
    try:
        cur = await conn.execute(
            "UPDATE reminders SET confirmation_status=? WHERE id=?",
            (body.status, reminder_id),
        )
        await conn.commit()
        if cur.rowcount == 0:
            raise HTTPException(404, "Reminder not found")
        return {"ok": True, "status": body.status}
    finally:
        await conn.close()


@app.get("/api/pets")
async def api_pets():
    conn = await db()
    try:
        rows = await (await conn.execute("""
            SELECT p.*, o.name AS owner_name, o.phone AS owner_phone,
                   o.telegram_id AS owner_telegram_id
            FROM pets p
            JOIN owners o ON o.id = p.owner_id
            ORDER BY p.name
        """)).fetchall()
        pets = []
        for r in rows:
            p = dict(r)
            p["age"] = age_string(p.get("birthday"))
            p["days_to_birthday"] = days_until_birthday(p.get("birthday"))
            last = row_to_dict(await (await conn.execute(
                "SELECT * FROM visits WHERE pet_id=? ORDER BY visit_date DESC LIMIT 1", (p["id"],)
            )).fetchone())
            p["last_visit"] = last
            if last:
                last_dt = datetime.strptime(last["visit_date"], "%Y-%m-%d").date()
                p["weeks_since_last_visit"] = (date.today() - last_dt).days // 7
            else:
                p["weeks_since_last_visit"] = None
            next_v = row_to_dict(await (await conn.execute(
                "SELECT * FROM reminders WHERE pet_id=? AND kind='visit' AND sent_at IS NULL "
                "ORDER BY scheduled_for ASC LIMIT 1", (p["id"],)
            )).fetchone())
            p["next_visit"] = next_v
            cnt = await (await conn.execute(
                "SELECT COUNT(*) FROM visits WHERE pet_id=?", (p["id"],)
            )).fetchone()
            p["visit_count"] = cnt[0] if cnt else 0
            p["loyalty"] = loyalty_info(p["visit_count"], p.get("breed"), p.get("loyalty_disabled", 0))
            pets.append(p)
        return pets
    finally:
        await conn.close()


@app.get("/api/pets/{pet_id}")
async def api_pet(pet_id: int):
    conn = await db()
    try:
        pet = await pet_full(conn, pet_id)
        if not pet:
            raise HTTPException(404, "Pet not found")
        return pet
    finally:
        await conn.close()


@app.get("/api/owner/{telegram_id}")
async def api_owner(telegram_id: int):
    conn = await db()
    try:
        owner = row_to_dict(await (await conn.execute(
            "SELECT * FROM owners WHERE telegram_id=?", (telegram_id,)
        )).fetchone())
        if not owner:
            return {"owner": None, "pets": []}
        pets = []
        rows = await (await conn.execute(
            "SELECT id FROM pets WHERE owner_id=?", (owner["id"],)
        )).fetchall()
        for r in rows:
            full = await pet_full(conn, r["id"])
            if full:
                pets.append(full)
        return {"owner": owner, "pets": pets}
    finally:
        await conn.close()


@app.get("/api/schedule")
async def api_schedule_view(date: str = ""):
    target = date if date else datetime.now().date().isoformat()
    conn = await db()
    try:
        groomers = [dict(r) for r in await (await conn.execute(
            "SELECT * FROM groomers ORDER BY id"
        )).fetchall()]
        rows = await (await conn.execute("""
            SELECT r.id, r.pet_id, r.scheduled_for, r.payload AS service,
                   r.groomer_id, r.confirmation_status, r.requested_by_owner,
                   p.name AS pet_name, p.breed, p.photo_url,
                   o.name AS owner_name, o.phone AS owner_phone
            FROM reminders r
            JOIN pets p ON p.id = r.pet_id
            JOIN owners o ON o.id = p.owner_id
            WHERE r.kind='visit'
              AND date(r.scheduled_for) = ?
            ORDER BY r.scheduled_for
        """, (target,))).fetchall()

        visits_by_groomer: dict[int, list] = {g["id"]: [] for g in groomers}
        unassigned = []
        for r in rows:
            rv = dict(r)
            gid = rv.get("groomer_id")
            if gid and gid in visits_by_groomer:
                visits_by_groomer[gid].append(rv)
            else:
                unassigned.append(rv)

        result = []
        for g in groomers:
            gc = dict(g)
            gc["visits"] = visits_by_groomer[g["id"]]
            result.append(gc)

        return {"date": target, "groomers": result, "unassigned": unassigned}
    finally:
        await conn.close()


@app.get("/api/schedule/week")
async def api_schedule_week(start_date: str = ""):
    from datetime import date as _date
    today = _date.today()
    if start_date:
        try:
            week_start = datetime.strptime(start_date, "%Y-%m-%d").date()
        except ValueError:
            week_start = today - timedelta(days=today.weekday())
    else:
        week_start = today - timedelta(days=today.weekday())
    week_end = week_start + timedelta(days=6)

    conn = await db()
    try:
        groomers = [dict(r) for r in await (await conn.execute(
            "SELECT * FROM groomers ORDER BY id"
        )).fetchall()]
        rows = await (await conn.execute("""
            SELECT r.id, r.pet_id, r.scheduled_for, r.payload AS service,
                   r.groomer_id, r.confirmation_status,
                   p.name AS pet_name, p.breed,
                   o.name AS owner_name, o.phone AS owner_phone
            FROM reminders r
            JOIN pets p ON p.id = r.pet_id
            JOIN owners o ON o.id = p.owner_id
            WHERE r.kind='visit'
              AND date(r.scheduled_for) >= ? AND date(r.scheduled_for) <= ?
            ORDER BY r.scheduled_for
        """, (week_start.isoformat(), week_end.isoformat()))).fetchall()

        days: dict[str, list] = {}
        for i in range(7):
            days[(week_start + timedelta(days=i)).isoformat()] = []
        for r in rows:
            rv = dict(r)
            day_key = rv["scheduled_for"][:10]
            if day_key in days:
                days[day_key].append(rv)

        return {
            "week_start": week_start.isoformat(),
            "week_end": week_end.isoformat(),
            "groomers": groomers,
            "days": [{"date": d, "visits": v} for d, v in days.items()],
        }
    finally:
        await conn.close()


@app.get("/api/qr")
async def api_qr(url: str = ""):
    try:
        import qrcode
        import io
        from fastapi.responses import StreamingResponse
        base = os.getenv("PUBLIC_URL", f"http://localhost:{PORT}")
        target = url or f"{base}/app?role=owner"
        qr = qrcode.QRCode(box_size=10, border=4)
        qr.add_data(target)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        buf = io.BytesIO()
        img.save(buf)
        buf.seek(0)
        return StreamingResponse(buf, media_type="image/png")
    except ImportError:
        raise HTTPException(501, "qrcode package not installed. Run: pip install qrcode[pil]")


@app.get("/api/analytics")
async def api_analytics(period: str = "month", is_admin: int = 0):
    # Only groomer accounts with is_admin=1 (Ivanka) may see full analytics
    if not is_admin:
        raise HTTPException(403, "Brak dostępu")

    today = date.today()
    if period == "month":
        start = today.replace(day=1)
        if today.month == 12:
            end = today.replace(year=today.year + 1, month=1, day=1) - timedelta(days=1)
        else:
            end = today.replace(month=today.month + 1, day=1) - timedelta(days=1)
    else:
        first_this = today.replace(day=1)
        end = first_this - timedelta(days=1)
        start = end.replace(day=1)

    conn = await db()
    try:
        visits_rows = await (await conn.execute("""
            SELECT v.visit_date, v.service, v.price, v.rating, v.groomer_id,
                   p.owner_id, o.created_at AS owner_created
            FROM visits v
            JOIN pets p ON p.id = v.pet_id
            JOIN owners o ON o.id = p.owner_id
            WHERE v.visit_date >= ? AND v.visit_date <= ?
        """, (start.isoformat(), end.isoformat()))).fetchall()

        visits_list = [dict(r) for r in visits_rows]
        revenue = sum(v.get("price") or 0 for v in visits_list)
        count = len(visits_list)
        avg = revenue / count if count else 0

        new_owners_row = await (await conn.execute("""
            SELECT COUNT(DISTINCT id) FROM owners
            WHERE date(created_at) >= ? AND date(created_at) <= ?
        """, (start.isoformat(), end.isoformat()))).fetchone()
        new_clients = new_owners_row[0] if new_owners_row else 0

        weekly: dict[str, float] = defaultdict(float)
        for v in visits_list:
            dt = datetime.strptime(v["visit_date"], "%Y-%m-%d").date()
            week_start = dt - timedelta(days=dt.weekday())
            weekly[week_start.isoformat()] += v.get("price") or 0

        revenue_by_week = [
            {"week": w, "revenue": round(r, 2)}
            for w, r in sorted(weekly.items())
        ]

        # Per-groomer breakdown
        groomers_rows = await (await conn.execute("SELECT * FROM groomers ORDER BY id")).fetchall()
        by_groomer = []
        for g in groomers_rows:
            gv = [v for v in visits_list if v.get("groomer_id") == g["id"]]
            gr_rev = sum(v.get("price") or 0 for v in gv)
            gr_ratings = [v["rating"] for v in gv if v.get("rating")]
            by_groomer.append({
                "groomer_id": g["id"],
                "name": g["name"],
                "color": g["color"],
                "visits_count": len(gv),
                "revenue": round(gr_rev, 2),
                "avg_rating": round(sum(gr_ratings) / len(gr_ratings), 1) if gr_ratings else 0,
            })

        # Середній рейтинг загалом
        rating_rows = [r for r in visits_list if r.get("rating")]
        avg_rating = round(sum(r["rating"] for r in rating_rows) / len(rating_rows), 1) if rating_rows else 0

        return {
            "period": period,
            "start": start.isoformat(),
            "end": end.isoformat(),
            "revenue_total": round(revenue, 2),
            "visits_count": count,
            "avg_per_visit": round(avg, 2),
            "new_clients": new_clients,
            "revenue_by_week": revenue_by_week,
            "avg_rating": avg_rating,
            "ratings_count": len(rating_rows),
            "by_groomer": by_groomer,
        }
    finally:
        await conn.close()


class PetIn(BaseModel):
    owner_name: str
    owner_phone: str | None = ""
    owner_telegram_id: int | None = None
    pet_name: str
    breed: str | None = ""
    birthday: str | None = ""
    photo_url: str | None = ""
    allergies: str | None = ""
    preferred_cut: str | None = ""
    notes: str | None = ""
    perfumes_ok: int = 1
    treats_ok: int = 1
    health_notes: str | None = ""
    groomer_note_for_owner: str | None = ""
    internal_note: str | None = ""
    consents: list[str] = []


@app.get("/api/owner-by-phone")
async def api_owner_by_phone(phone: str):
    """Lookup owner by phone number (used on owner login / onboarding duplicate check)."""
    normalized = phone.strip().replace(" ", "").replace("-", "")
    conn = await db()
    try:
        row = await (await conn.execute(
            "SELECT * FROM owners WHERE replace(replace(phone,' ',''),'-','')=?",
            (normalized,)
        )).fetchone()
        if not row:
            return {"found": False}
        owner = dict(row)
        pets = []
        pet_rows = await (await conn.execute(
            "SELECT id FROM pets WHERE owner_id=?", (owner["id"],)
        )).fetchall()
        for pr in pet_rows:
            full = await pet_full(conn, pr["id"])
            if full:
                pets.append(full)
        return {"found": True, "owner": owner, "pets": pets}
    finally:
        await conn.close()


class ConsentsIn(BaseModel):
    owner_id: int
    kinds: list[str]


@app.post("/api/consents")
async def api_save_consents(body: ConsentsIn):
    conn = await db()
    try:
        for kind in body.kinds:
            existing = await (await conn.execute(
                "SELECT id FROM consents WHERE owner_id=? AND kind=?",
                (body.owner_id, kind)
            )).fetchone()
            if not existing:
                await conn.execute(
                    "INSERT INTO consents (owner_id, kind) VALUES (?,?)",
                    (body.owner_id, kind)
                )
        await conn.commit()
        return {"ok": True}
    finally:
        await conn.close()


@app.get("/api/consents/{owner_id}")
async def api_get_consents(owner_id: int):
    conn = await db()
    try:
        rows = await (await conn.execute(
            "SELECT kind, consented_at FROM consents WHERE owner_id=?", (owner_id,)
        )).fetchall()
        return [dict(r) for r in rows]
    finally:
        await conn.close()


@app.post("/api/pets")
async def api_create_pet(body: PetIn):
    conn = await db()
    try:
        owner_id = None
        if body.owner_phone:
            normalized = body.owner_phone.strip().replace(" ", "").replace("-", "")
            row = await (await conn.execute(
                "SELECT id FROM owners WHERE replace(replace(phone,' ',''),'-','')=?",
                (normalized,)
            )).fetchone()
            if row:
                owner_id = row["id"]
                await conn.execute(
                    "UPDATE owners SET name=? WHERE id=?",
                    (body.owner_name, owner_id),
                )
        if owner_id is None and body.owner_telegram_id:
            row = await (await conn.execute(
                "SELECT id FROM owners WHERE telegram_id=?", (body.owner_telegram_id,)
            )).fetchone()
            if row:
                owner_id = row["id"]
        if owner_id is None:
            cur = await conn.execute(
                "INSERT INTO owners (telegram_id, name, phone, language) VALUES (?,?,?,?)",
                (body.owner_telegram_id, body.owner_name, body.owner_phone, "pl"),
            )
            owner_id = cur.lastrowid

        cur = await conn.execute("""
            INSERT INTO pets (owner_id, name, breed, birthday, photo_url,
                              allergies, preferred_cut, notes,
                              perfumes_ok, treats_ok, health_notes,
                              groomer_note_for_owner, internal_note)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
        """, (
            owner_id, body.pet_name, body.breed, body.birthday or None,
            body.photo_url, body.allergies, body.preferred_cut, body.notes,
            body.perfumes_ok, body.treats_ok, body.health_notes or None,
            body.groomer_note_for_owner or None, body.internal_note or None,
        ))
        pet_id = cur.lastrowid
        for kind in body.consents:
            await conn.execute(
                "INSERT INTO consents (owner_id, kind) VALUES (?,?)",
                (owner_id, kind)
            )
        await conn.commit()
        return await pet_full(conn, pet_id)
    finally:
        await conn.close()


@app.put("/api/pets/{pet_id}")
async def api_update_pet(pet_id: int, body: PetIn):
    conn = await db()
    try:
        pet = row_to_dict(await (await conn.execute(
            "SELECT * FROM pets WHERE id=?", (pet_id,)
        )).fetchone())
        if not pet:
            raise HTTPException(404, "Pet not found")
        await conn.execute("""
            UPDATE pets SET name=?, breed=?, birthday=?, photo_url=?,
                            allergies=?, preferred_cut=?, notes=?,
                            perfumes_ok=?, treats_ok=?, health_notes=?,
                            groomer_note_for_owner=?, internal_note=?
            WHERE id=?
        """, (
            body.pet_name, body.breed, body.birthday or None, body.photo_url,
            body.allergies, body.preferred_cut, body.notes,
            body.perfumes_ok, body.treats_ok, body.health_notes or None,
            body.groomer_note_for_owner or None, body.internal_note or None,
            pet_id,
        ))
        await conn.execute(
            "UPDATE owners SET name=?, phone=? WHERE id=?",
            (body.owner_name, body.owner_phone, pet["owner_id"]),
        )
        await conn.commit()
        return await pet_full(conn, pet_id)
    finally:
        await conn.close()


@app.patch("/api/pets/{pet_id}/loyalty")
async def api_toggle_loyalty(pet_id: int, request: Request):
    """Groomer toggle: enable/disable loyalty card for a specific pet."""
    body = await request.json()
    disabled = 1 if body.get("disabled") else 0
    conn = await db()
    try:
        await conn.execute(
            "UPDATE pets SET loyalty_disabled=? WHERE id=?", (disabled, pet_id)
        )
        await conn.commit()
        return await pet_full(conn, pet_id)
    finally:
        await conn.close()


class VisitIn(BaseModel):
    visit_date: str
    service: str = ""
    services_json: str | None = ""
    cut_style: str | None = ""
    price: float | None = 0
    notes: str | None = ""
    groomer_note_for_owner: str | None = ""
    internal_note: str | None = ""
    photo_before: str | None = ""
    photo_url: str | None = ""
    rating: int | None = None
    rating_comment: str | None = ""
    groomer_id: int | None = None
    schedule_followup: bool = True


class RatingIn(BaseModel):
    rating: int
    rating_comment: str | None = ""


@app.post("/api/visits/{visit_id}/rate")
async def api_rate_visit(visit_id: int, body: RatingIn):
    if not 1 <= body.rating <= 5:
        raise HTTPException(400, "Rating must be 1–5")
    conn = await db()
    try:
        cur = await conn.execute(
            "UPDATE visits SET rating=?, rating_comment=? WHERE id=?",
            (body.rating, body.rating_comment or None, visit_id)
        )
        await conn.commit()
        if cur.rowcount == 0:
            raise HTTPException(404, "Visit not found")
        return {"ok": True}
    finally:
        await conn.close()


@app.post("/api/pets/{pet_id}/visits")
async def api_add_visit(pet_id: int, body: VisitIn):
    conn = await db()
    try:
        pet = row_to_dict(await (await conn.execute(
            "SELECT * FROM pets WHERE id=?", (pet_id,)
        )).fetchone())
        if not pet:
            raise HTTPException(404, "Pet not found")
        await conn.execute("""
            INSERT INTO visits
              (pet_id, groomer_id, visit_date, service, services_json, cut_style,
               price, notes, groomer_note_for_owner, internal_note,
               photo_before, photo_url, rating, rating_comment)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        """, (
            pet_id, body.groomer_id, body.visit_date, body.service,
            body.services_json or None, body.cut_style, body.price, body.notes,
            body.groomer_note_for_owner or None, body.internal_note or None,
            body.photo_before or None, body.photo_url or None,
            body.rating, body.rating_comment or None,
        ))
        if body.schedule_followup:
            visit_dt = datetime.strptime(body.visit_date, "%Y-%m-%d").date()
            followup = visit_dt + timedelta(weeks=pet.get("followup_weeks") or 6)
            await conn.execute("""
                INSERT INTO reminders (pet_id, kind, scheduled_for)
                VALUES (?, 'followup', ?)
            """, (pet_id, followup.isoformat()))
        await conn.commit()
        return await pet_full(conn, pet_id)
    finally:
        await conn.close()


class NextVisitIn(BaseModel):
    visit_date: str
    service: str | None = "Стрижка"
    groomer_id: int | None = None
    requested_by_owner: bool = False


@app.post("/api/pets/{pet_id}/schedule")
async def api_schedule(pet_id: int, body: NextVisitIn):
    conn = await db()
    try:
        pet = row_to_dict(await (await conn.execute(
            "SELECT * FROM pets WHERE id=?", (pet_id,)
        )).fetchone())
        if not pet:
            raise HTTPException(404, "Pet not found")
        try:
            visit_dt = datetime.strptime(body.visit_date, "%Y-%m-%d %H:%M")
        except ValueError:
            visit_dt = datetime.strptime(body.visit_date, "%Y-%m-%d")
        await conn.execute(
            "DELETE FROM reminders WHERE pet_id=? AND kind='visit' AND sent_at IS NULL",
            (pet_id,),
        )
        await conn.execute("""
            INSERT INTO reminders
              (pet_id, kind, scheduled_for, payload, groomer_id, requested_by_owner, confirmation_status)
            VALUES (?, 'visit', ?, ?, ?, ?, ?)
        """, (
            pet_id, visit_dt.isoformat(sep=" "), body.service, body.groomer_id,
            1 if body.requested_by_owner else 0,
            None,
        ))
        await conn.commit()
        return await pet_full(conn, pet_id)
    finally:
        await conn.close()


@app.get("/api/reminders/preview/{pet_id}/{kind}")
async def api_preview_reminder(pet_id: int, kind: str):
    conn = await db()
    try:
        pet = await pet_full(conn, pet_id)
        if not pet:
            raise HTTPException(404, "Pet not found")
        text = render_reminder(pet, kind)
        return {"text": text, "kind": kind}
    finally:
        await conn.close()


@app.post("/api/reminders/send/{pet_id}/{kind}")
async def api_send_reminder(pet_id: int, kind: str):
    conn = await db()
    try:
        pet = await pet_full(conn, pet_id)
        if not pet:
            raise HTTPException(404, "Pet not found")
        text = render_reminder(pet, kind)
        sent = False
        if bot_app and pet["owner"].get("telegram_id"):
            try:
                await bot_app["bot"].send_message(pet["owner"]["telegram_id"], text)
                sent = True
            except Exception as e:
                return {"sent": False, "text": text, "error": str(e)}
        await conn.execute("""
            INSERT INTO reminders (pet_id, kind, scheduled_for, sent_at, payload)
            VALUES (?, ?, ?, datetime('now','localtime'), ?)
        """, (pet_id, kind, datetime.now().isoformat(sep=" "), text))
        await conn.commit()
        return {"sent": sent, "text": text}
    finally:
        await conn.close()


# ── Шаблони нагадувань ───────────────────────────────────────────────────────
def render_reminder(pet: dict, kind: str, lang: str | None = None) -> str:
    owner = pet.get("owner") or {}
    name = owner.get("name", "")
    pet_name = pet["name"]
    if lang is None:
        lang = (owner.get("language") or "uk").lower()
    pl = lang == "pl"

    if kind == "visit":
        nv = pet.get("next_visit")
        time_str = ""
        if nv:
            try:
                dt = datetime.fromisoformat(nv["scheduled_for"])
                time_str = dt.strftime("%H:%M")
            except Exception:
                pass
        if pl:
            when = f"jutro o {time_str}" if time_str else "jutro"
            return (
                f"Dzień dobry, {name}.\n"
                f"Uprzejmie przypominamy, że {when} czekamy na Państwa psa {pet_name} "
                f"w {SALON_NAME}.\n"
                f"📍 {SALON_ADDRESS}\n"
                f"📞 {SALON_PHONE}\n\n"
                f"Jeśli plany się zmieniły — prosimy napisać lub zadzwonić."
            )
        when = f"завтра о {time_str}" if time_str else "завтра"
        return (
            f"Доброго дня, {name}.\n"
            f"Нагадуємо: {when} чекаємо на {pet_name} в {SALON_NAME}.\n"
            f"📍 {SALON_ADDRESS}\n"
            f"📞 {SALON_PHONE}\n\n"
            f"Якщо плани змінились — напишіть або зателефонуйте."
        )
    if kind == "birthday":
        if pl:
            return (
                f"Dzień dobry, {name}.\n"
                f"Dziś {pet_name} obchodzi urodziny! 🎂\n\n"
                f"Gratulujemy i zapraszamy w tym tygodniu — 15% zniżki "
                f"na dowolną usługę dla solenizanta.\n"
                f"📞 {SALON_PHONE}"
            )
        return (
            f"Доброго дня, {name}.\n"
            f"Сьогодні {pet_name} святкує день народження! 🎂\n\n"
            f"Вітаємо і запрошуємо цього тижня — знижка 15% "
            f"на будь-яку послугу для іменинника.\n"
            f"📞 {SALON_PHONE}"
        )
    if kind == "followup":
        weeks = pet.get("weeks_since_last_visit") or pet.get("followup_weeks", 6)
        if pl:
            return (
                f"Dzień dobry, {name}.\n"
                f"Minęło już {weeks} tygodni od ostatniej wizyty {pet_name} "
                f"w {SALON_NAME}.\n"
                f"Czas na kolejne strzyżenie? Zapraszamy do kontaktu.\n"
                f"📞 {SALON_PHONE}"
            )
        return (
            f"Доброго дня, {name}.\n"
            f"Минуло вже {weeks} тижнів від останнього візиту {pet_name} "
            f"в {SALON_NAME}.\n"
            f"Час на нову стрижку? Запрошуємо зв'язатись.\n"
            f"📞 {SALON_PHONE}"
        )
    return f"Reminder for {pet_name}."


# ── Планувальник ─────────────────────────────────────────────────────────────
async def dispatch_reminders():
    today = date.today()
    tomorrow = today + timedelta(days=1)
    conn = await db()
    try:
        rows = await (await conn.execute("""
            SELECT * FROM reminders
            WHERE kind='visit' AND sent_at IS NULL
              AND date(scheduled_for) = ?
        """, (tomorrow.isoformat(),))).fetchall()
        for r in rows:
            await _send_due_reminder(conn, dict(r))

        pets = await (await conn.execute(
            "SELECT * FROM pets WHERE birthday IS NOT NULL"
        )).fetchall()
        for p in pets:
            bd = p["birthday"]
            if not bd:
                continue
            try:
                bd_date = datetime.strptime(bd, "%Y-%m-%d").date()
            except ValueError:
                continue
            if (bd_date.month, bd_date.day) == (today.month, today.day):
                exists = await (await conn.execute("""
                    SELECT 1 FROM reminders
                    WHERE pet_id=? AND kind='birthday'
                      AND date(sent_at)=date('now','localtime')
                """, (p["id"],))).fetchone()
                if exists:
                    continue
                cur = await conn.execute("""
                    INSERT INTO reminders (pet_id, kind, scheduled_for)
                    VALUES (?, 'birthday', ?)
                """, (p["id"], today.isoformat()))
                await _send_due_reminder(conn, {
                    "id": cur.lastrowid, "pet_id": p["id"], "kind": "birthday"
                })

        rows = await (await conn.execute("""
            SELECT * FROM reminders
            WHERE kind='followup' AND sent_at IS NULL
              AND date(scheduled_for) <= ?
        """, (today.isoformat(),))).fetchall()
        for r in rows:
            await _send_due_reminder(conn, dict(r))

        await conn.commit()
    finally:
        await conn.close()


async def _send_due_reminder(conn, reminder: dict):
    pet = await pet_full(conn, reminder["pet_id"])
    if not pet:
        return
    text = render_reminder(pet, reminder["kind"])
    sent = False
    if bot_app and pet["owner"].get("telegram_id"):
        try:
            await bot_app["bot"].send_message(pet["owner"]["telegram_id"], text)
            sent = True
        except Exception as e:
            print(f"⚠ Не вдалось надіслати нагадування: {e}")
    await conn.execute(
        "UPDATE reminders SET sent_at=datetime('now','localtime'), payload=? WHERE id=?",
        (text, reminder["id"]),
    )
    print(f"  → {reminder['kind']} для {pet['name']} {'(надіслано)' if sent else '(демо)'}")


# ── Telegram-бот (опційно) ───────────────────────────────────────────────────
async def start_bot():
    from aiogram import Bot, Dispatcher, F
    from aiogram.filters import Command
    from aiogram.types import (
        InlineKeyboardButton, InlineKeyboardMarkup, Message, WebAppInfo
    )

    bot = Bot(token=BOT_TOKEN)
    dp = Dispatcher()
    me = await bot.get_me()
    base_url = os.getenv("PUBLIC_URL", f"http://localhost:{PORT}")

    def app_kb(role: str = "owner"):
        return InlineKeyboardMarkup(inline_keyboard=[[
            InlineKeyboardButton(
                text=("🐾 Відкрити мою картку" if role == "owner" else "📋 Дашборд грумера"),
                web_app=WebAppInfo(url=f"{base_url}/app?role={role}"),
            )
        ]])

    @dp.message(Command("start"))
    async def on_start(msg: Message):
        if not msg.from_user:
            return
        await msg.answer(
            f"Привіт! Ласкаво просимо до *{SALON_NAME}* 🐶\n\n"
            f"Натисніть кнопку нижче, щоб заповнити картку улюбленця.",
            parse_mode="Markdown",
            reply_markup=app_kb("owner"),
        )

    @dp.message(Command("groomer"))
    async def on_groomer(msg: Message):
        await msg.answer("📋 Панель грумера", reply_markup=app_kb("groomer"))

    @dp.message(F.text)
    async def on_text(msg: Message):
        await msg.answer(
            "Скористайтесь кнопкою нижче, щоб відкрити картку 🐾",
            reply_markup=app_kb("owner"),
        )

    asyncio.create_task(dp.start_polling(bot, skip_updates=True))
    print(f"  Бот: @{me.username}")
    return {"bot": bot, "dp": dp}


# ── Запуск ───────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT, log_level="warning")
