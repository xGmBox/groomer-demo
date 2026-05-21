/* ──────────────────────────────────────────────────────────────────────────
   Groomer Mini App — клієнтський JS
   ────────────────────────────────────────────────────────────────────────── */

const T_BASE = {
  back: "←",
  loading: "Завантаження…",
  save: "Зберегти",
  saved: "Збережено",
  cancel: "Скасувати",
  next: "Далі",
  skip: "Пропустити",
  done: "Готово",

  ownerRole: "Клієнт",
  groomerRole: "Грумер",

  welcomeTitle: "Ласкаво просимо! 🐾",
  welcomeSub:
    "Заповніть коротку анкету, щоб ми пам'ятали все про вашого улюбленця — алергії, улюблений тип стрижки та день народження.",
  welcomeStart: "Заповнити картку",

  myPet: "Мій улюбленець",
  nextVisitTitle: "Наступний візит",
  noNextVisit: "Поки не заплановано — натисніть «Записатися» нижче.",
  lastVisit: "Останній візит",
  noVisits: "Це буде ваш перший візит",
  editInfo: "Редагувати інформацію",
  visitHistory: "Історія візитів",
  birthdaySoon: "День народження",
  birthdayDays: (d) => `за ${d} ${plural(d, "день", "дні", "днів")}`,

  dashboard: "Дашборд",
  today: "Сьогодні",
  birthdays: "ДН тижня",
  search: "Пошук за іменем собаки або власника…",
  tabAll: "Усі",
  tabToday: "Сьогодні",
  tabBirthdays: "Дні народження",
  tabFollowup: "Час нагадати",
  tabSchedule: "Розклад",
  tabAnalytics: "Аналітика",

  owner: "Власник",
  writeTelegram: "Написати в Telegram",
  call: "Зателефонувати",
  allergies: "Алергії",
  preferredCut: "Улюблена стрижка",
  notes: "Нотатки грумера",
  history: "Історія візитів",
  addVisit: "+ Додати візит",
  scheduleNext: "📅 Запланувати",
  sendReminder: "📨 Нагадування",

  addVisitTitle: "Додати візит",
  visitDate: "Дата візиту",
  service: "Послуга",
  cutStyle: "Тип стрижки",
  price: "Ціна, zł",
  visitNotes: "Нотатки",
  scheduleFollowup: "Запланувати наступний візит через 6 тижнів",
  groomerLabel: "Грумер",
  photoBefore: "Фото до стрижки",
  photoAfter: "Фото після стрижки",
  takePhoto: "📷 Зробити фото",
  retakePhoto: "🔁 Перезняти",

  scheduleTitle: "Запланувати наступний візит",
  scheduleDate: "Дата і час",

  reminderTitle: "Нагадування",
  reminderVisit: "За день до візиту",
  reminderBirthday: "На день народження",
  reminderFollowup: "Час на нову стрижку",
  reminderSend: "Надіслати в Telegram",
  reminderPreviewLabel: "Так клієнт побачить це повідомлення:",
  reminderSent: "Надіслано в Telegram ✓",
  reminderDemo: "Демо-режим: повідомлення показане лише в превʼю",

  loyaltyTitle: "Картка лояльності",

  bookVisit: "📅 Записатися",
  bookVisitTitle: "Запис на візит",
  bookAnyGroomer: "— Будь-який грумер —",
  bookSuccess: "Запит надіслано — салон підтвердить",

  priceListTitle: "Прайс-лист",
  priceListSub: "Ціна залежить від розміру собаки",
  sizeS: "Малі",
  sizeM: "Середні",
  sizeL: "Великі",
  duration: "Тривалість",

  confirmBtn: "✅ Підтверджую",
  rescheduleBtn: "↻ Перенести",
  cancelBtn: "✕ Скасувати",
  statusConfirmed: "Підтверджено",
  statusPending: "Очікує",
  statusRescheduled: "Перенесено",
  statusCancelled: "Скасовано",
  statusRequest: "Запит клієнта",
  confirmedToast: "Дякуємо! Чекаємо на вас",
  cancelledToast: "Візит скасовано",

  rateTitle: "Як пройшов візит?",
  rateThanks: "Дякуємо за оцінку!",

  newRequests: (n) => `🔔 ${n} ${plural(n, "новий запит", "нові запити", "нових запитів")}`,

  qOwnerName: "Як вас звати?",
  qOwnerPhone: "Ваш телефон",
  qPetName: "Як звати собачку?",
  qPhoto: "Фото улюбленця",
  qPhotoSub: "Можна пропустити — додасте пізніше",
  qBreed: "Яка порода?",
  qBirthday: "Дата народження",
  qBirthdaySub: "Щоб ми могли привітати у її/його день 🎂",
  qAllergies: "Алергії або особливості здоров'я?",
  qAllergiesSub: "Якщо немає — пропустіть цей крок",
  qCut: "Улюблений тип стрижки",
  qCutSub: "Наприклад: «коротка, лапи акуратно» або «природна, мінімум»",
  qFinishTitle: "Готово! 🎉",
  qFinishSub: "Картка створена. Ми надішлемо нагадування за день до візиту.",
  qFinishContinue: "Перейти до картки",
};

const LANG_PL = {
  back: "←",
  loading: "Ładowanie…",
  save: "Zapisz",
  saved: "Zapisano",
  cancel: "Anuluj",
  next: "Dalej",
  skip: "Pomiń",
  done: "Gotowe",

  ownerRole: "Klient",
  groomerRole: "Groomer",

  welcomeTitle: "Witamy! 🐾",
  welcomeSub:
    "Wypełnij krótką ankietę, abyśmy pamiętali wszystko o Twoim pupilu — alergie, ulubione strzyżenie i datę urodzin.",
  welcomeStart: "Wypełnij kartę",

  myPet: "Mój pupil",
  nextVisitTitle: "Następna wizyta",
  noNextVisit: 'Jeszcze nie zarezerwowano — kliknij „Zarezerwuj" poniżej.',
  lastVisit: "Ostatnia wizyta",
  noVisits: "To będzie Twoja pierwsza wizyta",
  editInfo: "Edytuj dane",
  visitHistory: "Historia wizyt",
  birthdaySoon: "Urodziny",
  birthdayDays: (d) => `za ${d} ${d === 1 ? "dzień" : "dni"}`,

  owner: "Właściciel",
  writeTelegram: "Napisz w Telegramie",
  call: "Zadzwoń",
  allergies: "Alergie",
  preferredCut: "Ulubione strzyżenie",
  notes: "Notatki groomera",
  history: "Historia wizyt",

  loyaltyTitle: "Karta lojalności",

  bookVisit: "📅 Zarezerwuj wizytę",
  bookVisitTitle: "Rezerwacja wizyty",
  bookAnyGroomer: "— Dowolny groomer —",
  bookSuccess: "Prośba wysłana — salon potwierdzi wkrótce",

  priceListTitle: "Cennik",
  priceListSub: "Cena zależy od rozmiaru psa",
  sizeS: "Małe",
  sizeM: "Średnie",
  sizeL: "Duże",
  duration: "Czas",

  confirmBtn: "✅ Potwierdzam",
  rescheduleBtn: "↻ Przełóż",
  cancelBtn: "✕ Anuluj",
  statusConfirmed: "Potwierdzone",
  statusPending: "Oczekuje",
  statusRescheduled: "Przełożone",
  statusCancelled: "Anulowane",
  statusRequest: "Prośba klienta",
  confirmedToast: "Dziękujemy! Czekamy na Ciebie",
  cancelledToast: "Wizyta anulowana",

  rateTitle: "Jak poszła wizyta?",
  rateThanks: "Dziękujemy za ocenę!",

  service: "Usługa",
  groomerLabel: "Groomer",
  visitDate: "Data wizyty",

  qOwnerName: "Jak masz na imię?",
  qOwnerPhone: "Twój telefon",
  qPetName: "Jak ma na imię piesek?",
  qPhoto: "Zdjęcie pupila",
  qPhotoSub: "Można pominąć — dodasz później",
  qBreed: "Jaka rasa?",
  qBirthday: "Data urodzenia",
  qBirthdaySub: "Abyśmy mogli pogratulować w jego/jej dzień 🎂",
  qAllergies: "Alergie lub szczególne potrzeby zdrowotne?",
  qAllergiesSub: "Jeśli brak — pomiń ten krok",
  qCut: "Ulubione strzyżenie",
  qCutSub: 'Np.: „krótkie, łapy schludne" lub „naturalne, minimum".',
  qFinishTitle: "Gotowe! 🎉",
  qFinishSub: "Karta utworzona. Wyślemy przypomnienie dzień przed wizytą.",
  qFinishContinue: "Przejdź do karty",
};

let currentLang = localStorage.getItem("lang") || "uk";

const T = new Proxy({}, {
  get(_, key) {
    if (role === "owner" && currentLang === "pl" && LANG_PL[key] !== undefined) {
      return LANG_PL[key];
    }
    return T_BASE[key];
  }
});

function plural(n, one, few, many) {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return many;
  if (n1 > 1 && n1 < 5) return few;
  if (n1 === 1) return one;
  return many;
}

const $ = (sel, el = document) => el.querySelector(sel);
const app = $("#app");

const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  try { tg.expand(); } catch (e) {}
}
const tgUser = tg?.initDataUnsafe?.user;

const params = new URLSearchParams(location.search);
let role = params.get("role") || "owner";
let forceNew = params.get("new") === "1";

// ── Утиліти ─────────────────────────────────────────────────────────────────
async function api(path, opts = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

function toast(msg, ms = 2200) {
  let el = $(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), ms);
}

function dogEmoji(breed) {
  const b = (breed || "").toLowerCase();
  if (b.includes("pudel") || b.includes("пудел")) return "🐩";
  if (b.includes("shiba") || b.includes("шиба")) return "🦊";
  if (b.includes("ши тсу") || b.includes("shih")) return "🐕‍🦺";
  return "🐶";
}

function fmtDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("T")[0].split(" ")[0].split("-");
  return `${d}.${m}.${y}`;
}

function fmtVisitDate(iso) {
  const dt = new Date(iso + "T00:00:00");
  const months = ["січ","лют","бер","кві","тра","чер","лип","сер","вер","жов","лис","гру"];
  return { day: dt.getDate(), month: months[dt.getMonth()] };
}

function fmtNextVisit(iso) {
  if (!iso) return "";
  const dt = new Date(iso.replace(" ", "T"));
  const months = ["січня","лютого","березня","квітня","травня","червня",
                  "липня","серпня","вересня","жовтня","листопада","грудня"];
  const hh = String(dt.getHours()).padStart(2, "0");
  const mm = String(dt.getMinutes()).padStart(2, "0");
  return `${dt.getDate()} ${months[dt.getMonth()]}, ${hh}:${mm}`;
}

function fmtTime(iso) {
  if (!iso) return "";
  const dt = new Date(iso.replace(" ", "T"));
  return `${String(dt.getHours()).padStart(2,"0")}:${String(dt.getMinutes()).padStart(2,"0")}`;
}

function isoToday() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;
}

function isoDate(dt) {
  return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,"0")}-${String(dt.getDate()).padStart(2,"0")}`;
}

function fmtDateShort(iso) {
  const dt = new Date(iso + "T00:00:00");
  const days = ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"];
  const months = ["січ","лют","бер","кві","тра","чер","лип","сер","вер","жов","лис","гру"];
  return `${days[dt.getDay()]} ${dt.getDate()} ${months[dt.getMonth()]}`;
}

function roleToggleBtn() {
  const other = role === "owner" ? "groomer" : "owner";
  const label = role === "owner" ? T.groomerRole : T.ownerRole;
  return `<button class="role-toggle" onclick="switchRole('${other}')">↔ ${label}</button>`;
}

function groomerSelfBtn() {
  if (role !== "groomer" || !currentGroomer) return "";
  const initial = currentGroomer.name.charAt(0);
  const adminBadge = currentGroomer.is_admin ? "👑" : "";
  return `<button class="groomer-self-chip" onclick="switchGroomerSelf()" title="Switch groomer">
    <span class="gs-avatar" style="background:${currentGroomer.color};">${initial}</span>
    <span class="gs-name">${currentGroomer.name} ${adminBadge}</span>
  </button>`;
}

function langToggleBtn() {
  if (role !== "owner") return "";
  const other = currentLang === "uk" ? "pl" : "uk";
  const flag = currentLang === "uk" ? "🇺🇦" : "🇵🇱";
  return `<button class="lang-toggle" onclick="switchLang('${other}')" title="Language">${flag}</button>`;
}

window.switchRole = (r) => {
  role = r;
  groomerTab = "all";
  const u = new URL(location.href);
  u.searchParams.set("role", r);
  u.searchParams.delete("new");
  history.replaceState({}, "", u);
  render();
};

window.switchLang = (l) => {
  currentLang = l;
  localStorage.setItem("lang", l);
  render();
};

// ── Header ──────────────────────────────────────────────────────────────────
function header({ title, backFn = "" } = {}) {
  const showLogo = !backFn;
  return `
    <div class="header">
      ${backFn ? `<button class="back" onclick="${backFn}">←</button>` : ""}
      ${showLogo
        ? `<img class="brand-logo" src="${window.SALON.logoColor}" alt="${window.SALON.name}">
           <div class="brand-text">
             <div class="brand-name">${window.SALON.name}</div>
             <div class="brand-tag">${window.SALON.tagline || ""}</div>
           </div>`
        : `<h1>${title}</h1>`}
      <div class="header-actions">
        ${langToggleBtn()}
        ${groomerSelfBtn()}
        ${roleToggleBtn()}
      </div>
    </div>
  `;
}

// ── Loyalty card ─────────────────────────────────────────────────────────────
function loyaltyCard(loyalty) {
  if (!loyalty) return "";
  const { cycle_position, visits_to_milestone, milestone_reached, milestone_discount, visit_count, eligible } = loyalty;

  // Якщо порода не еліґібельна — показуємо інформативну заглушку
  if (eligible === false) {
    const text = currentLang === "pl"
      ? "Karta stałego klienta dostępna jest dla wybranych ras (Yorki, Maltańczyk, Pudel i inne — patrz cennik)."
      : "Картка лояльності доступна для обраних порід (йорк, мальтезе, пудель та інші — див. прайс).";
    return `
      <div class="card loyalty-card not-eligible">
        <div class="loyalty-title">${T.loyaltyTitle}</div>
        <div class="loyalty-paws">${"🐾".repeat(5).split("").map(_ => '<span class="paw-icon">🐾</span>').join("")}</div>
        <div class="loyalty-status" style="font-size:12px; line-height:1.4;">${text}</div>
      </div>
    `;
  }

  // Display 10 paw icons; 5th (idx=4) and 10th (idx=9) are milestone positions
  const paws = Array.from({ length: 10 }, (_, i) => {
    let cls = "paw-icon";
    if (i < cycle_position) cls += " filled";
    if (i === 4 || i === 9) cls += " milestone";
    return `<span class="${cls}">🐾</span>`;
  }).join("");

  let statusHtml = "";
  const pl = currentLang === "pl";
  const cutWord = (n) => pl ? "strzyżeń" : plural(n, "стрижка", "стрижки", "стрижок");
  if (milestone_reached) {
    const txt = pl
      ? `To strzyżenie ze zniżką ${milestone_discount}%!`
      : `Ця стрижка зі знижкою ${milestone_discount}%!`;
    statusHtml = `<div class="loyalty-milestone">${txt}</div>`;
  } else if (visit_count === 0) {
    const txt = pl
      ? `Jeszcze ${visits_to_milestone} ${cutWord(visits_to_milestone)} do pierwszej zniżki 10%`
      : `Ще ${visits_to_milestone} ${cutWord(visits_to_milestone)} до першої знижки 10%`;
    statusHtml = `<div class="loyalty-status">${txt}</div>`;
  } else {
    const nextN = cycle_position < 5 ? 5 : 10;
    const txt = pl
      ? `${cycle_position} z ${nextN} — jeszcze ${visits_to_milestone} ${cutWord(visits_to_milestone)} do zniżki ${milestone_discount}%`
      : `${cycle_position} з ${nextN} — ще ${visits_to_milestone} ${cutWord(visits_to_milestone)} до знижки ${milestone_discount}%`;
    statusHtml = `<div class="loyalty-status">${txt}</div>`;
  }

  return `
    <div class="card loyalty-card">
      <div class="loyalty-title">${T.loyaltyTitle}</div>
      <div class="loyalty-paws">${paws}</div>
      ${statusHtml}
    </div>
  `;
}

// ── РОУТЕР ──────────────────────────────────────────────────────────────────
async function render() {
  app.innerHTML = `<div class="loading">${T.loading}</div>`;
  if (role === "owner") {
    await renderOwner();
  } else {
    await renderGroomer();
  }
}

// ============================================================================
// OWNER FLOW
// ============================================================================

async function renderOwner() {
  if (forceNew) return renderQuestionnaire();

  if (tgUser?.id) {
    try {
      const data = await api(`/api/owner/${tgUser.id}`);
      if (!data.owner || data.pets.length === 0) return renderWelcome();
      return renderOwnerPetCard(data.pets[0]);
    } catch (e) {
      return renderWelcome();
    }
  }
  return renderOwnerDemoLanding();
}

function renderOwnerDemoLanding() {
  app.innerHTML = `
    ${header({ title: window.SALON.name })}
    <div class="hero" style="text-align:center;">
      <img class="landing-logo" src="${window.SALON.logoColor}" alt="${window.SALON.name}">
      <h2>${window.SALON.name}</h2>
      <p style="opacity:0.92;">${window.SALON.tagline}</p>
    </div>

    <div style="padding: 0 14px; display:flex; flex-direction:column; gap:12px; margin-top:4px;">

      <div class="card" style="cursor:pointer; padding:18px;" onclick="renderWelcome()">
        <div style="display:flex; align-items:center; gap:14px;">
          <div style="width:48px; height:48px; border-radius:16px; background:var(--primary-soft);
                      display:grid; place-items:center; font-size:24px; flex-shrink:0;">🆕</div>
          <div>
            <div style="font-weight:700; font-size:16px; margin-bottom:3px;">Перший раз у салоні</div>
            <div style="font-size:13px; color:var(--text-soft); line-height:1.4;">
              Клієнт відкриває Mini App вперше → анкета (8 кроків) → готова картка
            </div>
          </div>
          <div style="color:var(--text-soft); font-size:18px;">›</div>
        </div>
      </div>

      <div class="card" style="cursor:pointer; padding:18px;" onclick="showDemoReturningClient('Bella')">
        <div style="display:flex; align-items:center; gap:14px;">
          <div style="width:48px; height:48px; border-radius:16px; background:var(--primary-soft);
                      display:grid; place-items:center; font-size:24px; flex-shrink:0;">🐩</div>
          <div>
            <div style="font-weight:700; font-size:16px; margin-bottom:3px;">Olena (UA) — Bella 🇺🇦</div>
            <div style="font-size:13px; color:var(--text-soft); line-height:1.4;">
              Постійна клієнтка українською: картка лояльності, наступний візит, історія
            </div>
          </div>
          <div style="color:var(--text-soft); font-size:18px;">›</div>
        </div>
      </div>

      <div class="card" style="cursor:pointer; padding:18px;" onclick="showDemoReturningClient('Sam')">
        <div style="display:flex; align-items:center; gap:14px;">
          <div style="width:48px; height:48px; border-radius:16px; background:#EFD9CF;
                      display:grid; place-items:center; font-size:24px; flex-shrink:0;">🐕</div>
          <div>
            <div style="font-weight:700; font-size:16px; margin-bottom:3px;">Anna (PL) — Sam 🇵🇱</div>
            <div style="font-size:13px; color:var(--text-soft); line-height:1.4;">
              Польська клієнтка: інтерфейс автоматично польською — її рідною мовою
            </div>
          </div>
          <div style="color:var(--text-soft); font-size:18px;">›</div>
        </div>
      </div>

      <div style="text-align:center; padding:14px 0 4px; color:var(--text-soft); font-size:13px;">
        Мова визначається автоматично з профілю клієнта
      </div>
    </div>
  `;
}

window.renderWelcome = renderWelcome;
window.showDemoReturningClient = async (petName = "Bella") => {
  const pets = await api("/api/pets");
  if (pets.length === 0) return renderWelcome();
  const target = pets.find(p => p.name === petName) || pets[0];
  const pet = await api(`/api/pets/${target.id}`);
  // Симулюємо клієнт-першу-мову: беремо з owner.language якщо встановлено
  if (pet.owner?.language) {
    currentLang = pet.owner.language;
    localStorage.setItem("lang", currentLang);
  }
  renderOwnerPetCard(pet, true);
};

function renderWelcome() {
  const backFn = tgUser ? "" : "renderOwnerDemoLanding()";
  app.innerHTML = `
    ${header({ title: window.SALON.name, backFn })}
    <div class="hero">
      <span class="paw">🐾</span>
      <h2>${T.welcomeTitle}</h2>
      <p>${T.welcomeSub}</p>
      <button class="btn white" onclick="startQuestionnaire()">${T.welcomeStart}</button>
    </div>
    <div class="card">
      <div style="font-size:14px; line-height:1.6; color:var(--text-soft);">
        Після анкети ви будете отримувати:<br>
        • 📅 нагадування за день до візиту<br>
        • 🎂 привітання з днем народження улюбленця<br>
        • 🐶 нагадування, коли час на наступну стрижку
      </div>
    </div>
  `;
}

window.startQuestionnaire = () => {
  forceNew = true;
  renderQuestionnaire();
};

// ── Анкета ───────────────────────────────────────────────────────────────────
const Q_STEPS = [
  { key: "owner_name",   label: T.qOwnerName,   type: "text",     required: true, placeholder: "Анна" },
  { key: "owner_phone",  label: T.qOwnerPhone,  type: "phone" },
  { key: "pet_name",     label: T.qPetName,     type: "text",     required: true, placeholder: "Сем" },
  { key: "photo_url",    label: T.qPhoto,       sub: T.qPhotoSub, type: "photo" },
  { key: "breed",        label: T.qBreed,       type: "text",     placeholder: "Pudel / Mix / ..." },
  { key: "birthday",     label: T.qBirthday,    sub: T.qBirthdaySub, type: "date" },
  { key: "allergies",    label: T.qAllergies,   sub: T.qAllergiesSub, type: "textarea", placeholder: "Куряче м'ясо, овес..." },
  { key: "preferred_cut",label: T.qCut,         sub: T.qCutSub,   type: "textarea", placeholder: "Коротко, акуратні лапи..." },
];

let qState = {};
let qStep = 0;

function renderQuestionnaire(step = 0) {
  qStep = step;
  if (step >= Q_STEPS.length) return finishQuestionnaire();

  const s = Q_STEPS[step];
  const dots = Q_STEPS.map((_, i) => {
    const cls = i < step ? "dot done" : (i === step ? "dot active" : "dot");
    return `<div class="${cls}"></div>`;
  }).join("");

  let input;
  if (s.type === "phone") {
    const savedCode = qState._phone_code || "+48";
    const savedNum  = qState._phone_num  || "";
    input = `
      <div class="phone-row">
        <select id="q-country" onchange="onCountryChange()">
          <option value="+48"  ${savedCode==="+48"?"selected":""}>🇵🇱 +48</option>
          <option value="+380" ${savedCode==="+380"?"selected":""}>🇺🇦 +380</option>
          <option value="+49"  ${savedCode==="+49"?"selected":""}>🇩🇪 +49</option>
          <option value="+420" ${savedCode==="+420"?"selected":""}>🇨🇿 +420</option>
          <option value="+44"  ${savedCode==="+44"?"selected":""}>🇬🇧 +44</option>
          <option value="+33"  ${savedCode==="+33"?"selected":""}>🇫🇷 +33</option>
        </select>
        <input id="q-input" type="tel" inputmode="numeric"
               placeholder="123 456 789" value="${savedNum}"
               oninput="onPhoneMask(event)">
      </div>
    `;
  } else if (s.type === "textarea") {
    input = `<textarea id="q-input" placeholder="${s.placeholder || ""}">${qState[s.key] || ""}</textarea>`;
  } else if (s.type === "photo") {
    input = `
      <div style="display:flex; flex-direction:column; gap:10px; align-items:center;">
        <div id="photo-preview" style="width:120px; height:120px; border-radius:50%;
             background:var(--primary-soft); display:grid; place-items:center; font-size:50px;
             overflow:hidden; border: 3px dashed var(--border);">
          ${qState.photo_url ? `<img src="${qState.photo_url}" style="width:100%;height:100%;object-fit:cover">` : "🐶"}
        </div>
        <label class="btn ghost small" style="cursor:pointer;">
          Завантажити фото
          <input type="file" id="q-input" accept="image/*" style="display:none" onchange="onPhotoChange(event)">
        </label>
      </div>
    `;
  } else {
    input = `<input id="q-input" type="${s.type}" placeholder="${s.placeholder || ""}" value="${qState[s.key] || ""}">`;
  }

  const isLast = step === Q_STEPS.length - 1;
  app.innerHTML = `
    <div class="steps">${dots}</div>
    <div class="form-step">
      <h2>${s.label}</h2>
      ${s.sub ? `<div class="sub">${s.sub}</div>` : ""}
      <div class="row">${input}</div>
    </div>
    <div class="btn-row">
      ${step > 0
        ? `<button class="btn back outline" onclick="renderQuestionnaire(${step - 1})">←</button>`
        : ""}
      ${!s.required
        ? `<button class="btn skip" onclick="qNext('')">${T.skip}</button>`
        : ""}
      <button class="btn" onclick="qNext()">${isLast ? T.done : T.next}</button>
    </div>
  `;

  setTimeout(() => {
    const el = $("#q-input");
    if (el && s.type !== "photo") el.focus();
  }, 100);
}

window.qNext = (forcedValue) => {
  const s = Q_STEPS[qStep];
  let val;
  if (forcedValue !== undefined) {
    val = forcedValue;
  } else if (s.type === "phone") {
    const code = $("#q-country")?.value || qState._phone_code || "+48";
    const num  = ($("#q-input")?.value || "").trim();
    qState._phone_code = code;
    qState._phone_num  = num;
    val = num ? `${code} ${num}` : "";
  } else if (s.type === "photo") {
    val = qState.photo_url || "";
  } else {
    val = ($("#q-input")?.value || "").trim();
  }

  if (s.required && !val) {
    toast("Будь ласка, заповніть це поле");
    return;
  }
  qState[s.key] = val;
  renderQuestionnaire(qStep + 1);
};

window.onPhotoChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    qState.photo_url = e.target.result;
    renderQuestionnaire(qStep);
  };
  reader.readAsDataURL(file);
};

window.onCountryChange = () => {
  qState._phone_code = $("#q-country")?.value || "+48";
};

window.onPhoneMask = (e) => {
  let v = e.target.value.replace(/\D/g, "");
  v = v.slice(0, 12).replace(/(\d{3})(?=\d)/g, "$1 ").trim();
  e.target.value = v;
  qState._phone_num = v;
};

window.renderQuestionnaire = renderQuestionnaire;

async function finishQuestionnaire() {
  app.innerHTML = `<div class="loading">${T.loading}</div>`;
  try {
    const body = {
      owner_name: qState.owner_name || "Клієнт",
      owner_phone: qState.owner_phone || "",
      owner_telegram_id: tgUser?.id || null,
      pet_name: qState.pet_name,
      breed: qState.breed || "",
      birthday: qState.birthday || "",
      photo_url: qState.photo_url || "",
      allergies: qState.allergies || "",
      preferred_cut: qState.preferred_cut || "",
      notes: "",
    };
    const pet = await api("/api/pets", { method: "POST", body });

    app.innerHTML = `
      ${header({ title: window.SALON.name })}
      <div class="hero">
        <span class="paw">🎉</span>
        <h2>${T.qFinishTitle}</h2>
        <p>${T.qFinishSub}</p>
        <button class="btn white" onclick="showOwnerPet(${pet.id})">${T.qFinishContinue}</button>
      </div>
    `;
    forceNew = false;
    qState = {};
  } catch (e) {
    toast("Помилка: " + e.message);
  }
}

window.showOwnerPet = async (petId) => {
  const pet = await api(`/api/pets/${petId}`);
  renderOwnerPetCard(pet);
};

function salonInfoBlock() {
  const hours = (window.SALON.hours || {})[currentLang] || (window.SALON.hours || {}).uk || [];
  const tel = (window.SALON.phone || "").replace(/\s/g, "");
  const titleTxt = currentLang === "pl" ? "Salon" : "Салон";
  const hoursLabel = currentLang === "pl" ? "Godziny pracy" : "Години роботи";
  return `
    <div class="salon-info">
      <h3>${titleTxt}</h3>
      <div class="row-line">
        <div class="ic">📍</div>
        <div>${window.SALON.address}</div>
      </div>
      <div class="row-line">
        <div class="ic">📞</div>
        <div><a href="tel:${tel}">${window.SALON.phone}</a></div>
      </div>
      <div class="hours">
        <h3 style="margin:4px 0 6px;">${hoursLabel}</h3>
        ${hours.map(([day, time]) => {
          const closed = /вихідний|nieczynne/i.test(time);
          return `<div class="hours-row ${closed ? "closed" : ""}">
            <span class="day">${day}</span>
            <span class="time">${time}</span>
          </div>`;
        }).join("")}
      </div>
    </div>
  `;
}

// ── Картка улюбленця (вид клієнта) ──────────────────────────────────────────
function statusChip(status) {
  if (!status) return `<span class="status-chip pending">${T.statusPending}</span>`;
  const cls = status;
  const labelKey = "status" + status.charAt(0).toUpperCase() + status.slice(1);
  return `<span class="status-chip ${cls}">${T[labelKey] || status}</span>`;
}

function nextVisitBanner(pet) {
  if (!pet.next_visit) {
    return `
      <div class="banner" style="background:var(--warning-bg); color:var(--warning-text);">
        <div class="ic">ℹ️</div>
        <div class="text"><div class="small">${T.noNextVisit}</div></div>
      </div>`;
  }
  const nv = pet.next_visit;
  const status = nv.confirmation_status;
  const confirmedOrCancelled = status === "confirmed" || status === "cancelled";
  const buttons = confirmedOrCancelled
    ? `<div style="margin-top:8px;">${statusChip(status)}</div>`
    : `
      <div class="confirm-row">
        <button class="primary" onclick="confirmReminder(${nv.id}, 'confirmed', ${pet.id})">${T.confirmBtn}</button>
        <button onclick="confirmReminder(${nv.id}, 'rescheduled', ${pet.id})">${T.rescheduleBtn}</button>
        <button class="danger" onclick="confirmReminder(${nv.id}, 'cancelled', ${pet.id})">${T.cancelBtn}</button>
      </div>`;
  return `
    <div class="banner">
      <div class="ic">📅</div>
      <div class="text" style="flex:1;">
        <strong>${T.nextVisitTitle}</strong>
        <div>${fmtNextVisit(nv.scheduled_for)}</div>
        <div class="small">${window.SALON.address}</div>
        ${buttons}
      </div>
    </div>`;
}

window.confirmReminder = async (reminderId, status, petId) => {
  try {
    await api(`/api/reminders/${reminderId}/confirm`, {
      method: "POST",
      body: { status },
    });
    const msgKey = status === "cancelled" ? "cancelledToast" : "confirmedToast";
    toast(T[msgKey]);
    const pet = await api(`/api/pets/${petId}`);
    renderOwnerPetCard(pet, true);
  } catch (e) {
    toast("Error: " + e.message);
  }
};

function renderOwnerPetCard(pet, showBack = false) {
  const photoOrEmoji = pet.photo_url
    ? `<img src="${pet.photo_url}">`
    : dogEmoji(pet.breed);

  const nextVisit = nextVisitBanner(pet);

  const bdayBanner = (pet.days_to_birthday !== null && pet.days_to_birthday <= 14)
    ? `<div class="banner" style="background:var(--warning-bg); color:var(--warning-text);">
         <div class="ic">🎂</div>
         <div class="text">
           <strong>${T.birthdaySoon}</strong>
           <div class="small">${T.birthdayDays(pet.days_to_birthday)}</div>
         </div>
       </div>`
    : "";

  const last = pet.last_visit;
  const lastBlock = last
    ? `
      <div class="card">
        <div style="font-size:12px; color:var(--text-soft); margin-bottom:6px;
                    text-transform:uppercase; letter-spacing:0.5px;">${T.lastVisit}</div>
        <div style="font-weight:600;">${last.service}</div>
        <div style="font-size:13px; color:var(--text-soft); margin-top:4px;">
          ${fmtDate(last.visit_date)}${last.cut_style && last.cut_style !== "—" ? ` · ${last.cut_style}` : ""}
        </div>
      </div>
    `
    : `<div class="card" style="text-align:center; color:var(--text-soft);">${T.noVisits}</div>`;

  const ownerBackFn = showBack ? "renderOwnerDemoLanding()" : (tgUser ? "" : "renderOwnerDemoLanding()");
  app.innerHTML = `
    ${header({ title: T.myPet, backFn: ownerBackFn })}
    <div class="detail-hero">
      <div class="detail-photo">${photoOrEmoji}</div>
      <h2>${pet.name}</h2>
      <div class="sub">${pet.breed || ""}${pet.age ? ` · ${pet.age}` : ""}</div>
    </div>
    ${bdayBanner}
    ${nextVisit}
    ${loyaltyCard(pet.loyalty)}
    ${lastBlock}
    ${pet.allergies ? `
      <div class="card" style="background:var(--warning-bg); color:var(--warning-text);">
        <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px; font-weight:600;">
          ⚠ ${T.allergies}
        </div>
        <div style="font-size:14px;">${pet.allergies}</div>
      </div>` : ""}
    ${pet.preferred_cut ? `
      <div class="card">
        <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px; font-weight:600; color:var(--text-soft);">
          ✂ ${T.preferredCut}
        </div>
        <div style="font-size:14px;">${pet.preferred_cut}</div>
      </div>` : ""}

    ${salonInfoBlock()}

    <details class="price-list" id="price-list">
      <summary>💰 ${T.priceListTitle}</summary>
      <div id="price-rows" class="price-list-table" data-breed="${pet.breed || ""}">
        <div style="text-align:center; color:var(--text-soft); font-size:13px; padding:8px;">…</div>
      </div>
    </details>

    <div class="section-title">${T.history} (${pet.visits.length})</div>
    ${pet.visits.length === 0
      ? `<div class="empty"><div class="ic">📋</div><p>${T.noVisits}</p></div>`
      : pet.visits.map(visitItem).join("")}

    <div class="action-bar">
      <button class="btn" onclick="openOwnerBooking(${pet.id})" style="flex:1;">${T.bookVisit}</button>
      <button class="btn outline" onclick="startQuestionnaire()" style="flex:1;">${T.editInfo}</button>
    </div>
  `;
  loadPriceRows();
}

async function loadPriceRows() {
  const block = $("#price-rows");
  if (!block) return;
  const petBreed = (block.dataset.breed || "").toLowerCase();
  try {
    const data = await api(`/api/services?lang=${currentLang}`);
    const eligibleBadge = currentLang === "pl" ? "karta" : "лояльн.";
    const rows = data.rows.map(r => {
      const isCurrent = petBreed && (
        r.breed.toLowerCase().includes(petBreed) || petBreed.includes(r.breed.toLowerCase())
      );
      const badge = r.eligible ? `<span class="badge" title="karta stałego klienta">★</span>` : "";
      return `<div class="pl-row ${isCurrent ? "current" : ""}">
        <div class="svc">${r.breed}${badge}</div>
        <div class="pr">${r.full}</div>
        <div class="pr">${r.bath}</div>
        <div class="pr">${r.care}</div>
      </div>`;
    }).join("");
    const addons = data.additional.map(a => `
      <div class="pl-row">
        <div class="svc">${a.name}</div>
        <div class="pr">${a.price}</div>
      </div>
    `).join("");
    block.innerHTML = `
      <div class="pl-row head">
        <div class="svc">${currentLang === "pl" ? "Rasa" : "Порода"}</div>
        <div class="pr">${data.columns[0]}</div>
        <div class="pr">${data.columns[1]}</div>
        <div class="pr">${data.columns[2]}</div>
      </div>
      ${rows}
      <div class="additional">
        <div class="pl-row head">
          <div class="svc">${currentLang === "pl" ? "Usługi dodatkowe" : "Додаткові послуги"}</div>
          <div class="pr">${currentLang === "pl" ? "Cena" : "Ціна"}</div>
        </div>
        ${addons}
      </div>
      <div style="font-size:11px; color:var(--text-soft); padding-top:8px; line-height:1.4;">
        ★ — ${currentLang === "pl" ? "rasa kwalifikuje się do karty stałego klienta (każde 5. strzyżenie −10%, każde 10. −25%)" : "порода доступна для картки постійного клієнта (кожна 5-та −10%, 10-та −25%)"}
      </div>
    `;
  } catch (e) {
    block.textContent = "—";
  }
}

window.openOwnerBooking = async (petId) => {
  const tomorrow = new Date(Date.now() + 86400000);
  const iso = isoDate(tomorrow);
  const [svcData, groomers] = await Promise.all([
    api(`/api/services?lang=${currentLang}`),
    api("/api/groomers"),
  ]);
  // 3 категорії послуг (з columns) + список add-ons
  const mainSvcs = svcData.columns.map(c => `<option value="${c}">${c}</option>`).join("");
  const addonSvcs = svcData.additional.map(a => `<option value="${a.name}">${a.name} — ${a.price}</option>`).join("");
  const svcOptions = mainSvcs + addonSvcs;
  const grOptions = `<option value="">${T.bookAnyGroomer}</option>` +
    groomers.map(g => `<option value="${g.id}">${g.name}</option>`).join("");

  openSheet(`
    <h3>${T.bookVisitTitle}</h3>
    <div class="row" style="margin-bottom:12px;">
      <label>${T.service}</label>
      <select id="b-service">${svcOptions}</select>
    </div>
    <div class="row" style="margin-bottom:12px;">
      <label>${T.visitDate}</label>
      <input type="date" id="b-date" value="${iso}">
    </div>
    <div class="row" style="margin-bottom:12px;">
      <label>${currentLang === "pl" ? "Godzina" : "Час"}</label>
      <input type="time" id="b-time" value="11:00">
    </div>
    <div class="row" style="margin-bottom:14px;">
      <label>${T.groomerLabel}</label>
      <select id="b-groomer">${grOptions}</select>
    </div>
    <button class="btn" onclick="saveOwnerBooking(${petId})">${T.save}</button>
  `);
};

window.saveOwnerBooking = async (petId) => {
  try {
    const groomerEl = $("#b-groomer");
    const groomer_id = groomerEl?.value ? parseInt(groomerEl.value) : null;
    const dt = $("#b-date").value + " " + $("#b-time").value;
    await api(`/api/pets/${petId}/schedule`, {
      method: "POST",
      body: {
        visit_date: dt,
        service: $("#b-service").value,
        groomer_id,
        requested_by_owner: true,
      },
    });
    closeSheet();
    toast(T.bookSuccess, 3000);
    const pet = await api(`/api/pets/${petId}`);
    renderOwnerPetCard(pet, true);
  } catch (e) {
    toast("Error: " + e.message);
  }
};

// Базовий visit item (для клієнта — без фото)
function visitItem(v) {
  const d = fmtVisitDate(v.visit_date);
  return `
    <div class="visit-item">
      <div class="visit-date">
        <span class="day">${d.day}</span>
        ${d.month}
      </div>
      <div class="visit-info">
        <div class="visit-service">${v.service || "—"}</div>
        <div class="visit-meta">${v.cut_style && v.cut_style !== "—" ? v.cut_style : ""}${v.notes ? (v.cut_style ? " · " : "") + v.notes : ""}</div>
      </div>
      ${v.price ? `<div class="visit-price">${v.price} zł</div>` : ""}
    </div>
  `;
}

function ratingStars(r) {
  if (!r) return "";
  const full = "★".repeat(r), empty = "★".repeat(5 - r);
  return `<span class="rating-stars"><span class="filled">${full}</span><span class="empty">${empty}</span></span>`;
}

// Visit item для грумера — з фото до/після
function visitItemGroomer(v) {
  const d = fmtVisitDate(v.visit_date);
  const beforeSrc = v.photo_before ? v.photo_before.replace(/'/g, "\\'") : "";
  const afterSrc = v.photo_url ? v.photo_url.replace(/'/g, "\\'") : "";
  const photos = (v.photo_before || v.photo_url)
    ? `<div class="visit-photos">
        ${v.photo_before ? `<div class="visit-photo-wrap"><span class="photo-lbl">До</span><img src="${v.photo_before}" onclick="openPhotoSheet('${beforeSrc}', 'До')"></div>` : ""}
        ${v.photo_url    ? `<div class="visit-photo-wrap"><span class="photo-lbl">Після</span><img src="${v.photo_url}" onclick="openPhotoSheet('${afterSrc}', 'Після')"></div>` : ""}
       </div>`
    : "";
  return `
    <div class="visit-item" style="flex-wrap:wrap; align-items:flex-start;">
      <div class="visit-date">
        <span class="day">${d.day}</span>
        ${d.month}
      </div>
      <div class="visit-info">
        <div class="visit-service">${v.service || "—"} ${ratingStars(v.rating)}</div>
        <div class="visit-meta">${v.cut_style && v.cut_style !== "—" ? v.cut_style : ""}${v.notes ? (v.cut_style ? " · " : "") + v.notes : ""}</div>
        ${photos}
      </div>
      ${v.price ? `<div class="visit-price">${v.price} zł</div>` : ""}
    </div>
  `;
}

window.openPhotoSheet = (src, label) => {
  openSheet(`
    <h3>${label}</h3>
    <div style="text-align:center;">
      <img src="${src}" style="max-width:100%; border-radius:14px;">
    </div>
  `);
};

// ============================================================================
// GROOMER FLOW
// ============================================================================

let groomerTab = "all";
let groomerSearch = "";
let currentGroomer = null; // { id, name, color, is_admin }

function loadGroomerSelf() {
  try {
    const raw = localStorage.getItem("groomer_self");
    if (raw) currentGroomer = JSON.parse(raw);
  } catch (e) {}
}
function saveGroomerSelf(g) {
  currentGroomer = g;
  localStorage.setItem("groomer_self", JSON.stringify(g));
}
window.switchGroomerSelf = () => {
  localStorage.removeItem("groomer_self");
  currentGroomer = null;
  groomerTab = "all";
  render();
};

async function renderGroomerSelector() {
  const groomers = await api("/api/groomers");
  app.innerHTML = `
    ${header({ title: window.SALON.name })}
    <div class="hero" style="text-align:center;">
      <img class="landing-logo" src="${window.SALON.logoColor}" alt="${window.SALON.name}">
      <h2>${window.SALON.name}</h2>
      <p style="opacity:0.92;">Хто ви?</p>
    </div>
    <div style="padding: 0 14px; display:flex; flex-direction:column; gap:10px;">
      ${groomers.map(g => `
        <div class="card" style="cursor:pointer; padding:16px; display:flex; align-items:center; gap:14px;"
             onclick="pickGroomerSelf(${g.id})">
          <div style="width:46px;height:46px;border-radius:50%;background:${g.color};
                      display:grid;place-items:center;color:white;font-size:18px;font-weight:700;flex-shrink:0;">
            ${g.name.charAt(0)}
          </div>
          <div style="flex:1;">
            <div style="font-weight:700;font-size:16px;">${g.name}</div>
            <div style="font-size:13px;color:var(--text-soft);">
              ${g.is_admin ? "Власник · повний доступ" : "Грумер"}
            </div>
          </div>
          ${g.is_admin ? `<span class="chip accent" style="flex-shrink:0;">👑 Admin</span>` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

window.pickGroomerSelf = async (id) => {
  const groomers = await api("/api/groomers");
  const g = groomers.find(x => x.id === id);
  if (g) {
    saveGroomerSelf(g);
    render();
  }
};

async function renderGroomer() {
  if (!currentGroomer) return renderGroomerSelector();
  if (groomerTab === "schedule") return renderSchedule();
  if (groomerTab === "analytics") {
    if (!currentGroomer.is_admin) {
      groomerTab = "all";
      return renderGroomer();
    }
    return renderAnalytics();
  }

  const pets = await api("/api/pets");

  const stats = {
    today: pets.filter(p => p.next_visit && p.next_visit.scheduled_for?.startsWith(isoToday())).length,
    week_bdays: pets.filter(p => p.days_to_birthday !== null && p.days_to_birthday <= 7).length,
  };

  const filtered = filterPets(pets);

  app.innerHTML = `
    ${header({ title: window.SALON.name })}
    <div class="stats">
      <div class="stat">
        <div class="label">${T.today}</div>
        <div class="value">${stats.today}</div>
      </div>
      <div class="stat">
        <div class="label">${T.birthdays}</div>
        <div class="value">${stats.week_bdays}</div>
      </div>
      <div class="stat">
        <div class="label">Всього</div>
        <div class="value">${pets.length}</div>
      </div>
    </div>

    <div class="search">
      <input type="text" placeholder="${T.search}" id="search-input" value="${groomerSearch}">
    </div>

    <div class="tabs">
      ${tabBtn("all", T.tabAll)}
      ${tabBtn("today", T.tabToday)}
      ${tabBtn("birthdays", T.tabBirthdays)}
      ${tabBtn("followup", T.tabFollowup)}
      ${tabBtn("schedule", T.tabSchedule)}
      ${currentGroomer?.is_admin ? tabBtn("analytics", T.tabAnalytics) : ""}
    </div>

    <div id="pet-list">
      ${filtered.length === 0
        ? `<div class="empty"><div class="ic">🔍</div><p>Нічого не знайдено</p></div>`
        : filtered.map(petCardHTML).join("")}
    </div>
  `;

  $("#search-input").addEventListener("input", (e) => {
    groomerSearch = e.target.value.toLowerCase();
    const f = filterPets(pets);
    $("#pet-list").innerHTML = f.length === 0
      ? `<div class="empty"><div class="ic">🔍</div><p>Нічого не знайдено</p></div>`
      : f.map(petCardHTML).join("");
  });
}

function tabBtn(key, label) {
  const cls = groomerTab === key ? "tab active" : "tab";
  return `<div class="${cls}" onclick="setTab('${key}')">${label}</div>`;
}

window.setTab = (k) => {
  groomerTab = k;
  renderGroomer();
};

function filterPets(pets) {
  let list = pets;
  if (groomerTab === "today") {
    list = list.filter(p => p.next_visit && p.next_visit.scheduled_for?.startsWith(isoToday()));
  } else if (groomerTab === "birthdays") {
    list = list.filter(p => p.days_to_birthday !== null && p.days_to_birthday <= 7);
  } else if (groomerTab === "followup") {
    list = list.filter(p => p.weeks_since_last_visit !== null && p.weeks_since_last_visit >= (p.followup_weeks || 6));
  }
  if (groomerSearch) {
    list = list.filter(p =>
      (p.name || "").toLowerCase().includes(groomerSearch) ||
      (p.owner_name || "").toLowerCase().includes(groomerSearch) ||
      (p.breed || "").toLowerCase().includes(groomerSearch)
    );
  }
  return list;
}

function petCardHTML(p) {
  const photo = p.photo_url ? `<img src="${p.photo_url}">` : dogEmoji(p.breed);

  const chips = [];
  if (p.days_to_birthday !== null && p.days_to_birthday <= 14) {
    chips.push(`<span class="chip accent">🎂 ${p.days_to_birthday === 0 ? "Сьогодні!" : `ДН за ${p.days_to_birthday} ${plural(p.days_to_birthday, "день", "дні", "днів")}`}</span>`);
  }
  if (p.allergies) {
    chips.push(`<span class="chip warning">⚠ Алергії</span>`);
  }
  if (p.next_visit) {
    chips.push(`<span class="chip">📅 ${fmtNextVisit(p.next_visit.scheduled_for)}</span>`);
  } else if (p.weeks_since_last_visit !== null && p.weeks_since_last_visit >= (p.followup_weeks || 6)) {
    chips.push(`<span class="chip danger">⏰ ${p.weeks_since_last_visit} тиж. без візиту</span>`);
  } else if (p.weeks_since_last_visit !== null) {
    chips.push(`<span class="chip muted">Останній: ${p.weeks_since_last_visit} тиж. тому</span>`);
  }
  if (p.loyalty?.milestone_reached) {
    chips.push(`<span class="chip loyalty-chip">🎁 Знижка ${p.loyalty.milestone_discount}%</span>`);
  }

  return `
    <div class="pet-card" onclick="showPet(${p.id})">
      <div class="pet-photo">${photo}</div>
      <div class="pet-info">
        <div class="pet-name">${p.name}</div>
        <div class="pet-meta">${p.breed || "—"}${p.age ? ` · ${p.age}` : ""} · ${p.owner_name}</div>
        <div class="pet-chips">${chips.join("")}</div>
      </div>
    </div>
  `;
}

// ── Деталь pet (грумер) ─────────────────────────────────────────────────────
window.showPet = async (id) => {
  const pet = await api(`/api/pets/${id}`);
  renderPetDetail(pet);
};

function renderPetDetail(pet) {
  const photo = pet.photo_url ? `<img src="${pet.photo_url}">` : dogEmoji(pet.breed);

  app.innerHTML = `
    ${header({ title: pet.name, backFn: "renderGroomer()" })}
    <div class="detail-hero">
      <div class="detail-photo">${photo}</div>
      <h2>${pet.name}</h2>
      <div class="sub">${pet.breed || ""}${pet.age ? ` · ${pet.age}` : ""}</div>
      ${pet.next_visit ? `
        <div style="margin-top:14px; padding:10px 14px; background:var(--primary-soft);
                    color:var(--primary-dark); border-radius:14px; font-size:14px; font-weight:500;">
          📅 ${fmtNextVisit(pet.next_visit.scheduled_for)}
        </div>` : ""}
    </div>

    <div class="card">
      <div class="info-row">
        <div class="ic">👤</div>
        <div class="label-block">
          <div class="lbl">${T.owner}</div>
          <div class="val">${pet.owner.name}</div>
        </div>
      </div>
      ${pet.owner.phone ? `
        <div class="info-row" onclick="window.location.href='tel:${pet.owner.phone}'">
          <div class="ic">📞</div>
          <div class="label-block">
            <div class="lbl">Телефон</div>
            <div class="val">${pet.owner.phone}</div>
          </div>
        </div>` : ""}
      ${pet.birthday ? `
        <div class="info-row">
          <div class="ic">🎂</div>
          <div class="label-block">
            <div class="lbl">День народження</div>
            <div class="val">${fmtDate(pet.birthday)}${pet.days_to_birthday !== null && pet.days_to_birthday <= 30 ? ` (через ${pet.days_to_birthday} ${plural(pet.days_to_birthday, "день","дні","днів")})` : ""}</div>
          </div>
        </div>` : ""}
      ${pet.allergies ? `
        <div class="info-row warning">
          <div class="ic">⚠</div>
          <div class="label-block">
            <div class="lbl">${T.allergies}</div>
            <div class="val">${pet.allergies}</div>
          </div>
        </div>` : ""}
      ${pet.preferred_cut ? `
        <div class="info-row">
          <div class="ic">✂</div>
          <div class="label-block">
            <div class="lbl">${T.preferredCut}</div>
            <div class="val">${pet.preferred_cut}</div>
          </div>
        </div>` : ""}
      ${pet.notes ? `
        <div class="info-row">
          <div class="ic">📝</div>
          <div class="label-block">
            <div class="lbl">${T.notes}</div>
            <div class="val">${pet.notes}</div>
          </div>
        </div>` : ""}
    </div>

    ${loyaltyCard(pet.loyalty)}

    <div class="section-title">${T.history} (${pet.visits.length})</div>
    ${pet.visits.length === 0
      ? `<div class="empty"><div class="ic">📋</div><p>Ще немає візитів</p></div>`
      : pet.visits.map(visitItemGroomer).join("")}

    <div class="action-bar">
      <button class="btn ghost" onclick="openAddVisit(${pet.id})">${T.addVisit}</button>
      <button class="btn ghost" onclick="openSchedule(${pet.id})">${T.scheduleNext}</button>
      <button class="btn" onclick="openReminder(${pet.id})">${T.sendReminder}</button>
    </div>
  `;
}

// ── Розклад (вкладка) ────────────────────────────────────────────────────────
let scheduleDate = isoToday();

async function renderSchedule() {
  app.innerHTML = `<div class="loading">${T.loading}</div>`;

  const data = await api(`/api/schedule?date=${scheduleDate}`);
  // Non-admin grommers see only their own column
  if (currentGroomer && !currentGroomer.is_admin) {
    data.groomers = data.groomers.filter(g => g.id === currentGroomer.id);
  }

  // Стрічка дат: сьогодні ± 3 дні
  const today = new Date();
  const dateStrip = Array.from({ length: 7 }, (_, i) => {
    const dt = new Date(today);
    dt.setDate(today.getDate() + i - 3);
    const iso = isoDate(dt);
    const isActive = iso === scheduleDate;
    const days = ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"];
    return `
      <div class="date-chip ${isActive ? "active" : ""}" onclick="setScheduleDate('${iso}')">
        <div class="dc-day">${days[dt.getDay()]}</div>
        <div class="dc-num">${dt.getDate()}</div>
      </div>
    `;
  }).join("");

  const groomersHtml = data.groomers.map(g => {
    const visits = g.visits || [];
    const visitsHtml = visits.length === 0
      ? `<div class="schedule-free">Вільний день</div>`
      : visits.map(v => {
          const reqChip = v.requested_by_owner ? `<span class="status-chip request">${T_BASE.statusRequest}</span>` : "";
          const statusKey = "status" + ((v.confirmation_status || "pending").charAt(0).toUpperCase() + (v.confirmation_status || "pending").slice(1));
          const sChip = `<span class="status-chip ${v.confirmation_status || "pending"}">${T_BASE[statusKey]}</span>`;
          return `
          <div class="schedule-item" onclick="showPet(${v.pet_id})">
            <div class="schedule-time">${fmtTime(v.scheduled_for)}</div>
            <div class="schedule-info">
              <div class="schedule-pet">${v.pet_name} ${reqChip}</div>
              <div class="schedule-meta">${v.breed || ""}${v.service ? " · " + v.service : ""}</div>
              ${v.owner_phone ? `<div class="schedule-phone">${v.owner_phone}</div>` : ""}
              <div style="margin-top:4px;">${sChip}</div>
            </div>
          </div>
        `;
        }).join("");

    return `
      <div class="groomer-block">
        <div class="groomer-header" style="border-left-color:${g.color};">
          <span class="groomer-dot" style="background:${g.color};"></span>
          ${g.name}
          <span class="groomer-count">${visits.length} ${plural(visits.length, "запис", "записи", "записів")}</span>
        </div>
        ${visitsHtml}
      </div>
    `;
  }).join("");

  app.innerHTML = `
    ${header({ title: T.tabSchedule, backFn: "goBackToList()" })}
    <div class="date-strip">${dateStrip}</div>
    <div style="padding: 4px 14px 6px; font-size:13px; color:var(--text-soft);">
      ${fmtDateShort(scheduleDate)}
    </div>
    ${data.groomers.length === 0
      ? `<div class="empty"><div class="ic">📅</div><p>Грумерів ще немає</p></div>`
      : groomersHtml}
    <div class="tabs" style="margin-top:8px;">
      ${tabBtn("all", T.tabAll)}
      ${tabBtn("today", T.tabToday)}
      ${tabBtn("birthdays", T.tabBirthdays)}
      ${tabBtn("followup", T.tabFollowup)}
      ${tabBtn("schedule", T.tabSchedule)}
      ${tabBtn("analytics", T.tabAnalytics)}
    </div>
  `;
  setTimeout(() => {
    const tabs = document.querySelector('.tabs');
    const at = tabs?.querySelector('.tab.active');
    if (!tabs || !at) return;
    const tr = tabs.getBoundingClientRect(), ar = at.getBoundingClientRect();
    tabs.scrollLeft += (ar.left + ar.width / 2) - (tr.left + tr.width / 2);
  }, 100);
}

window.setScheduleDate = (iso) => {
  scheduleDate = iso;
  renderSchedule();
};

window.goBackToList = () => {
  groomerTab = "all";
  renderGroomer();
};

// ── Аналітика (вкладка) ──────────────────────────────────────────────────────
let analyticsPeriod = "month";

async function renderAnalytics() {
  app.innerHTML = `<div class="loading">${T.loading}</div>`;
  const data = await api(`/api/analytics?period=${analyticsPeriod}`);

  const maxRevenue = Math.max(...(data.revenue_by_week.map(w => w.revenue)), 1);

  const weeksHtml = data.revenue_by_week.length === 0
    ? `<div style="color:var(--text-soft); font-size:13px; padding:8px 0;">Немає даних за цей період</div>`
    : data.revenue_by_week.map(w => {
        const pct = Math.round((w.revenue / maxRevenue) * 100);
        const dt = new Date(w.week + "T00:00:00");
        const months = ["січ","лют","бер","кві","тра","чер","лип","сер","вер","жов","лис","гру"];
        const label = `${dt.getDate()} ${months[dt.getMonth()]}`;
        return `
          <div class="analytic-bar-row">
            <div class="analytic-bar-label">${label}</div>
            <div class="analytic-bar-track">
              <div class="analytic-bar-fill" style="width:${pct}%"></div>
            </div>
            <div class="analytic-bar-value">${w.revenue} zł</div>
          </div>
        `;
      }).join("");

  const servicesHtml = data.top_services.length === 0
    ? `<div style="color:var(--text-soft); font-size:13px;">Немає даних</div>`
    : data.top_services.map((s, i) => `
        <div style="display:flex; justify-content:space-between; padding:8px 0;
                    border-bottom: ${i < data.top_services.length - 1 ? "1px solid var(--border)" : "none"};">
          <span style="font-size:14px;">${s.service}</span>
          <span style="font-weight:600; color:var(--primary);">${s.count} разів</span>
        </div>
      `).join("");

  app.innerHTML = `
    ${header({ title: T.tabAnalytics, backFn: "goBackToList()" })}

    <div style="display:flex; gap:8px; padding: 0 14px 10px;">
      <button class="btn ${analyticsPeriod === "month" ? "" : "outline"} small"
              onclick="setAnalyticsPeriod('month')">Цей місяць</button>
      <button class="btn ${analyticsPeriod === "last_month" ? "" : "outline"} small"
              onclick="setAnalyticsPeriod('last_month')">Минулий місяць</button>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:0 14px 10px;">
      <div class="stat"><div class="label">Дохід</div>
        <div class="value" style="white-space:nowrap;">${data.revenue_total} zł</div></div>
      <div class="stat"><div class="label">Візитів</div>
        <div class="value">${data.visits_count}</div></div>
      <div class="stat"><div class="label">Сер. чек</div>
        <div class="value" style="white-space:nowrap;">${Math.round(data.avg_per_visit)} zł</div></div>
      <div class="stat"><div class="label">Нових клієнтів</div>
        <div class="value">${data.new_clients}</div></div>
      <div class="stat"><div class="label">Підтверджень</div>
        <div class="value">${data.confirm_rate ?? 0}%</div></div>
      <div class="stat"><div class="label">Рейтинг</div>
        <div class="value" style="white-space:nowrap;">${data.avg_rating ? "⭐ " + data.avg_rating : "—"}</div></div>
    </div>

    <div class="card">
      <div class="section-title" style="padding:0 0 10px;">Дохід по тижнях</div>
      ${weeksHtml}
    </div>

    <div class="card">
      <div class="section-title" style="padding:0 0 10px;">Топ послуги</div>
      ${servicesHtml}
    </div>

    <div class="tabs" style="margin-top:8px;">
      ${tabBtn("all", T.tabAll)}
      ${tabBtn("today", T.tabToday)}
      ${tabBtn("birthdays", T.tabBirthdays)}
      ${tabBtn("followup", T.tabFollowup)}
      ${tabBtn("schedule", T.tabSchedule)}
      ${tabBtn("analytics", T.tabAnalytics)}
    </div>
  `;
  setTimeout(() => {
    const tabs = document.querySelector('.tabs');
    const at = tabs?.querySelector('.tab.active');
    if (!tabs || !at) return;
    const tr = tabs.getBoundingClientRect(), ar = at.getBoundingClientRect();
    tabs.scrollLeft += (ar.left + ar.width / 2) - (tr.left + tr.width / 2);
  }, 100);
}

window.setAnalyticsPeriod = (p) => {
  analyticsPeriod = p;
  renderAnalytics();
};

// ── Sheets ──────────────────────────────────────────────────────────────────
function openSheet(html) {
  let sheet = $(".sheet");
  let backdrop = $(".sheet-backdrop");
  if (!sheet) {
    backdrop = document.createElement("div");
    backdrop.className = "sheet-backdrop";
    backdrop.onclick = closeSheet;
    document.body.appendChild(backdrop);

    sheet = document.createElement("div");
    sheet.className = "sheet";
    document.body.appendChild(sheet);
  }
  sheet.innerHTML = `<div class="sheet-handle"></div>${html}`;
  setTimeout(() => {
    sheet.classList.add("open");
    backdrop.classList.add("open");
  }, 10);
}

function closeSheet() {
  $(".sheet")?.classList.remove("open");
  $(".sheet-backdrop")?.classList.remove("open");
}
window.closeSheet = closeSheet;

// ── Add visit ──────────────────────────────────────────────────────────────
window.openAddVisit = async (petId) => {
  let groomerSelect = "";
  try {
    const groomers = await api("/api/groomers");
    if (groomers.length > 0) {
      groomerSelect = `
        <div class="row" style="margin-bottom:12px;">
          <label>${T.groomerLabel}</label>
          <select id="v-groomer">
            <option value="">— Не призначено —</option>
            ${groomers.map(g => `<option value="${g.id}">${g.name}</option>`).join("")}
          </select>
        </div>
      `;
    }
  } catch (e) { /* якщо не завантажились — пропускаємо */ }

  openSheet(`
    <h3>${T.addVisitTitle}</h3>
    <div class="row" style="margin-bottom:12px;">
      <label>${T.visitDate}</label>
      <input type="date" id="v-date" value="${isoToday()}">
    </div>
    <div class="row" style="margin-bottom:12px;">
      <label>${T.service}</label>
      <input type="text" id="v-service" value="Повне грумування">
    </div>
    <div class="row" style="margin-bottom:12px;">
      <label>${T.cutStyle}</label>
      <input type="text" id="v-cut" placeholder="Класична / коротка / ...">
    </div>
    <div class="row" style="margin-bottom:12px;">
      <label>${T.price}</label>
      <input type="number" id="v-price" placeholder="180">
    </div>
    ${groomerSelect}
    <label class="photo-capture" id="pc-before">
      <div class="pc-preview" id="pc-before-prev">📷</div>
      <div class="pc-info">
        <div class="pc-label">${T.photoBefore}</div>
        <div class="pc-hint">${T.takePhoto}</div>
      </div>
      <input type="file" id="v-photo-before-file" accept="image/*" capture="environment"
             onchange="onVisitPhotoChange(event, 'before')">
    </label>
    <input type="hidden" id="v-photo-before" value="">
    <label class="photo-capture" id="pc-after">
      <div class="pc-preview" id="pc-after-prev">📷</div>
      <div class="pc-info">
        <div class="pc-label">${T.photoAfter}</div>
        <div class="pc-hint">${T.takePhoto}</div>
      </div>
      <input type="file" id="v-photo-url-file" accept="image/*" capture="environment"
             onchange="onVisitPhotoChange(event, 'after')">
    </label>
    <input type="hidden" id="v-photo-url" value="">
    <div class="row" style="margin-bottom:12px;">
      <label>${T.cutStyle === T.cutStyle ? "Рейтинг (опційно)" : ""}</label>
      <div class="stars-input" id="v-rating-input">
        ${[1,2,3,4,5].map(n => `<button type="button" class="star-btn" data-n="${n}" onclick="setVisitRating(${n})">★</button>`).join("")}
      </div>
    </div>
    <div class="row" style="margin-bottom:12px;">
      <label>${T.visitNotes}</label>
      <textarea id="v-notes" placeholder=""></textarea>
    </div>
    <div class="row" style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
      <input type="checkbox" id="v-followup" checked style="width:auto;">
      <label for="v-followup" style="margin:0;">${T.scheduleFollowup}</label>
    </div>
    <button class="btn" onclick="saveVisit(${petId})">${T.save}</button>
  `);
};

window.onVisitPhotoChange = (event, kind) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    const hiddenId = kind === "before" ? "v-photo-before" : "v-photo-url";
    const previewId = kind === "before" ? "pc-before-prev" : "pc-after-prev";
    $(`#${hiddenId}`).value = dataUrl;
    $(`#${previewId}`).innerHTML = `<img src="${dataUrl}">`;
    const label = kind === "before" ? "pc-before" : "pc-after";
    const hint = $(`#${label} .pc-hint`);
    if (hint) hint.textContent = T.retakePhoto;
  };
  reader.readAsDataURL(file);
};

let _newVisitRating = 0;
window.setVisitRating = (n) => {
  _newVisitRating = n;
  document.querySelectorAll("#v-rating-input .star-btn").forEach((b, i) => {
    b.classList.toggle("active", i < n);
  });
};

window.saveVisit = async (petId) => {
  try {
    const groomerEl = $("#v-groomer");
    const groomer_id = groomerEl?.value ? parseInt(groomerEl.value) : null;
    const pet = await api(`/api/pets/${petId}/visits`, {
      method: "POST",
      body: {
        visit_date: $("#v-date").value,
        service: $("#v-service").value,
        cut_style: $("#v-cut").value,
        price: parseFloat($("#v-price").value) || 0,
        notes: $("#v-notes").value,
        photo_before: $("#v-photo-before")?.value || "",
        photo_url: $("#v-photo-url")?.value || "",
        rating: _newVisitRating || null,
        groomer_id,
        schedule_followup: $("#v-followup").checked,
      },
    });
    _newVisitRating = 0;
    closeSheet();
    const loy = pet.loyalty;
    if (loy?.milestone_reached) {
      toast(`🎁 Знижка ${loy.milestone_discount}% — ця стрижка зі знижкою!`, 3500);
    } else {
      toast(T.saved);
    }
    showPet(petId);
  } catch (e) {
    toast("Помилка: " + e.message);
  }
};

// ── Schedule next visit ────────────────────────────────────────────────────
window.openSchedule = async (petId) => {
  const tomorrow = new Date(Date.now() + 86400000);
  const iso = isoDate(tomorrow);

  let groomerSelect = "";
  try {
    const groomers = await api("/api/groomers");
    if (groomers.length > 0) {
      groomerSelect = `
        <div class="row" style="margin-bottom:12px;">
          <label>${T.groomerLabel}</label>
          <select id="s-groomer">
            <option value="">— Не призначено —</option>
            ${groomers.map(g => `<option value="${g.id}">${g.name}</option>`).join("")}
          </select>
        </div>
      `;
    }
  } catch (e) { /* ігноруємо */ }

  openSheet(`
    <h3>${T.scheduleTitle}</h3>
    <div class="row" style="margin-bottom:12px;">
      <label>Дата</label>
      <input type="date" id="s-date" value="${iso}">
    </div>
    <div class="row" style="margin-bottom:12px;">
      <label>Час</label>
      <input type="time" id="s-time" value="15:00">
    </div>
    <div class="row" style="margin-bottom:12px;">
      <label>${T.service}</label>
      <input type="text" id="s-service" value="Повне грумування">
    </div>
    ${groomerSelect}
    <button class="btn" onclick="saveSchedule(${petId})">${T.save}</button>
  `);
};

window.saveSchedule = async (petId) => {
  try {
    const groomerEl = $("#s-groomer");
    const groomer_id = groomerEl?.value ? parseInt(groomerEl.value) : null;
    const dt = $("#s-date").value + " " + $("#s-time").value;
    await api(`/api/pets/${petId}/schedule`, {
      method: "POST",
      body: { visit_date: dt, service: $("#s-service").value, groomer_id },
    });
    closeSheet();
    toast("Запис заплановано");
    showPet(petId);
  } catch (e) {
    toast("Помилка: " + e.message);
  }
};

// ── Reminders ──────────────────────────────────────────────────────────────
window.openReminder = (petId) => {
  openSheet(`
    <h3>${T.reminderTitle}</h3>
    <div style="display:flex; flex-direction:column; gap:10px;">
      <button class="btn outline" style="text-align:left; justify-content:flex-start;" onclick="previewReminder(${petId}, 'visit')">
        📅 ${T.reminderVisit}
      </button>
      <button class="btn outline" style="text-align:left; justify-content:flex-start;" onclick="previewReminder(${petId}, 'birthday')">
        🎂 ${T.reminderBirthday}
      </button>
      <button class="btn outline" style="text-align:left; justify-content:flex-start;" onclick="previewReminder(${petId}, 'followup')">
        🐶 ${T.reminderFollowup}
      </button>
    </div>
    <div id="reminder-preview"></div>
  `);
};

window.previewReminder = async (petId, kind) => {
  const data = await api(`/api/reminders/preview/${petId}/${kind}`);
  const block = $("#reminder-preview");
  block.innerHTML = `
    <div class="tg-preview">
      <div class="label">${T.reminderPreviewLabel}</div>
      <div class="tg-bubble" data-bot="${window.SALON.name}">${escapeHtml(data.text)}</div>
    </div>
    <button class="btn" style="margin-top:10px;" onclick="sendReminder(${petId}, '${kind}')">
      ${T.reminderSend}
    </button>
  `;
};

window.sendReminder = async (petId, kind) => {
  try {
    const r = await api(`/api/reminders/send/${petId}/${kind}`, { method: "POST" });
    if (r.sent) {
      toast(T.reminderSent);
    } else {
      toast(T.reminderDemo, 3000);
    }
    setTimeout(closeSheet, 1500);
  } catch (e) {
    toast("Помилка: " + e.message);
  }
};

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

window.renderGroomer = renderGroomer;
window.renderOwnerDemoLanding = renderOwnerDemoLanding;

// ── Клавіатура: підіймаємо btn-row ──────────────────────────────────────────
(function initKeyboardShift() {
  const vv = window.visualViewport;
  if (!vv) return;
  function shift() {
    const row = document.querySelector(".btn-row");
    if (!row) return;
    const keyboardHeight = window.innerHeight - vv.height - vv.pageTop;
    row.style.transform = keyboardHeight > 50
      ? `translateY(-${keyboardHeight}px)`
      : "";
  }
  vv.addEventListener("resize", shift);
  vv.addEventListener("scroll", shift);
})();

// ── СТАРТ ──────────────────────────────────────────────────────────────────
loadGroomerSelf();
render().catch(e => {
  app.innerHTML = `<div class="loading">Помилка: ${e.message}</div>`;
});
