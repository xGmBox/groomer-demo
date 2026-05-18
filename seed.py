"""Сід-дані для демо: 3 грумери + 4 фіктивні клієнти з історією."""
from __future__ import annotations

from datetime import date, timedelta

import aiosqlite

GROOMER_DEFS = [
    {"name": "Анна",    "color": "#1f7a4d"},
    {"name": "Марта",   "color": "#7c3aed"},
    {"name": "Катерина","color": "#0284c7"},
]

CLIENTS = [
    {
        "owner": {"name": "Anna Kowalska",   "phone": "+48 501 234 567", "telegram_id": None},
        "pet": {
            "name": "Sam", "breed": "Pitbull",
            "birthday": (date.today() + timedelta(days=3)).replace(year=2020).isoformat(),
            "photo_url": "/static/img/sam.svg",
            "allergies": "Куряче м'ясо, блохозахисні препарати",
            "preferred_cut": "Короткий, акуратні лапи",
            "notes": "Боїться фена — потрібно тихий режим.",
        },
        "visits": [
            {"days_ago": 14, "service": "Повне грумування",   "cut_style": "Стандарт",       "price": 180, "notes": "Спокійно перевів", "groomer_idx": 0},
            {"days_ago": 70, "service": "Купання + стрижка",  "cut_style": "Стандарт",       "price": 150, "notes": "",                "groomer_idx": 0},
        ],
        "next_visit_in_days": 1,
        "next_groomer_idx": 0,
    },
    {
        "owner": {"name": "Piotr Nowak", "phone": "+48 602 345 678", "telegram_id": None},
        "pet": {
            "name": "Chinnu", "breed": "Shiba Inu",
            "birthday": "2022-08-15",
            "photo_url": "/static/img/chinnu.svg",
            "allergies": "—",
            "preferred_cut": "Природний, мінімум стрижки",
            "notes": "Подвійна шерсть — лише фурмінатор, не голити.",
        },
        "visits": [
            {"days_ago": 49, "service": "Купання + вичісування", "cut_style": "Без стрижки", "price": 120, "notes": "Сильне линяння", "groomer_idx": 1},
        ],
        "next_visit_in_days": None,
        "next_groomer_idx": 1,
    },
    {
        "owner": {"name": "Maria Wójcik", "phone": "+48 503 456 789", "telegram_id": None},
        "pet": {
            "name": "Coco", "breed": "German Shepherd",
            "birthday": "2022-04-10",
            "photo_url": "/static/img/coco.svg",
            "allergies": "",
            "preferred_cut": "Без стрижки, тільки купання",
            "notes": "Великий — потрібно більше часу.",
        },
        "visits": [
            {"days_ago": 21, "service": "Купання + сушка + нігті", "cut_style": "—", "price": 200, "notes": "",  "groomer_idx": 2},
            {"days_ago": 56, "service": "Купання + сушка",         "cut_style": "—", "price": 160, "notes": "",  "groomer_idx": 2},
        ],
        "next_visit_in_days": None,
        "next_groomer_idx": 2,
    },
    {
        "owner": {"name": "Olena Pawlak", "phone": "+48 504 567 890", "telegram_id": None},
        "pet": {
            "name": "Bella", "breed": "Pudel",
            "birthday": "2019-12-22",
            "photo_url": "/static/img/bella.svg",
            "allergies": "Алергія на овес",
            "preferred_cut": "Класична пудель-стрижка, бубонці на лапах",
            "notes": "Любить ласощі — давати після кожного етапу.",
        },
        "visits": [
            # Остання стрижка — з фото до/після
            {"days_ago": 5,  "service": "Повне грумування", "cut_style": "Pudel classic", "price": 220, "notes": "Дуже задоволена",
             "groomer_idx": 0,
             "photo_before": "/static/img/sample_before.svg",
             "photo_url":    "/static/img/sample_after.svg"},
            {"days_ago": 42, "service": "Стрижка кігтів",   "cut_style": "—",              "price": 30,  "notes": "", "groomer_idx": 1},
            {"days_ago": 90, "service": "Повне грумування", "cut_style": "Pudel classic", "price": 220, "notes": "", "groomer_idx": 0},
        ],
        "next_visit_in_days": 7,
        "next_groomer_idx": 0,
    },
]


async def seed_data(db_file: str):
    today = date.today()
    tomorrow = today + timedelta(days=1)

    async with aiosqlite.connect(db_file) as conn:
        # Грумери
        groomer_ids = []
        for g in GROOMER_DEFS:
            cur = await conn.execute(
                "INSERT INTO groomers (name, color) VALUES (?,?)",
                (g["name"], g["color"]),
            )
            groomer_ids.append(cur.lastrowid)

        for c in CLIENTS:
            o = c["owner"]
            cur = await conn.execute(
                "INSERT INTO owners (name, phone, telegram_id) VALUES (?,?,?)",
                (o["name"], o["phone"], o["telegram_id"]),
            )
            owner_id = cur.lastrowid

            p = c["pet"]
            cur = await conn.execute("""
                INSERT INTO pets (owner_id, name, breed, birthday, photo_url,
                                  allergies, preferred_cut, notes, followup_weeks)
                VALUES (?,?,?,?,?,?,?,?,?)
            """, (
                owner_id, p["name"], p["breed"], p["birthday"], p["photo_url"],
                p["allergies"], p["preferred_cut"], p["notes"], 6,
            ))
            pet_id = cur.lastrowid

            for v in c["visits"]:
                dt = today - timedelta(days=v["days_ago"])
                gid = groomer_ids[v.get("groomer_idx", 0)]
                await conn.execute("""
                    INSERT INTO visits
                      (pet_id, groomer_id, visit_date, service, cut_style, price, notes, photo_before, photo_url)
                    VALUES (?,?,?,?,?,?,?,?,?)
                """, (
                    pet_id, gid, dt.isoformat(),
                    v["service"], v["cut_style"], v["price"], v["notes"],
                    v.get("photo_before"), v.get("photo_url"),
                ))

            if c.get("next_visit_in_days"):
                nv = today + timedelta(days=c["next_visit_in_days"])
                ng_idx = c.get("next_groomer_idx", 0)
                ng_id = groomer_ids[ng_idx]
                await conn.execute("""
                    INSERT INTO reminders (pet_id, kind, scheduled_for, payload, groomer_id)
                    VALUES (?, 'visit', ?, ?, ?)
                """, (pet_id, f"{nv.isoformat()} 15:00", "Повне грумування", ng_id))

        # Записи на сьогодні та завтра — по одному на кожного грумера
        cur = await conn.execute("SELECT id FROM pets ORDER BY id LIMIT 3")
        pet_ids = [r[0] for r in await cur.fetchall()]

        services_today = ["Повне грумування", "Купання + стрижка", "Купання + сушка + нігті"]
        for i, (pid, gid) in enumerate(zip(pet_ids, groomer_ids)):
            hour = 10 + i * 2  # 10:00, 12:00, 14:00
            await conn.execute("""
                INSERT INTO reminders (pet_id, kind, scheduled_for, payload, groomer_id)
                VALUES (?, 'visit', ?, ?, ?)
            """, (pid, f"{today.isoformat()} {hour:02d}:00", services_today[i], gid))

        for i, (pid, gid) in enumerate(zip(pet_ids, groomer_ids)):
            hour = 10 + i * 2  # 10:00, 12:00, 14:00
            await conn.execute("""
                INSERT INTO reminders (pet_id, kind, scheduled_for, payload, groomer_id)
                VALUES (?, 'visit', ?, ?, ?)
            """, (pid, f"{tomorrow.isoformat()} {hour:02d}:00", "Стрижка", gid))

        await conn.commit()
