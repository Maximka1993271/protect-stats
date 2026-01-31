const langData = {
    ua: {
        status: 'Система аналізу трафіку Zero-Latency активована',
        badge: 'Active',
        h: ["Оптимізація", "Покарання", "Адмін-панель", "Моніторинг", "Фільтрація", "Статус сервера"],
        v: ["Zero-Latency Engine", "30m → 2h → 24h", "3 рівні доступу", "Live Stats", "Dynamic Blacklist", "Захищено Aegis"],
        dict: { "Secured": "Захищено Aegis", "Active": "Активно", "Live Stats": "Активно" }
    },
    ru: {
        status: 'Система анализа трафика Zero-Latency активирована',
        badge: 'Active',
        h: ["Оптимизация", "Наказания", "Админ-панель", "Мониторинг", "Фильтрация", "Статус сервера"],
        v: ["Zero-Latency Engine", "30m → 2h → 24h", "3 уровня доступа", "Live Stats", "Dynamic Blacklist", "Защищено Aegis"],
        dict: { "Secured": "Защищено Aegis", "Active": "Активно", "Live Stats": "Активно" }
    },
    en: {
        status: 'Zero-Latency traffic analysis engine active',
        badge: 'Active',
        h: ["Optimization", "Punishment", "Admin Panel", "Monitoring", "Filtering", "Server Status"],
        v: ["Zero-Latency Engine", "Progressive Tiers", "3 Access Levels", "Live Audit Log", "Dynamic Blacklist", "Secured by Aegis"],
        dict: { "Secured": "Secured by Aegis", "Active": "Active", "Live Stats": "Active" }
    }
};

let currentLang = localStorage.getItem('language') || 'ua';
const ui = { status: null, badge: null, h: [], v: [], btns: null };

function initDOM() {
    ui.status = document.getElementById('status-text');
    ui.badge = document.getElementById('badge-text');
    ui.btns = document.querySelectorAll('.btn');
    // Очищуємо масиви перед ініціалізацією
    ui.h = []; ui.v = [];
    for (let i = 1; i <= 6; i++) {
        ui.h.push(document.getElementById('h' + i));
        ui.v.push(document.getElementById('v' + i));
    }
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    const data = langData[lang];
    const d = data.dict;

    // Оновлення заголовків та статусу
    if (ui.status) ui.status.innerText = data.status;
    if (ui.badge) ui.badge.innerText = data.badge;

    // Оновлення заголовків карток (h1-h6)
    ui.h.forEach((el, i) => { 
        if (el) el.innerText = data.h[i]; 
    });

    // Оновлення значень карток (v1-v6) з перекладом статусів
    ui.v.forEach((el, i) => {
        if (el) {
            const val = data.v[i];
            el.innerText = d[val] || val;
        }
    });

    // Оновлення активної кнопки
    ui.btns.forEach(btn => btn.classList.toggle('active', btn.id === lang));
}

document.addEventListener("DOMContentLoaded", () => {
    initDOM();
    setLang(currentLang);
});