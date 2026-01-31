const langData = {
    ua: {
        status: 'Система аналізу трафіку Zero-Latency активована',
        h: ["Оптимізація", "Покарання", "Адмін-панель", "Моніторинг", "Фільтрація", "Статус сервера"],
        v: ["Zero-Latency Engine", "Прогресивна шкала", "3 рівні доступу", "Live Audit Log", "Dynamic Blacklist", "Захищено Aegis"],
        dict: { "Secured": "Захищено Aegis", "Active": "Активно", "Live Stats": "Активно" }
    },
    ru: {
        status: 'Система анализа трафика Zero-Latency активирована',
        h: ["Оптимизация", "Наказания", "Админ-панель", "Мониторинг", "Фильтрация", "Статус сервера"],
        v: ["Zero-Latency Engine", "Прогрессивная шкала", "3 уровня доступа", "Live Audit Log", "Dynamic Blacklist", "Защищено Aegis"],
        dict: { "Secured": "Защищено Aegis", "Active": "Активно", "Live Stats": "Активно" }
    },
    en: {
        status: 'Zero-Latency traffic analysis engine active',
        h: ["Optimization", "Punishment", "Admin Panel", "Monitoring", "Filtering", "Server Status"],
        v: ["Zero-Latency Engine", "Progressive Tiers", "3 Access Levels", "Live Audit Log", "Dynamic Blacklist", "Secured by Aegis"],
        dict: { "Secured": "Secured by Aegis", "Active": "Active", "Live Stats": "Active" }
    }
};

let currentLang = localStorage.getItem('language') || 'ua';
const ui = { status: null, h: [], v: [], btns: null };

function initDOM() {
    ui.status = document.getElementById('status-text');
    ui.btns = document.querySelectorAll('.btn');
    for (let i = 1; i <= 6; i++) {
        ui.h.push(document.getElementById('h' + i));
        ui.v.push(document.getElementById('v' + i));
    }
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    const data = langData[lang];

    if (ui.status) ui.status.innerText = data.status;
    ui.h.forEach((el, i) => { if (el) el.innerText = data.h[i]; });
    ui.v.forEach((el, i) => { if (el) el.innerText = data.v[i]; });
    ui.btns.forEach(btn => btn.classList.toggle('active', btn.id === lang));

    loadLiveStats();
}

async function loadLiveStats() {
    try {
        const response = await fetch(`stats.json?t=${Date.now()}`);
        if (!response.ok) return;
        const data = await response.json();
        const d = langData[currentLang].dict;

        // Оновлюємо значення, якщо вони присутні в JSON
        if (data.v1) ui.v[0].innerText = data.v1;
        if (data.v2) ui.v[1].innerText = data.v2;
        if (data.v3) ui.v[2].innerText = data.v3;
        
        // Статуси проганяємо через словник перекладу
        if (data.v4) ui.v[3].innerText = d[data.v4] || data.v4;
        if (data.v5) ui.v[4].innerText = d[data.v5] || data.v5;
        if (data.v6) ui.v[5].innerText = d[data.v6] || data.v6;
    } catch (e) { console.warn('Sync skipped.'); }
}

setInterval(loadLiveStats, 300000); // 5 хвилин

document.addEventListener("DOMContentLoaded", () => {
    initDOM();
    setLang(currentLang);
});