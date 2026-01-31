const langData = {
    ua: {
        status: 'Система аналізу трафіку Zero-Latency активована',
        badge: 'Active',
        h: ["Оптимізація", "Покарання", "Адмін-панель", "Моніторинг", "Фільтрація", "Статус сервера"],
        defaults: ["Zero-Latency Engine", "30m → 2h → 24h", "3 рівні доступу", "Active", "Dynamic Blacklist", "Secured"],
        dict: { "Secured": "Захищено Aegis", "Active": "Активно", "Live Stats": "Активно", "Dynamic Blacklist": "Динам. список" }
    },
    ru: {
        status: 'Система анализа трафика Zero-Latency активирована',
        badge: 'Active',
        h: ["Оптимизация", "Наказания", "Админ-панель", "Мониторинг", "Фильтрация", "Статус сервера"],
        defaults: ["Zero-Latency Engine", "30m → 2h → 24h", "3 уровня доступа", "Active", "Dynamic Blacklist", "Secured"],
        dict: { "Secured": "Защищено Aegis", "Active": "Активно", "Live Stats": "Активно", "Dynamic Blacklist": "Динам. список" }
    },
    en: {
        status: 'Zero-Latency traffic analysis engine active',
        badge: 'Active',
        h: ["Optimization", "Punishment", "Admin Panel", "Monitoring", "Filtering", "Server Status"],
        defaults: ["Zero-Latency Engine", "Progressive Tiers", "3 Access Levels", "Active", "Dynamic Blacklist", "Secured"],
        dict: { "Secured": "Secured by Aegis", "Active": "Active", "Live Stats": "Active", "Dynamic Blacklist": "Dynamic Blacklist" }
    }
};

let currentLang = localStorage.getItem('language') || 'ua';
let lastStats = null;
const ui = { status: null, badge: null, h: [], v: [], btns: null };

function initDOM() {
    ui.status = document.getElementById('status-text');
    ui.badge = document.getElementById('badge-text');
    ui.btns = document.querySelectorAll('.btn');
    ui.h = []; ui.v = [];
    for (let i = 1; i <= 6; i++) {
        ui.h.push(document.getElementById('h' + i));
        ui.v.push(document.getElementById('v' + i));
    }
}

function renderStats() {
    const data = langData[currentLang];
    ui.v.forEach((el, i) => {
        if (!el) return;
        const key = 'v' + (i + 1);
        const val = (lastStats && lastStats[key]) ? lastStats[key] : data.defaults[i];
        el.innerText = data.dict[val] || val;
    });
}

async function loadLiveStats() {
    try {
        const response = await fetch(`stats.json?v=${Date.now()}`); // Захист від кешу
        if (response.ok) {
            lastStats = await response.json();
            renderStats();
        }
    } catch (e) { console.warn("Файл stats.json не доступний."); renderStats(); }
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    const data = langData[lang];

    if (ui.status) ui.status.innerText = data.status;
    if (ui.badge) ui.badge.innerText = data.badge;
    ui.h.forEach((el, i) => { if (el) el.innerText = data.h[i]; });
    ui.btns.forEach(btn => btn.classList.toggle('active', btn.id === lang));
    renderStats();
}

document.addEventListener("DOMContentLoaded", () => {
    initDOM();
    setLang(currentLang);
    loadLiveStats();
    setInterval(loadLiveStats, 20000); // Оновлення кожні 20 секунд
});