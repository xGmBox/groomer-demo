#!/usr/bin/env python3
"""
Groomer Mini App — Demo
=======================
Запуск:  python demo.py
Mini App у браузері: http://localhost:5050/app?role=groomer
                    http://localhost:5050/app?role=owner

Якщо в .env заданий TELEGRAM_BOT_TOKEN — додатково підіймається бот
з кнопкою Mini App та щоденним планувальником нагадувань.
"""
from __future__ import annotations

import asyncio
import os
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
SALON_NAME = os.getenv("SALON_NAME", "Pawfect Studio")
SALON_ADDRESS = os.getenv("SALON_ADDRESS", "ul. Kwiatowa 12, Warszawa")
GROOMER_TELEGRAM = os.getenv("GROOMER_TELEGRAM", "anna_groomer")

# ── Схема ────────────────────────────────────────────────────────────────────
SCHEMA = """
CREATE TABLE IF NOT EXISTS owners (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    telegram_id  INTEGER UNIQUE,
    name         TEXT NOT NULL,
    phone        TEXT,
    language     TEXT DEFAULT 'uk',
    created_at   TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS pets (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id        INTEGER REFERENCES owners(id) ON DELETE CASCADE,
    name            TEXT NOT NULL,
    breed           TEXT,
    birthday        TEXT,
    photo_url       TEXT,
    allergies       TEXT,
    preferred_cut   TEXT,
    notes           TEXT,
    followup_weeks  INTEGER DEFAULT 6,
    created_at      TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS visits (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    pet_id      INTEGER REFERENCES pets(id) ON DELETE CASCADE,
    visit_date  TEXT NOT NULL,
    service     TEXT,
    cut_style   TEXT,
    price       REAL,
    notes       TEXT,
    photo_url   TEXT,
    created_at  TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS reminders (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    pet_id        INTEGER REFERENCES pets(id) ON DELETE CASCADE,
    kind          TEXT NOT NULL,
    scheduled_for TEXT NOT NULL,
    sent_at       TEXT,
    payload       TEXT
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
    return pet


# ── FastAPI ──────────────────────────────────────────────────────────────────
scheduler = AsyncIOScheduler()
bot_app = None  # заповнюється у lifespan, якщо є токен


@asynccontextmanager
async def lifespan(_app: FastAPI):
    await db_init()
    # сід даних, якщо БД порожня
    async with aiosqlite.connect(DB_FILE) as conn:
        cur = await conn.execute("SELECT COUNT(*) FROM pets")
        count = (await cur.fetchone())[0]
    if count == 0:
        from seed import seed_data
        await seed_data(DB_FILE)
        print("✓ Сід-дані додані")

    # бот (опційно)
    global bot_app
    if BOT_TOKEN:
        bot_app = await start_bot()
        print("✓ Telegram-бот запущено")
    else:
        print("ℹ Telegram-бот не налаштовано (порожній TELEGRAM_BOT_TOKEN)")
        print("  Демо повноцінно працює в браузері — нагадування показуються у попередньому перегляді.")

    # планувальник нагадувань
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

@app.middleware("http")
async def skip_ngrok_banner(request: Request, call_next):
    response = await call_next(request)
    response.headers["ngrok-skip-browser-warning"] = "true"
    return response


# ── Сторінки ─────────────────────────────────────────────────────────────────
@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("miniapp.html", {
        "request": request,
        "salon_name": SALON_NAME,
        "salon_address": SALON_ADDRESS,
        "groomer_telegram": GROOMER_TELEGRAM,
    })


@app.get("/app", response_class=HTMLResponse)
async def miniapp(request: Request):
    return templates.TemplateResponse("miniapp.html", {
        "request": request,
        "salon_name": SALON_NAME,
        "salon_address": SALON_ADDRESS,
        "groomer_telegram": GROOMER_TELEGRAM,
        "bot_enabled": bool(BOT_TOKEN),
    })


# ── API ──────────────────────────────────────────────────────────────────────
@app.get("/api/config")
async def api_config():
    return {
        "salon_name": SALON_NAME,
        "salon_address": SALON_ADDRESS,
        "groomer_telegram": GROOMER_TELEGRAM,
        "bot_enabled": bool(BOT_TOKEN),
    }


@app.get("/api/pets")
async def api_pets():
    """Список усіх собак з власниками — для дашборду грумера."""
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
    """Знаходить власника за telegram_id (для режиму клієнта в боті)."""
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


@app.post("/api/pets")
async def api_create_pet(body: PetIn):
    """Створення нової картки з анкети клієнта."""
    conn = await db()
    try:
        owner_id = None
        if body.owner_telegram_id:
            row = await (await conn.execute(
                "SELECT id FROM owners WHERE telegram_id=?", (body.owner_telegram_id,)
            )).fetchone()
            if row:
                owner_id = row["id"]
                await conn.execute(
                    "UPDATE owners SET name=?, phone=? WHERE id=?",
                    (body.owner_name, body.owner_phone, owner_id),
                )
        if owner_id is None:
            cur = await conn.execute(
                "INSERT INTO owners (telegram_id, name, phone) VALUES (?,?,?)",
                (body.owner_telegram_id, body.owner_name, body.owner_phone),
            )
            owner_id = cur.lastrowid

        cur = await conn.execute("""
            INSERT INTO pets (owner_id, name, breed, birthday, photo_url,
                              allergies, preferred_cut, notes)
            VALUES (?,?,?,?,?,?,?,?)
        """, (
            owner_id, body.pet_name, body.breed, body.birthday or None,
            body.photo_url, body.allergies, body.preferred_cut, body.notes,
        ))
        pet_id = cur.lastrowid
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
                            allergies=?, preferred_cut=?, notes=?
            WHERE id=?
        """, (
            body.pet_name, body.breed, body.birthday or None, body.photo_url,
            body.allergies, body.preferred_cut, body.notes, pet_id,
        ))
        await conn.execute(
            "UPDATE owners SET name=?, phone=? WHERE id=?",
            (body.owner_name, body.owner_phone, pet["owner_id"]),
        )
        await conn.commit()
        return await pet_full(conn, pet_id)
    finally:
        await conn.close()


class VisitIn(BaseModel):
    visit_date: str  # YYYY-MM-DD
    service: str
    cut_style: str | None = ""
    price: float | None = 0
    notes: str | None = ""
    schedule_followup: bool = True


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
            INSERT INTO visits (pet_id, visit_date, service, cut_style, price, notes)
            VALUES (?,?,?,?,?,?)
        """, (pet_id, body.visit_date, body.service, body.cut_style, body.price, body.notes))
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
    visit_date: str  # YYYY-MM-DD HH:MM
    service: str | None = "Стрижка"


@app.post("/api/pets/{pet_id}/schedule")
async def api_schedule(pet_id: int, body: NextVisitIn):
    """Запланувати наступний візит → створює reminder на день до."""
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
        # видалимо попередні незавершені нагадування цього типу
        await conn.execute(
            "DELETE FROM reminders WHERE pet_id=? AND kind='visit' AND sent_at IS NULL",
            (pet_id,),
        )
        await conn.execute("""
            INSERT INTO reminders (pet_id, kind, scheduled_for, payload)
            VALUES (?, 'visit', ?, ?)
        """, (pet_id, visit_dt.isoformat(sep=" "), body.service))
        await conn.commit()
        return await pet_full(conn, pet_id)
    finally:
        await conn.close()


@app.get("/api/reminders/preview/{pet_id}/{kind}")
async def api_preview_reminder(pet_id: int, kind: str):
    """Текст нагадування — для попереднього перегляду в UI."""
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
    """Надіслати нагадування одразу. У демо-режимі — просто повертає текст."""
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
def render_reminder(pet: dict, kind: str) -> str:
    owner = pet.get("owner") or {}
    name = owner.get("name", "")
    pet_name = pet["name"]
    if kind == "visit":
        nv = pet.get("next_visit")
        when = ""
        if nv:
            try:
                dt = datetime.fromisoformat(nv["scheduled_for"])
                when = f"завтра о {dt.strftime('%H:%M')}"
            except Exception:
                when = "завтра"
        else:
            when = "завтра"
        return (
            f"Привіт, {name}! 🐾\n"
            f"Нагадуємо: {when} чекаємо {pet_name} на стрижку.\n"
            f"📍 {SALON_ADDRESS}\n\n"
            f"Якщо плани змінились — просто напишіть у відповідь."
        )
    if kind == "birthday":
        return (
            f"🎂 Сьогодні {pet_name} святкує день народження!\n\n"
            f"Вітаємо вас, {name} 💚\n"
            f"Цього тижня — знижка 15% на будь-яку послугу для іменинника."
        )
    if kind == "followup":
        weeks = pet.get("weeks_since_last_visit") or pet.get("followup_weeks", 6)
        return (
            f"Привіт, {name}! 🐶\n"
            f"Скучили за {pet_name} — востаннє були в нас {weeks} тижнів тому.\n"
            f"Час на нову стрижку? Напишіть, коли вам зручно."
        )
    return f"Нагадування для {pet_name}."


# ── Планувальник ─────────────────────────────────────────────────────────────
async def dispatch_reminders():
    """Запускається щодня о 09:00 — розсилає всі сьогоднішні нагадування."""
    today = date.today()
    tomorrow = today + timedelta(days=1)
    conn = await db()
    try:
        # 1) Візити завтра
        rows = await (await conn.execute("""
            SELECT * FROM reminders
            WHERE kind='visit' AND sent_at IS NULL
              AND date(scheduled_for) = ?
        """, (tomorrow.isoformat(),))).fetchall()
        for r in rows:
            await _send_due_reminder(conn, dict(r))

        # 2) Дні народження сьогодні
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
                # перевіримо чи не слали вже сьогодні
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

        # 3) Follow-up — за датою у таблиці
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
            f"Натисніть кнопку нижче, щоб заповнити картку улюбленця "
            f"або переглянути попередні візити.",
            parse_mode="Markdown",
            reply_markup=app_kb("owner"),
        )

    @dp.message(Command("groomer"))
    async def on_groomer(msg: Message):
        await msg.answer(
            "📋 Панель грумера",
            reply_markup=app_kb("groomer"),
        )

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
