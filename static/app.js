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
  priceSearch: "Знайти породу…",
  priceAll: "Усі",
  priceTabFull: "✂ Грумінг",
  priceTabBath: "🛁 Купання",
  priceTabCare: "🌸 Догляд",
  priceTabAddons: "＋ Додатки",
  priceYourBreed: "Ваша порода",
  priceOtherBreeds: "Інші породи",
  priceNoMatch: "Нічого не знайдено",
  priceOr: "або",
  priceFrom: "від",
  priceAddonsTitle: "Додаткові послуги",
  priceLoyaltyHint: "★ — порода доступна для картки постійного клієнта (кожна 5-та стрижка −10%, 10-та −25%)",
  priceSvcFull: "Повний грумінг",
  priceSvcBath: "Купання + косметика",
  priceSvcCare: "Догляд",

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
  priceSearch: "Szukaj rasy…",
  priceAll: "Wszystkie",
  priceTabFull: "✂ Grooming",
  priceTabBath: "🛁 Kąpiel",
  priceTabCare: "🌸 Pielęgnacje",
  priceTabAddons: "＋ Dodatki",
  priceYourBreed: "Twoja rasa",
  priceOtherBreeds: "Pozostałe rasy",
  priceNoMatch: "Brak wyników",
  priceOr: "lub",
  priceFrom: "od",
  priceAddonsTitle: "Usługi dodatkowe",
  priceLoyaltyHint: "★ — rasa kwalifikuje się do karty stałego klienta (każde 5. strzyżenie −10%, 10. −25%)",
  priceSvcFull: "Pełne grooming",
  priceSvcBath: "Kąpiel + kosmetyka",
  priceSvcCare: "Pielęgnacje",

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

  // Groomer-side labels
  tabAll: "Wszystkie",
  tabToday: "Dziś",
  tabBirthdays: "Urodziny",
  tabFollowup: "Termin",
  tabSchedule: "Grafik",
  tabAnalytics: "Analityka",
  addVisit: "+ Dodaj wizytę",
  addVisitTitle: "Dodaj wizytę",
  scheduleNext: "📅 Zaplanuj",
  sendReminder: "📨 Przypomnij",
  cutStyle: "Rodzaj strzyżenia",
  photoBefore: "Zdjęcie przed",
  photoAfter: "Zdjęcie po",
  takePhoto: "📷 Zrób zdjęcie",
  retakePhoto: "📷 Zmień zdjęcie",
  reminderTitle: "Przypomnienie",
  today: "Dziś",
  birthdays: "Tydz.",
  search: "Szukaj psa lub właściciela…",
  price: "Cena, zł",
  total: "Łącznie",
  noResults: "Brak wyników",
};

// currentLang and T are initialized after `role` is parsed (see below)

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

// Owner UI is always PL; groomer UI stays in Ukrainian (internal team)
let currentLang = (role === "owner") ? "pl" : (localStorage.getItem("lang") || "pl");

const T = new Proxy({}, {
  get(_, key) {
    if (role === "owner" && LANG_PL[key] !== undefined) return LANG_PL[key];
    if (role !== "owner" && currentLang === "pl" && LANG_PL[key] !== undefined) return LANG_PL[key];
    return T_BASE[key];
  }
});

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

const MONTHS_SHORT_PL = ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"];
const MONTHS_LONG_PL  = ["stycznia","lutego","marca","kwietnia","maja","czerwca",
                         "lipca","sierpnia","września","października","listopada","grudnia"];
const DAYS_SHORT_PL   = ["Nd","Pn","Wt","Śr","Cz","Pt","Sb"];

const MONTHS_SHORT_UK = ["січ","лют","бер","кві","тра","чер","лип","сер","вер","жов","лис","гру"];
const MONTHS_LONG_UK  = ["січня","лютого","березня","квітня","травня","червня",
                         "липня","серпня","вересня","жовтня","листопада","грудня"];
const DAYS_SHORT_UK   = ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"];

function _monthsShort() { return role === "owner" || currentLang === "pl" ? MONTHS_SHORT_PL : MONTHS_SHORT_UK; }
function _monthsLong()  { return role === "owner" || currentLang === "pl" ? MONTHS_LONG_PL  : MONTHS_LONG_UK;  }
function _daysShort()   { return role === "owner" || currentLang === "pl" ? DAYS_SHORT_PL   : DAYS_SHORT_UK;   }

function fmtVisitDate(iso) {
  const dt = new Date(iso + "T00:00:00");
  return { day: dt.getDate(), month: _monthsShort()[dt.getMonth()] };
}

function fmtNextVisit(iso) {
  if (!iso) return "";
  const dt = new Date(iso.replace(" ", "T"));
  const hh = String(dt.getHours()).padStart(2, "0");
  const mm = String(dt.getMinutes()).padStart(2, "0");
  return `${dt.getDate()} ${_monthsLong()[dt.getMonth()]}, ${hh}:${mm}`;
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
  return `${_daysShort()[dt.getDay()]} ${dt.getDate()} ${_monthsShort()[dt.getMonth()]}`;
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
  // Language switcher only for groomer view (internal team)
  if (role !== "groomer") return "";
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
  const loyaltyTitleStr = (role === "owner" || currentLang === "pl") ? "Karta stałego klienta" : T.loyaltyTitle;
  if (eligible === false) {
    const text = role === "owner" || currentLang === "pl"
      ? "Karta stałego klienta dostępna jest dla wybranych ras (Yorki, Maltańczyk, Pudel i inne — patrz cennik)."
      : "Картка лояльності доступна для обраних порід (йорк, мальтезе, пудель та інші — див. прайс).";
    return `
      <div class="card loyalty-card not-eligible">
        <div class="loyalty-title">${loyaltyTitleStr}</div>
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
      <div class="loyalty-title">${loyaltyTitleStr}</div>
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

  // Phone-based session persistence
  const savedPhone = localStorage.getItem("owner_phone");
  if (savedPhone) {
    try {
      const data = await api(`/api/owner-by-phone?phone=${encodeURIComponent(savedPhone)}`);
      if (data.found && data.pets && data.pets.length > 0) {
        currentOwnerPets = data.pets;
        currentOwnerPetIdx = 0;
        return renderOwnerPetCard(data.pets[0]);
      }
    } catch (e) {}
    localStorage.removeItem("owner_phone");
  }

  // Telegram fallback (legacy / testing)
  if (tgUser?.id) {
    try {
      const data = await api(`/api/owner/${tgUser.id}`);
      if (data.owner && data.pets.length > 0) {
        currentOwnerPets = data.pets;
        return renderOwnerPetCard(data.pets[0]);
      }
    } catch (e) {}
  }

  renderOwnerPhoneLanding();
}

let currentOwnerPets = [];
let currentOwnerPetIdx = 0;

function renderOwnerPhoneLanding() {
  const tel = (window.SALON.phone || "").replace(/\s/g, "");
  app.innerHTML = `
    ${header({ title: window.SALON.name })}
    <div class="hero" style="text-align:center; padding-bottom:8px;">
      <img class="landing-logo" src="${window.SALON.logoColor}" alt="${window.SALON.name}">
      <h2>${window.SALON.name}</h2>
      <p style="opacity:0.88; font-size:14px;">${window.SALON.tagline || ""}</p>
    </div>
    <div style="padding:0 16px 24px;">
      <div class="card" style="padding:20px;">
        <div style="font-weight:700; font-size:17px; margin-bottom:6px;">Witamy!</div>
        <div style="color:var(--text-soft); font-size:14px; margin-bottom:18px; line-height:1.5;">
          Proszę podać numer telefonu, aby otworzyć kartę swojego psa.
        </div>
        <div class="phone-row" style="margin-bottom:14px;">
          <select id="lp-country">
            <option value="+48">🇵🇱 +48</option>
            <option value="+380">🇺🇦 +380</option>
            <option value="+49">🇩🇪 +49</option>
            <option value="+420">🇨🇿 +420</option>
          </select>
          <input id="lp-phone" type="tel" inputmode="numeric" placeholder="123 456 789"
                 oninput="onPhoneMask(event)"
                 onkeydown="if(event.key==='Enter') loginByPhone()">
        </div>
        <button class="btn" style="width:100%;" onclick="loginByPhone()">Otwórz kartę →</button>
      </div>
      <div style="text-align:center; margin-top:16px; color:var(--text-soft); font-size:13px;">
        Pierwsza wizyta?
        <span onclick="renderWelcome()" style="cursor:pointer; color:var(--primary); font-weight:600;">
          Wypełnij formularz rejestracji
        </span>
      </div>
      <div class="salon-info" style="margin-top:20px;">
        <div class="row-line"><div class="ic">📞</div>
          <div><a href="tel:${tel}">${window.SALON.phone}</a> — zapisy telefonicznie</div>
        </div>
        <div class="row-line"><div class="ic">📍</div><div>${window.SALON.address}</div></div>
      </div>
    </div>
  `;
  setTimeout(() => document.getElementById("lp-phone")?.focus(), 100);
}

window.renderOwnerDemoLanding = renderOwnerPhoneLanding;

window.loginByPhone = async () => {
  const code = document.getElementById("lp-country")?.value || "+48";
  const num = (document.getElementById("lp-phone")?.value || "").trim();
  if (!num) { toast("Proszę podać numer telefonu"); return; }
  const phone = `${code} ${num}`;
  app.innerHTML = `<div class="loading">Ładowanie…</div>`;
  try {
    const data = await api(`/api/owner-by-phone?phone=${encodeURIComponent(phone)}`);
    if (data.found && data.pets && data.pets.length > 0) {
      localStorage.setItem("owner_phone", phone);
      currentOwnerPets = data.pets;
      currentOwnerPetIdx = 0;
      renderOwnerPetCard(data.pets[0]);
    } else if (data.found) {
      localStorage.setItem("owner_phone", phone);
      qState = { owner_phone: phone };
      renderWelcome();
    } else {
      qState = {};
      toast("Nie znaleziono konta. Proszę wypełnić formularz rejestracji.", 3500);
      renderWelcome();
    }
  } catch (e) {
    toast("Błąd: " + e.message);
    renderOwnerPhoneLanding();
  }
};

function renderWelcome() {
  app.innerHTML = `
    ${header({ title: window.SALON.name, backFn: "renderOwnerPhoneLanding()" })}
    <div class="hero" style="background:linear-gradient(160deg, var(--primary) 0%, var(--accent) 100%); color:white; border-radius:0 0 28px 28px; padding:32px 20px 36px;">
      <span style="font-size:48px; display:block; margin-bottom:10px;">🐾</span>
      <h2 style="color:white; margin:0 0 8px;">Witamy w ${window.SALON.name}!</h2>
      <p style="opacity:0.92; margin:0; font-size:14px; line-height:1.5;">
        Wypełnij krótki formularz, abyśmy mogli pamiętać preferencje Państwa psa
        i wysyłać przypomnienia o wizytach.
      </p>
    </div>
    <div style="padding:16px;">
      <div class="card" style="margin-bottom:10px;">
        <div style="font-size:14px; line-height:1.8; color:var(--text-main);">
          Po rejestracji będą Państwo otrzymywać:<br>
          <span style="color:var(--primary);">📅</span> przypomnienie dzień przed wizytą<br>
          <span style="color:var(--primary);">🎂</span> życzenia urodzinowe dla psa<br>
          <span style="color:var(--primary);">✂</span> informację kiedy czas na kolejne strzyżenie
        </div>
      </div>
      <button class="btn" style="width:100%; margin-top:4px;" onclick="startQuestionnaire()">
        Wypełnij kartę →
      </button>
    </div>
  `;
}

window.startQuestionnaire = () => {
  forceNew = true;
  renderQuestionnaire();
};

// ── Анкета ───────────────────────────────────────────────────────────────────
const Q_STEPS = [
  { key: "owner_name",    label: "Imię i nazwisko właściciela",  type: "text",     required: true,  placeholder: "Anna Kowalska" },
  { key: "owner_phone",   label: "Numer telefonu",               type: "phone" },
  { key: "pet_name",      label: "Jak ma na imię pies?",         type: "text",     required: true,  placeholder: "Bella" },
  { key: "breed",         label: "Rasa",                         type: "breed" },
  { key: "birthday",      label: "Data urodzenia psa",
    sub: "Abyśmy mogli złożyć życzenia w jego/jej urodziny 🎂",  type: "date" },
  { key: "photo_url",     label: "Zdjęcie psa",
    sub: "Można pominąć — dodasz później",                       type: "photo" },
  { key: "allergies",     label: "Alergie lub uczulenia?",
    sub: "Np. na kosmetyki, pokarmy. Jeśli brak — pomiń.",       type: "textarea", placeholder: "Szampon z lanoliną, kurczak…" },
  { key: "health_notes",  label: "Szczególne potrzeby zdrowotne",
    sub: "Np. epilepsja, choroby serca. Jeśli brak — pomiń.",    type: "textarea", placeholder: "Padaczka, choroby serca…" },
  { key: "preferred_cut", label: "Ulubiony styl strzyżenia",
    sub: "Np. 'krótkie, łapy schludne' lub 'naturalne, minimum'", type: "textarea", placeholder: "Krótkie, równe" },
  { key: "_extras",       label: "Dodatkowe informacje",         type: "extras" },
  { key: "_consents",     label: "Zgody",                        type: "consents", required: true },
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
    const savedNum  = qState._phone_num  || (qState.owner_phone ? qState.owner_phone.split(" ").slice(1).join(" ") : "");
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
      <div id="phone-check-hint" style="font-size:12px; color:var(--text-soft); margin-top:8px; min-height:18px;"></div>
    `;
  } else if (s.type === "breed") {
    // Pre-fetch breeds list from PRICE_LIST via config (loaded async)
    input = `
      <input id="q-input" type="text" list="breed-list" placeholder="Zacznij pisać rasę…"
             value="${qState.breed || ""}" oninput="onBreedInput(event)">
      <datalist id="breed-list" id="breed-datalist"></datalist>
      <div id="breed-options" style="display:flex; flex-wrap:wrap; gap:6px; margin-top:10px;"></div>
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
          Dodaj zdjęcie
          <input type="file" id="q-input" accept="image/*" style="display:none" onchange="onPhotoChange(event)">
        </label>
      </div>
    `;
  } else if (s.type === "extras") {
    const perfOk = qState.perfumes_ok !== 0;
    const trOk   = qState.treats_ok   !== 0;
    input = `
      <div style="display:flex; flex-direction:column; gap:14px;">
        <label class="toggle-row">
          <div style="flex:1;">
            <div style="font-weight:600;">Perfumy po strzyżeniu</div>
            <div style="font-size:13px; color:var(--text-soft);">Nanoszenie perfum dla psów po zabiegu</div>
          </div>
          <input type="checkbox" id="q-perfumes" ${perfOk?"checked":""}>
        </label>
        <label class="toggle-row">
          <div style="flex:1;">
            <div style="font-weight:600;">Smakołyki podczas wizyty</div>
            <div style="font-size:13px; color:var(--text-soft);">Nagradzanie przekąskami w trakcie strzyżenia</div>
          </div>
          <input type="checkbox" id="q-treats" ${trOk?"checked":""}>
        </label>
      </div>
    `;
  } else if (s.type === "consents") {
    input = `
      <div style="display:flex; flex-direction:column; gap:14px;">
        <label class="consent-row">
          <input type="checkbox" id="c-sms" required>
          <span>Wyrażam zgodę na otrzymywanie <strong>SMS z przypomnieniami o wizytach</strong>
            (wymagane do działania usługi)</span>
        </label>
        <label class="consent-row">
          <input type="checkbox" id="c-regulamin" required>
          <span>Zapoznałam/em się z
            <a href="#" onclick="event.preventDefault();">regulaminem salonu</a>
            i akceptuję jego warunki</span>
        </label>
        <label class="consent-row">
          <input type="checkbox" id="c-rodo" required>
          <span>Wyrażam zgodę na
            <a href="#" onclick="event.preventDefault();">przetwarzanie danych osobowych</a>
            zgodnie z RODO</span>
        </label>
        <label class="consent-row">
          <input type="checkbox" id="c-marketing">
          <span>Opcjonalnie: zgoda na SMS-y marketingowe (promocje, życzenia)</span>
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
      ${!s.required && s.type !== "consents" && s.type !== "extras"
        ? `<button class="btn skip" onclick="qNext('')">Pomiń</button>`
        : ""}
      <button class="btn" onclick="qNext()">${isLast ? "Zarejestruj się" : "Dalej →"}</button>
    </div>
  `;

  if (s.type === "breed") _populateBreedOptions();
  if (s.type === "phone" && qState.owner_phone) {
    document.getElementById("q-input").value = qState.owner_phone.split(" ").slice(1).join(" ");
  }
  setTimeout(() => {
    const el = $("#q-input");
    if (el && s.type !== "photo" && s.type !== "breed" && s.type !== "extras" && s.type !== "consents") el.focus();
  }, 100);
}

let _breedsCache = [];
async function _populateBreedOptions() {
  try {
    if (_breedsCache.length === 0) {
      const data = await api("/api/services?lang=pl");
      _breedsCache = data.rows.map(r => r.breed);
    }
    const dl = document.getElementById("breed-datalist");
    if (dl) dl.innerHTML = _breedsCache.map(b => `<option value="${b}">`).join("");
    const opts = document.getElementById("breed-options");
    if (opts) {
      const popular = ["Pudel", "York", "Maltańczyk", "Szpic", "Biewer"];
      opts.innerHTML = popular.map(b =>
        `<button type="button" class="breed-chip${qState.breed===b?" active":""}" onclick="qState.breed='${b}';document.getElementById('q-input').value='${b}';_populateBreedOptions()">${b}</button>`
      ).join("") + `<button type="button" class="breed-chip${!popular.includes(qState.breed)&&qState.breed?" active":""}" onclick="document.getElementById('q-input').value='';document.getElementById('q-input').focus()">Inna…</button>`;
    }
  } catch (e) {}
}

window.onBreedInput = (e) => { qState.breed = e.target.value; };

window.qNext = async (forcedValue) => {
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
    // Check for existing account
    if (val) {
      try {
        const hint = document.getElementById("phone-check-hint");
        if (hint) hint.textContent = "Sprawdzam…";
        const data = await api(`/api/owner-by-phone?phone=${encodeURIComponent(val)}`);
        if (data.found) {
          if (hint) hint.textContent = "";
          toast("Ten numer jest już zarejestrowany. Proszę się zalogować.", 3500);
          localStorage.setItem("owner_phone", val);
          if (data.pets && data.pets.length > 0) {
            currentOwnerPets = data.pets;
            renderOwnerPetCard(data.pets[0]);
          } else {
            renderOwnerPhoneLanding();
          }
          return;
        }
        if (hint) hint.textContent = "";
      } catch (e) {}
    }
  } else if (s.type === "photo") {
    val = qState.photo_url || "";
  } else if (s.type === "breed") {
    val = ($("#q-input")?.value || qState.breed || "").trim();
    qState.breed = val;
  } else if (s.type === "extras") {
    qState.perfumes_ok = document.getElementById("q-perfumes")?.checked ? 1 : 0;
    qState.treats_ok   = document.getElementById("q-treats")?.checked   ? 1 : 0;
    val = "done";
  } else if (s.type === "consents") {
    const sms  = document.getElementById("c-sms")?.checked;
    const reg  = document.getElementById("c-regulamin")?.checked;
    const rodo = document.getElementById("c-rodo")?.checked;
    if (!sms || !reg || !rodo) {
      toast("Proszę zaznaczyć wymagane zgody");
      return;
    }
    qState._consents = ["sms_transactional", "regulamin", "rodo"];
    if (document.getElementById("c-marketing")?.checked) qState._consents.push("sms_marketing");
    val = "done";
  } else {
    val = ($("#q-input")?.value || "").trim();
  }

  if (s.required && !val && s.type !== "consents" && s.type !== "extras") {
    toast("Proszę wypełnić to pole");
    return;
  }
  if (s.key !== "_consents" && s.key !== "_extras") qState[s.key] = val;
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
  app.innerHTML = `<div class="loading">Ładowanie…</div>`;
  try {
    const body = {
      owner_name: qState.owner_name || "Klient",
      owner_phone: qState.owner_phone || "",
      owner_telegram_id: tgUser?.id || null,
      pet_name: qState.pet_name,
      breed: qState.breed || "",
      birthday: qState.birthday || "",
      photo_url: qState.photo_url || "",
      allergies: qState.allergies || "",
      preferred_cut: qState.preferred_cut || "",
      health_notes: qState.health_notes || "",
      notes: "",
      perfumes_ok: qState.perfumes_ok !== undefined ? qState.perfumes_ok : 1,
      treats_ok:   qState.treats_ok   !== undefined ? qState.treats_ok   : 1,
      consents: qState._consents || ["sms_transactional", "regulamin", "rodo"],
    };
    const pet = await api("/api/pets", { method: "POST", body });
    if (body.owner_phone) localStorage.setItem("owner_phone", body.owner_phone);

    app.innerHTML = `
      ${header({ title: window.SALON.name })}
      <div style="background:linear-gradient(160deg, var(--primary) 0%, var(--accent) 100%);
                  color:white; border-radius:0 0 28px 28px; padding:40px 20px 44px; text-align:center;">
        <div style="font-size:52px; margin-bottom:12px;">🎉</div>
        <h2 style="color:white; margin:0 0 8px;">Dziękujemy!</h2>
        <p style="opacity:0.92; margin:0; font-size:14px;">
          Karta Państwa psa została utworzona. Będziemy wysyłać przypomnienia SMS przed wizytami.
        </p>
      </div>
      <div style="padding:16px;">
        <button class="btn" style="width:100%; margin-top:4px;" onclick="showOwnerPet(${pet.id})">
          Przejdź do karty →
        </button>
      </div>
    `;
    forceNew = false;
    qState = {};
  } catch (e) {
    toast("Błąd: " + e.message);
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
  const tel = (window.SALON.phone || "").replace(/\s/g, "");
  if (!pet.next_visit) {
    return `
      <div class="banner banner-book">
        <div class="ic">📞</div>
        <div class="text" style="flex:1;">
          <strong>Umów wizytę</strong>
          <div class="small" style="margin:4px 0 10px;">Aby umówić wizytę, zadzwoń lub napisz SMS</div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <a href="tel:${tel}" class="btn small" style="text-decoration:none; flex:1; text-align:center;">📞 Zadzwoń</a>
            <a href="sms:${tel}" class="btn small outline" style="text-decoration:none; flex:1; text-align:center;">💬 SMS</a>
          </div>
        </div>
      </div>`;
  }
  const nv = pet.next_visit;
  return `
    <div class="banner next-visit-accent">
      <div class="ic">📅</div>
      <div class="text">
        <strong>Następna wizyta</strong>
        <div style="font-size:17px; font-weight:700; margin:3px 0;">${fmtNextVisit(nv.scheduled_for)}</div>
        <div class="small">${window.SALON.address}</div>
        <div style="font-size:12px; color:var(--text-soft); margin-top:6px; line-height:1.4;">
          Aby przełożyć lub odwołać wizytę — zadzwoń lub napisz SMS na
          <a href="tel:${tel}" style="color:var(--primary);">${window.SALON.phone}</a>
        </div>
      </div>
    </div>`;
}

window.renderWelcome = renderWelcome;

function renderOwnerPetCard(pet, _ignored = false) {
  const photoOrEmoji = pet.photo_url
    ? `<img src="${pet.photo_url}">`
    : dogEmoji(pet.breed);

  const nextVisit = nextVisitBanner(pet);
  const tel = (window.SALON.phone || "").replace(/\s/g, "");

  const bdayBanner = (pet.days_to_birthday !== null && pet.days_to_birthday <= 14)
    ? `<div class="banner" style="background:var(--warning-bg); color:var(--warning-text);">
         <div class="ic">🎂</div>
         <div class="text">
           <strong>${T.birthdaySoon}</strong>
           <div class="small">${T.birthdayDays(pet.days_to_birthday)}</div>
         </div>
       </div>`
    : "";

  // Multi-pet selector
  const petSelector = currentOwnerPets.length > 1
    ? `<div style="display:flex; gap:8px; overflow-x:auto; padding:0 14px 12px; -webkit-overflow-scrolling:touch;">
        ${currentOwnerPets.map((p, i) =>
          `<button class="breed-chip${i === currentOwnerPetIdx ? " active" : ""}"
                   onclick="switchOwnerPet(${i})">${p.name}</button>`
        ).join("")}
       </div>`
    : "";

  app.innerHTML = `
    ${header({ title: window.SALON.name })}
    ${petSelector}
    <div class="detail-hero">
      <div class="detail-photo">${photoOrEmoji}</div>
      <h2>${pet.name}</h2>
      <div class="sub">${pet.breed || ""}${pet.age ? ` · ${pet.age}` : ""}</div>
    </div>
    ${bdayBanner}
    ${nextVisit}
    ${loyaltyCard(pet.loyalty)}

    ${pet.allergies ? `
      <div class="card" style="background:var(--warning-bg); color:var(--warning-text);">
        <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px; font-weight:600;">⚠ Alergie</div>
        <div style="font-size:14px;">${pet.allergies}</div>
      </div>` : ""}

    <details class="price-list" id="price-list">
      <summary>💰 ${T.priceListTitle}
        <span style="font-size:11px; font-weight:400; color:var(--text-soft); display:block; margin-top:2px;">
          Cena może się różnić w zależności od stanu sierści i czasu pracy
        </span>
      </summary>
      <div id="price-rows" class="price-list-table" data-breed="${pet.breed || ""}">
        <div style="text-align:center; color:var(--text-soft); font-size:13px; padding:8px;">…</div>
      </div>
    </details>

    <div class="section-title">Historia wizyt (${pet.visits.length})</div>
    ${pet.visits.length === 0
      ? `<div class="empty"><div class="ic">📋</div><p>To będzie Państwa pierwsza wizyta</p></div>`
      : pet.visits.map(visitItemOwner).join("")}

    <div style="padding:16px 14px 32px; display:flex; gap:10px;">
      <a href="tel:${tel}" class="btn" style="flex:1; text-decoration:none; text-align:center;">📞 Zadzwoń</a>
      <button class="btn outline" onclick="ownerLogout()" style="flex:0 0 auto; padding:0 16px;">Wyloguj</button>
    </div>
  `;
  loadPriceRows();

  // Show rating modal for last visit if not yet rated
  const unrated = pet.visits.find(v => !v.rating);
  if (unrated && pet.visits.length > 0 && pet.visits[0] === unrated) {
    setTimeout(() => showRatingModal(unrated.id, pet.id), 800);
  }
}

window.switchOwnerPet = (idx) => {
  currentOwnerPetIdx = idx;
  renderOwnerPetCard(currentOwnerPets[idx]);
};

window.ownerLogout = () => {
  localStorage.removeItem("owner_phone");
  currentOwnerPets = [];
  currentOwnerPetIdx = 0;
  renderOwnerPhoneLanding();
};

// Owner visit item — shows groomer note + photos (but not internal notes)
function visitItemOwner(v) {
  const d = fmtVisitDate(v.visit_date);
  const beforeSrc = v.photo_before ? v.photo_before.replace(/'/g, "\\'") : "";
  const afterSrc  = v.photo_url    ? v.photo_url.replace(/'/g, "\\'") : "";
  const photos = (v.photo_before || v.photo_url)
    ? `<div class="visit-photos">
        ${v.photo_before ? `<div class="visit-photo-wrap"><span class="photo-lbl">Przed</span><img src="${v.photo_before}" onclick="openPhotoSheet('${beforeSrc}','Przed')"></div>` : ""}
        ${v.photo_url    ? `<div class="visit-photo-wrap"><span class="photo-lbl">Po</span><img src="${v.photo_url}" onclick="openPhotoSheet('${afterSrc}','Po')"></div>` : ""}
       </div>`
    : "";
  const groomerNote = v.groomer_note_for_owner
    ? `<div class="owner-note-from-groomer">${v.groomer_note_for_owner}</div>`
    : "";
  const services = v.services_json ? (() => { try { return JSON.parse(v.services_json).join(", "); } catch(e){ return v.service||""; } })() : (v.service || "—");
  return `
    <div class="visit-item" style="flex-wrap:wrap; align-items:flex-start;">
      <div class="visit-date">
        <span class="day">${d.day}</span>
        ${d.month}
      </div>
      <div class="visit-info" style="flex:1;">
        <div class="visit-service">${services} ${ratingStars(v.rating)}</div>
        ${v.cut_style && v.cut_style !== "—" ? `<div class="visit-meta">${v.cut_style}</div>` : ""}
        ${groomerNote}
        ${photos}
      </div>
      ${v.price ? `<div class="visit-price">${v.price} zł</div>` : ""}
    </div>
  `;
}

function showRatingModal(visitId, petId) {
  let overlay = document.getElementById("rating-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "rating-overlay";
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `
    <div class="rating-modal">
      <div style="font-size:36px; margin-bottom:10px;">🐾</div>
      <h3 style="margin:0 0 6px;">Jak oceniają Państwo ostatnią wizytę?</h3>
      <p style="color:var(--text-soft); font-size:13px; margin:0 0 18px;">Opinia pomaga nam się rozwijać</p>
      <div class="stars-input big" id="rm-stars">
        ${[1,2,3,4,5].map(n => `<button type="button" class="star-btn" data-n="${n}" onclick="setRatingModalStar(${n})">★</button>`).join("")}
      </div>
      <textarea id="rm-comment" placeholder="Komentarz (opcjonalnie)" style="width:100%; margin:14px 0; resize:none; border-radius:12px; border:1px solid var(--border); padding:10px; font-size:14px; box-sizing:border-box;" rows="3"></textarea>
      <button class="btn" style="width:100%;" onclick="submitRating(${visitId}, ${petId})">Wyślij ocenę</button>
      <button class="btn outline" style="width:100%; margin-top:8px;" onclick="closeRatingModal()">Pomiń</button>
    </div>
  `;
  overlay.classList.add("open");
}

let _ratingModalValue = 0;
window.setRatingModalStar = (n) => {
  _ratingModalValue = n;
  document.querySelectorAll("#rm-stars .star-btn").forEach((b, i) => b.classList.toggle("active", i < n));
};

window.submitRating = async (visitId, petId) => {
  if (!_ratingModalValue) { toast("Proszę wybrać ocenę"); return; }
  try {
    await api(`/api/visits/${visitId}/rate`, {
      method: "POST",
      body: { rating: _ratingModalValue, rating_comment: document.getElementById("rm-comment")?.value || "" },
    });
    closeRatingModal();
    _ratingModalValue = 0;
    toast("Dziękujemy za ocenę!");
    const pet = await api(`/api/pets/${petId}`);
    renderOwnerPetCard(pet);
  } catch (e) { toast("Błąd: " + e.message); }
};

window.closeRatingModal = () => {
  document.getElementById("rating-overlay")?.classList.remove("open");
  _ratingModalValue = 0;
};

// ── Прайс-лист: парсинг та рендер ──────────────────────────────────────────
function parsePriceParts(p) {
  if (!p || p === "—") return { main: "—", hourly: null, empty: true };
  if (p.includes(" / ")) {
    const [main, hourly] = p.split(" / ").map(s => s.trim());
    return { main, hourly, empty: false };
  }
  if (p.includes("zł/godz") || p.includes("zł/год")) {
    return { main: p, hourly: null, empty: false, hourlyOnly: true };
  }
  return { main: p, hourly: null, empty: false };
}

function priceCell(raw) {
  const p = parsePriceParts(raw);
  if (p.empty) return `<span class="bp-empty">—</span>`;
  const main = `<span class="bp-main${p.hourlyOnly ? " bp-hourly" : ""}">${p.main}</span>`;
  const sub = p.hourly ? `<span class="bp-sub">${T.priceOr} ${p.hourly}</span>` : "";
  return main + sub;
}

const priceListState = { data: null, category: "all", search: "", breedKey: "" };

function breedMatches(breed, query) {
  if (!query) return true;
  return breed.toLowerCase().includes(query.toLowerCase().trim());
}

function isCurrentBreed(breedName) {
  const b = priceListState.breedKey;
  if (!b) return false;
  const bn = breedName.toLowerCase();
  return bn.includes(b) || b.includes(bn);
}

function breedCardFull(r, columns, opts = {}) {
  const badge = r.eligible ? `<span class="badge">★</span>` : "";
  const services = [
    { label: T.priceSvcFull, icon: "✂", value: r.full },
    { label: T.priceSvcBath, icon: "🛁", value: r.bath },
    { label: T.priceSvcCare, icon: "🌸", value: r.care },
  ];
  const rows = services.map(s => `
    <div class="bc-line">
      <span class="bc-svc"><span class="bc-ic">${s.icon}</span>${s.label}</span>
      <span class="bc-val">${priceCell(s.value)}</span>
    </div>
  `).join("");
  return `<div class="breed-card${opts.current ? " current" : ""}">
    <div class="bc-head">
      <span class="bc-name">${r.breed}</span>${badge}
    </div>
    <div class="bc-prices">${rows}</div>
  </div>`;
}

function breedRowSingle(r, field) {
  const badge = r.eligible ? `<span class="badge">★</span>` : "";
  const cur = isCurrentBreed(r.breed) ? " current" : "";
  return `<div class="breed-row${cur}">
    <div class="br-name">${r.breed}${badge}</div>
    <div class="br-price">${priceCell(r[field])}</div>
  </div>`;
}

function renderPriceList() {
  const block = $("#price-rows");
  if (!block) return;
  const data = priceListState.data;
  if (!data) return;

  const { category, search } = priceListState;
  const tabs = [
    { key: "all",    label: T.priceAll },
    { key: "full",   label: T.priceTabFull },
    { key: "bath",   label: T.priceTabBath },
    { key: "care",   label: T.priceTabCare },
    { key: "addons", label: T.priceTabAddons },
  ];
  const tabsHtml = tabs.map(t =>
    `<button type="button" class="pl-tab${t.key === category ? " active" : ""}" data-cat="${t.key}">${t.label}</button>`
  ).join("");

  const controlsHtml = `
    <div class="pl-controls">
      <div class="pl-search-wrap">
        <span class="pl-search-ic">🔎</span>
        <input class="pl-search" type="text" placeholder="${T.priceSearch}" value="${search.replace(/"/g, "&quot;")}" />
      </div>
      <div class="pl-tabs">${tabsHtml}</div>
    </div>
  `;

  let bodyHtml = "";

  if (category === "addons") {
    const filtered = data.additional.filter(a => breedMatches(a.name, search));
    if (filtered.length === 0) {
      bodyHtml = `<div class="pl-empty">${T.priceNoMatch}</div>`;
    } else {
      bodyHtml = `<div class="addons-list">` + filtered.map(a => `
        <div class="addon-row">
          <span class="ar-name">${a.name}</span>
          <span class="ar-price">${priceCell(a.price)}</span>
        </div>
      `).join("") + `</div>`;
    }
  } else {
    const filtered = data.rows.filter(r => breedMatches(r.breed, search));
    const current = filtered.find(r => isCurrentBreed(r.breed));
    const others  = filtered.filter(r => r !== current);

    if (filtered.length === 0) {
      bodyHtml = `<div class="pl-empty">${T.priceNoMatch}</div>`;
    } else if (category === "all") {
      const currentBlock = current ? `
        <div class="pl-section-title">${T.priceYourBreed}</div>
        ${breedCardFull(current, data.columns, { current: true })}
        <div class="pl-section-title">${T.priceOtherBreeds}</div>
      ` : "";
      const cards = others.map(r => breedCardFull(r, data.columns)).join("");
      bodyHtml = currentBlock + cards;
    } else {
      const field = category; // "full" | "bath" | "care"
      const currentBlock = current ? `
        <div class="pl-section-title">${T.priceYourBreed}</div>
        ${breedRowSingle(current, field)}
        <div class="pl-section-title">${T.priceOtherBreeds}</div>
      ` : "";
      const rows = others
        .filter(r => parsePriceParts(r[field]).empty === false)
        .map(r => breedRowSingle(r, field))
        .join("");
      bodyHtml = currentBlock + `<div class="breed-rows">${rows}</div>`;
    }
  }

  block.innerHTML = `
    ${controlsHtml}
    <div class="pl-body">${bodyHtml}</div>
    <div class="pl-footer">${T.priceLoyaltyHint}</div>
  `;

  // bind
  block.querySelectorAll(".pl-tab").forEach(btn => {
    btn.addEventListener("click", e => {
      priceListState.category = btn.dataset.cat;
      renderPriceList();
    });
  });
  const inp = block.querySelector(".pl-search");
  if (inp) {
    inp.addEventListener("input", e => {
      priceListState.search = e.target.value;
      // re-render preserving focus + caret
      const caret = inp.selectionStart;
      renderPriceList();
      const newInp = $("#price-rows .pl-search");
      if (newInp) { newInp.focus(); try { newInp.setSelectionRange(caret, caret); } catch (e) {} }
    });
    // tapping inside the input shouldn't toggle <details>
    inp.addEventListener("click", e => e.stopPropagation());
  }
}

async function loadPriceRows() {
  const block = $("#price-rows");
  if (!block) return;
  priceListState.breedKey = (block.dataset.breed || "").toLowerCase();
  priceListState.category = "all";
  priceListState.search = "";
  try {
    const data = await api(`/api/services?lang=${currentLang}`);
    priceListState.data = data;
    renderPriceList();
  } catch (e) {
    block.textContent = "—";
  }
}


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
        ${v.photo_before ? `<div class="visit-photo-wrap"><span class="photo-lbl">Przed</span><img src="${v.photo_before}" onclick="openPhotoSheet('${beforeSrc}', 'Przed')"></div>` : ""}
        ${v.photo_url    ? `<div class="visit-photo-wrap"><span class="photo-lbl">Po</span><img src="${v.photo_url}" onclick="openPhotoSheet('${afterSrc}', 'Po')"></div>` : ""}
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
      <p style="opacity:0.92;">Kim jesteś?</p>
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
              ${g.is_admin ? "Właściciel · pełny dostęp" : "Groomer"}
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
        <div class="label">${T.total}</div>
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

    <div style="padding:0 14px 8px;">
      <button class="btn outline small" onclick="renderCreateClient()" style="width:100%;">
        + Dodaj nowego klienta ręcznie
      </button>
    </div>

    <div id="pet-list">
      ${filtered.length === 0
        ? `<div class="empty"><div class="ic">🔍</div><p>${T.noResults}</p></div>`
        : filtered.map(petCardHTML).join("")}
    </div>
  `;

  $("#search-input").addEventListener("input", (e) => {
    groomerSearch = e.target.value.toLowerCase();
    const f = filterPets(pets);
    $("#pet-list").innerHTML = f.length === 0
      ? `<div class="empty"><div class="ic">🔍</div><p>${T.noResults}</p></div>`
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
    const q = groomerSearch.toLowerCase();
    list = list.filter(p =>
      (p.name || "").toLowerCase().includes(q) ||
      (p.owner_name || "").toLowerCase().includes(q) ||
      (p.breed || "").toLowerCase().includes(q) ||
      (p.owner_phone || "").replace(/\s/g, "").includes(q.replace(/\s/g, ""))
    );
  }
  return list;
}

function petCardHTML(p) {
  const photo = p.photo_url ? `<img src="${p.photo_url}">` : dogEmoji(p.breed);

  const chips = [];
  if (p.days_to_birthday !== null && p.days_to_birthday <= 14) {
    chips.push(`<span class="chip accent">🎂 ${p.days_to_birthday === 0 ? "Dzisiaj!" : T.birthdayDays(p.days_to_birthday)}</span>`);
  }
  if (p.allergies) {
    chips.push(`<span class="chip warning">⚠ ${T.allergies}</span>`);
  }
  if (p.next_visit) {
    chips.push(`<span class="chip">📅 ${fmtNextVisit(p.next_visit.scheduled_for)}</span>`);
  } else if (p.weeks_since_last_visit !== null && p.weeks_since_last_visit >= (p.followup_weeks || 6)) {
    chips.push(`<span class="chip danger">⏰ ${p.weeks_since_last_visit} tyg. bez wizyty</span>`);
  } else if (p.weeks_since_last_visit !== null) {
    chips.push(`<span class="chip muted">Ostatni: ${p.weeks_since_last_visit} tyg. temu</span>`);
  }
  if (p.loyalty?.milestone_reached) {
    chips.push(`<span class="chip loyalty-chip">🎁 Zniżka ${p.loyalty.milestone_discount}%</span>`);
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

window.toggleLoyalty = async (petId, enabled) => {
  const pet = await api(`/api/pets/${petId}/loyalty`, {
    method: "PATCH",
    body: { disabled: !enabled },
  });
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
            <div class="lbl">Telefon</div>
            <div class="val">${pet.owner.phone}</div>
          </div>
        </div>` : ""}
      ${pet.birthday ? `
        <div class="info-row">
          <div class="ic">🎂</div>
          <div class="label-block">
            <div class="lbl">Data urodzenia</div>
            <div class="val">${fmtDate(pet.birthday)}${pet.days_to_birthday !== null && pet.days_to_birthday <= 30 ? ` (za ${pet.days_to_birthday} ${pet.days_to_birthday === 1 ? "dzień" : "dni"})` : ""}</div>
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
      ${(pet.perfumes_ok === 0 || pet.treats_ok === 0) ? `
        <div class="info-row warning">
          <div class="ic">⚠</div>
          <div class="label-block">
            <div class="lbl">Preferencje</div>
            <div class="val">${pet.perfumes_ok === 0 ? "Bez perfum  " : ""}${pet.treats_ok === 0 ? "Bez smakołyków" : ""}</div>
          </div>
        </div>` : ""}
      ${pet.health_notes ? `
        <div class="info-row warning">
          <div class="ic">🏥</div>
          <div class="label-block">
            <div class="lbl">Zdrowie</div>
            <div class="val">${pet.health_notes}</div>
          </div>
        </div>` : ""}
    </div>

    ${pet.groomer_note_for_owner ? `
      <div class="notes-block client-visible">
        <div class="notes-block-label">👤 Informacja dla właściciela <span class="notes-visible-badge">Widoczne dla klienta</span></div>
        <div>${pet.groomer_note_for_owner}</div>
      </div>` : ""}
    ${pet.internal_note ? `
      <div class="notes-block internal-only">
        <div class="notes-block-label">🔒 Notatki wewnętrzne salonu <span class="notes-internal-badge">Nie widzi klient</span></div>
        <div>${pet.internal_note}</div>
      </div>` : ""}

    ${loyaltyCard(pet.loyalty)}

    <div class="card" style="padding:10px 16px; margin-top:-4px;">
      <label class="toggle-row" style="padding:0; background:transparent; border:none; gap:12px;">
        <div style="flex:1;">
          <div style="font-weight:600; font-size:14px;">Karta stałego klienta</div>
          <div style="font-size:12px; color:var(--text-soft); margin-top:2px;">
            ${pet.loyalty.loyalty_disabled
              ? "Wyłączona ręcznie przez salon"
              : (pet.loyalty.eligible ? "Aktywna" : "Nieaktywna — rasa poza programem")}
          </div>
        </div>
        <input type="checkbox" id="loyalty-toggle"
               ${!pet.loyalty.loyalty_disabled ? "checked" : ""}
               onchange="toggleLoyalty(${pet.id}, this.checked)">
      </label>
    </div>

    <div class="section-title">${T.history} (${pet.visits.length})</div>
    ${pet.visits.length === 0
      ? `<div class="empty"><div class="ic">📋</div><p>Brak wizyt</p></div>`
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
    return `
      <div class="date-chip ${isActive ? "active" : ""}" onclick="setScheduleDate('${iso}')">
        <div class="dc-day">${_daysShort()[dt.getDay()]}</div>
        <div class="dc-num">${dt.getDate()}</div>
      </div>
    `;
  }).join("");

  const groomersHtml = data.groomers.map(g => {
    const visits = g.visits || [];
    const visitsHtml = visits.length === 0
      ? `<div class="schedule-free">Wolny dzień</div>`
      : visits.map(v => {
          const reqChip = v.requested_by_owner ? `<span class="status-chip request">${T.statusRequest}</span>` : "";
          const statusKey = "status" + ((v.confirmation_status || "pending").charAt(0).toUpperCase() + (v.confirmation_status || "pending").slice(1));
          const sChip = `<span class="status-chip ${v.confirmation_status || "pending"}">${T[statusKey]}</span>`;
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
          <span class="groomer-count">${visits.length} ${visits.length === 1 ? "wizyta" : visits.length < 5 ? "wizyty" : "wizyt"}</span>
        </div>
        ${visitsHtml}
      </div>
    `;
  }).join("");

  app.innerHTML = `
    ${header({ title: T.tabSchedule, backFn: "goBackToList()" })}
    <div style="display:flex; gap:8px; padding:8px 14px 0; align-items:center;">
      <div class="date-strip" style="flex:1; margin:0;">${dateStrip}</div>
      <button class="btn outline small" onclick="renderWeekSchedule()" title="Widok tygodniowy"
              style="flex-shrink:0; padding:0 12px; height:36px; white-space:nowrap;">📆 Tydzień</button>
    </div>
    <div style="padding: 4px 14px 6px; font-size:13px; color:var(--text-soft);">
      ${fmtDateShort(scheduleDate)}
    </div>
    ${data.groomers.length === 0
      ? `<div class="empty"><div class="ic">📅</div><p>Brak grooomerów</p></div>`
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

// ── Week schedule view ────────────────────────────────────────────────────────
let weekScheduleStart = null;

window.renderWeekSchedule = async (startDate) => {
  app.innerHTML = `<div class="loading">${T.loading}</div>`;
  if (startDate) weekScheduleStart = startDate;
  if (!weekScheduleStart) {
    const today = new Date();
    const dow = today.getDay();
    // Start week on Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1));
    weekScheduleStart = isoDate(monday);
  }

  const data = await api(`/api/schedule/week?start_date=${weekScheduleStart}`);
  const groomers = data.groomers || [];

  // Week navigation
  const prevMonday = (() => {
    const d = new Date(weekScheduleStart + "T00:00:00");
    d.setDate(d.getDate() - 7);
    return isoDate(d);
  })();
  const nextMonday = (() => {
    const d = new Date(weekScheduleStart + "T00:00:00");
    d.setDate(d.getDate() + 7);
    return isoDate(d);
  })();

  const daysHtml = data.days.map(day => {
    const dt = new Date(day.date + "T00:00:00");
    const isToday = day.date === isoToday();
    const visits = day.visits || [];
    const visitsHtml = visits.length === 0
      ? `<div style="font-size:12px; color:var(--text-soft); padding:4px 0;">wolny</div>`
      : visits.map(v => {
          const groomer = groomers.find(g => g.id === v.groomer_id);
          const dot = groomer
            ? `<span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${groomer.color}; margin-right:4px;"></span>`
            : "";
          return `<div class="week-visit-item" onclick="showPet(${v.pet_id})">
            ${dot}<span style="font-size:12px; font-weight:600;">${fmtTime(v.scheduled_for)}</span>
            <span style="font-size:12px; margin-left:4px;">${v.pet_name}</span>
          </div>`;
        }).join("");
    return `
      <div class="week-day-col${isToday ? " today" : ""}" onclick="setScheduleDateAndDay('${day.date}')">
        <div class="week-day-header">
          <div class="week-day-name">${_daysShort()[dt.getDay()]}</div>
          <div class="week-day-num${isToday ? " today" : ""}">${dt.getDate()}</div>
        </div>
        <div class="week-day-visits">${visitsHtml}</div>
      </div>
    `;
  }).join("");

  app.innerHTML = `
    ${header({ title: "Tydzień", backFn: "renderSchedule()" })}
    <div style="display:flex; align-items:center; gap:10px; padding:8px 14px 6px;">
      <button class="btn outline small" onclick="renderWeekSchedule('${prevMonday}')">← Poprzedni</button>
      <div style="flex:1; text-align:center; font-size:13px; color:var(--text-soft);">
        ${fmtDateShort(weekScheduleStart)} – ${fmtDateShort(data.week_end)}
      </div>
      <button class="btn outline small" onclick="renderWeekSchedule('${nextMonday}')">Następny →</button>
    </div>
    <div class="week-grid">${daysHtml}</div>
    <div style="padding:10px 14px 6px;">
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        ${groomers.map(g => `<span style="display:flex; align-items:center; gap:5px; font-size:12px;">
          <span style="width:10px;height:10px;border-radius:50%;background:${g.color};display:inline-block;"></span>
          ${g.name}
        </span>`).join("")}
      </div>
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
};

window.setScheduleDateAndDay = (iso) => {
  scheduleDate = iso;
  groomerTab = "schedule";
  renderSchedule();
};

// ── Аналітика (вкладка) ──────────────────────────────────────────────────────
let analyticsPeriod = "month";

async function renderAnalytics() {
  app.innerHTML = `<div class="loading">${T.loading}</div>`;
  const isAdmin = currentGroomer?.is_admin ? 1 : 0;
  let data;
  try {
    data = await api(`/api/analytics?period=${analyticsPeriod}&is_admin=${isAdmin}`);
  } catch (e) {
    app.innerHTML = `
      ${header({ title: T.tabAnalytics, backFn: "goBackToList()" })}
      <div class="empty"><div class="ic">🔒</div><p>Brak dostępu do analityki</p></div>
    `;
    return;
  }

  const maxRevenue = Math.max(...(data.revenue_by_week.map(w => w.revenue)), 1);
  const months = ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"];

  const weeksHtml = data.revenue_by_week.length === 0
    ? `<div style="color:var(--text-soft); font-size:13px; padding:8px 0;">Brak danych za ten okres</div>`
    : data.revenue_by_week.map(w => {
        const pct = Math.round((w.revenue / maxRevenue) * 100);
        const dt = new Date(w.week + "T00:00:00");
        return `
          <div class="analytic-bar-row">
            <div class="analytic-bar-label">${dt.getDate()} ${months[dt.getMonth()]}</div>
            <div class="analytic-bar-track">
              <div class="analytic-bar-fill" style="width:${pct}%"></div>
            </div>
            <div class="analytic-bar-value">${w.revenue} zł</div>
          </div>
        `;
      }).join("");

  const byGroomerHtml = (data.by_groomer || []).map(g => `
    <div style="display:flex; align-items:center; gap:10px; padding:10px 0;
                border-bottom:1px solid var(--border);">
      <div style="width:10px; height:10px; border-radius:50%; background:${g.color}; flex-shrink:0;"></div>
      <div style="flex:1; font-weight:600; font-size:14px;">${g.name}</div>
      <div style="text-align:right; font-size:13px; color:var(--text-soft);">
        <div style="font-weight:600; color:var(--primary);">${g.revenue} zł</div>
        <div>${g.visits_count} wizyt${g.avg_rating ? ` · ⭐${g.avg_rating}` : ""}</div>
      </div>
    </div>
  `).join("");

  app.innerHTML = `
    ${header({ title: T.tabAnalytics, backFn: "goBackToList()" })}

    <div style="display:flex; gap:8px; padding: 0 14px 10px;">
      <button class="btn ${analyticsPeriod === "month" ? "" : "outline"} small"
              onclick="setAnalyticsPeriod('month')">Ten miesiąc</button>
      <button class="btn ${analyticsPeriod === "last_month" ? "" : "outline"} small"
              onclick="setAnalyticsPeriod('last_month')">Poprzedni miesiąc</button>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:0 14px 10px;">
      <div class="stat"><div class="label">Przychód</div>
        <div class="value" style="white-space:nowrap;">${data.revenue_total} zł</div></div>
      <div class="stat"><div class="label">Wizyty</div>
        <div class="value">${data.visits_count}</div></div>
      <div class="stat"><div class="label">Śr. wizyta</div>
        <div class="value" style="white-space:nowrap;">${Math.round(data.avg_per_visit)} zł</div></div>
      <div class="stat"><div class="label">Nowi klienci</div>
        <div class="value">${data.new_clients}</div></div>
      <div class="stat" style="grid-column:1/-1;"><div class="label">Ocena</div>
        <div class="value" style="white-space:nowrap;">${data.avg_rating ? "⭐ " + data.avg_rating + ` (${data.ratings_count})` : "—"}</div></div>
    </div>

    ${byGroomerHtml ? `
    <div class="card">
      <div class="section-title" style="padding:0 0 6px;">Przychód według groomera</div>
      ${byGroomerHtml}
    </div>` : ""}

    <div class="card">
      <div class="section-title" style="padding:0 0 10px;">Przychód tygodniowo</div>
      ${weeksHtml}
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
            <option value="">— Nie przydzielono —</option>
            ${groomers.map(g => `<option value="${g.id}">${g.name}</option>`).join("")}
          </select>
        </div>
      `;
    }
  } catch (e) { /* якщо не завантажились — пропускаємо */ }

  // Load services for checkboxes
  let svcCheckboxes = "";
  try {
    const svcData = await api("/api/services?lang=pl");
    const mainServices = svcData.columns;
    const addons = svcData.additional;
    svcCheckboxes = `
      <div class="row" style="margin-bottom:12px;">
        <label>Usługi</label>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${mainServices.map((s, i) => `
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
              <input type="checkbox" class="v-svc" value="${s}" ${i===0?"checked":""} style="width:auto;">
              <span style="font-size:14px;">${s}</span>
            </label>
          `).join("")}
          ${addons.map(a => `
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
              <input type="checkbox" class="v-svc" value="${a.name}" style="width:auto;">
              <span style="font-size:14px;">${a.name} — ${a.price}</span>
            </label>
          `).join("")}
        </div>
      </div>
    `;
  } catch (e) {
    svcCheckboxes = `
      <div class="row" style="margin-bottom:12px;">
        <label>${T.service}</label>
        <input type="text" id="v-service" value="Pełne grooming">
      </div>`;
  }

  openSheet(`
    <h3>${T.addVisitTitle}</h3>
    <div class="row" style="margin-bottom:12px;">
      <label>${T.visitDate}</label>
      <input type="date" id="v-date" value="${isoToday()}">
    </div>
    ${svcCheckboxes}
    <div class="row" style="margin-bottom:12px;">
      <label>${T.cutStyle}</label>
      <input type="text" id="v-cut" placeholder="Krótkie, równe / naturalne…">
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

    <div class="notes-block client-visible" style="margin-bottom:12px;">
      <div class="notes-block-label">
        👤 Notatka dla właściciela
        <span class="notes-visible-badge">Widoczne dla klienta!</span>
      </div>
      <textarea id="v-note-owner" placeholder="Np. polecamy odżywkę…" rows="2" style="width:100%; resize:none; box-sizing:border-box; margin-top:6px; border:none; background:transparent; font-size:14px;"></textarea>
    </div>

    <div class="notes-block internal-only" style="margin-bottom:12px;">
      <div class="notes-block-label">
        🔒 Notatka wewnętrzna salonu
        <span class="notes-internal-badge">Nie widzi klient</span>
      </div>
      <textarea id="v-notes" placeholder="Np. pies był nerwowy, kolejny raz z kagancem…" rows="2" style="width:100%; resize:none; box-sizing:border-box; margin-top:6px; border:none; background:transparent; font-size:14px;"></textarea>
    </div>

    <div class="row" style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
      <input type="checkbox" id="v-followup" checked style="width:auto;">
      <label for="v-followup" style="margin:0; font-size:14px;">Zaplanuj przypomnienie za 6 tygodni</label>
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
  const noteOwner = ($("#v-note-owner")?.value || "").trim();
  if (noteOwner) {
    const ok = confirm("Ta notatka BĘDZIE WIDOCZNA dla klienta.\n\nCzy na pewno chcesz ją zapisać?");
    if (!ok) return;
  }
  try {
    const groomerEl = $("#v-groomer");
    const groomer_id = groomerEl?.value ? parseInt(groomerEl.value) : null;
    // Collect checked services
    const checkedSvcs = [...document.querySelectorAll(".v-svc:checked")].map(el => el.value);
    const serviceText = checkedSvcs.join(", ") || ($("#v-service")?.value || "");
    const pet = await api(`/api/pets/${petId}/visits`, {
      method: "POST",
      body: {
        visit_date: $("#v-date").value,
        service: serviceText,
        services_json: JSON.stringify(checkedSvcs),
        cut_style: $("#v-cut").value,
        price: parseFloat($("#v-price").value) || 0,
        notes: $("#v-notes").value,
        groomer_note_for_owner: noteOwner,
        photo_before: $("#v-photo-before")?.value || "",
        photo_url: $("#v-photo-url")?.value || "",
        rating: null,
        groomer_id,
        schedule_followup: $("#v-followup").checked,
      },
    });
    closeSheet();
    const loy = pet.loyalty;
    if (loy?.milestone_reached) {
      toast(`🎁 Zniżka ${loy.milestone_discount}% — to strzyżenie ze zniżką!`, 3500);
    } else {
      toast(T.saved);
    }
    showPet(petId);
  } catch (e) {
    toast("Błąd: " + e.message);
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
            <option value="">— Nie przydzielono —</option>
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
window.renderOwnerPhoneLanding = renderOwnerPhoneLanding;

// Manual client creation form (for groomer view)
window.renderCreateClient = () => {
  app.innerHTML = `
    ${header({ title: "Nowy klient", backFn: "renderGroomer()" })}
    <div style="padding:14px; display:flex; flex-direction:column; gap:12px;">
      <div class="card" style="padding:16px;">
        <div style="font-size:13px; color:var(--text-soft); margin-bottom:14px; line-height:1.5;">
          Dla osób starszych, które nie mogą samodzielnie wypełnić formularza —
          wprowadź dane za klienta.
        </div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div><label style="font-size:12px; color:var(--text-soft); display:block; margin-bottom:4px;">Imię i nazwisko właściciela *</label>
            <input id="nc-name" type="text" placeholder="Anna Kowalska" style="width:100%; box-sizing:border-box;"></div>
          <div><label style="font-size:12px; color:var(--text-soft); display:block; margin-bottom:4px;">Telefon *</label>
            <div class="phone-row">
              <select id="nc-country">
                <option value="+48">🇵🇱 +48</option>
                <option value="+380">🇺🇦 +380</option>
                <option value="+49">🇩🇪 +49</option>
              </select>
              <input id="nc-phone" type="tel" inputmode="numeric" placeholder="123 456 789" oninput="onPhoneMask(event)">
            </div></div>
          <div><label style="font-size:12px; color:var(--text-soft); display:block; margin-bottom:4px;">Imię psa *</label>
            <input id="nc-pet" type="text" placeholder="Bella" style="width:100%; box-sizing:border-box;"></div>
          <div><label style="font-size:12px; color:var(--text-soft); display:block; margin-bottom:4px;">Rasa</label>
            <input id="nc-breed" type="text" list="nc-breed-list" placeholder="Zacznij pisać rasę…" style="width:100%; box-sizing:border-box;">
            <datalist id="nc-breed-list"></datalist></div>
          <div><label style="font-size:12px; color:var(--text-soft); display:block; margin-bottom:4px;">Data urodzenia psa</label>
            <input id="nc-bday" type="date" style="width:100%; box-sizing:border-box;"></div>
          <div><label style="font-size:12px; color:var(--text-soft); display:block; margin-bottom:4px;">Alergie</label>
            <input id="nc-allergies" type="text" placeholder="Np. szampon z lanoliną" style="width:100%; box-sizing:border-box;"></div>
        </div>
      </div>
      <button class="btn" onclick="saveNewClient()">Zapisz klienta</button>
    </div>
  `;
  api("/api/services?lang=pl").then(d => {
    const dl = document.getElementById("nc-breed-list");
    if (dl) dl.innerHTML = d.rows.map(r => `<option value="${r.breed}">`).join("");
  }).catch(() => {});
};

window.saveNewClient = async () => {
  const name = document.getElementById("nc-name")?.value.trim();
  const petName = document.getElementById("nc-pet")?.value.trim();
  const code = document.getElementById("nc-country")?.value || "+48";
  const num  = (document.getElementById("nc-phone")?.value || "").trim();
  if (!name || !petName) { toast("Imię właściciela i psa są wymagane"); return; }
  const phone = num ? `${code} ${num}` : "";
  try {
    const pet = await api("/api/pets", {
      method: "POST",
      body: {
        owner_name: name,
        owner_phone: phone,
        pet_name: petName,
        breed: document.getElementById("nc-breed")?.value || "",
        birthday: document.getElementById("nc-bday")?.value || "",
        allergies: document.getElementById("nc-allergies")?.value || "",
        notes: "",
        consents: ["sms_transactional", "regulamin", "rodo"],
      },
    });
    toast("Klient dodany");
    showPet(pet.id);
  } catch (e) { toast("Błąd: " + e.message); }
};

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
