const lang = {
    ua: {
        status: 'Система аналізу трафіку Zero-Latency активована',
        h: ["Оптимізація", "Наказання", "Адмін-панель", "Моніторинг", "Фільтрація", "Статус сервера"],
        defaults: ["Zero-Latency Engine", "30m → 2h → 24h", "3 рівні доступу", "Активно", "Динам. список", "Захищено Aegis"]
    },
    ru: {
        status: 'Система анализа трафика Zero-Latency активирована',
        h: ["Оптимизация", "Наказания", "Админ-панель", "Мониторинг", "Фильтрация", "Статус сервера"],
        defaults: ["Zero-Latency Engine", "30m → 2h → 24h", "3 уровня доступа", "Активно", "Динам. список", "Защищено Aegis"]
    },
    en: {
        status: 'Zero-Latency traffic analysis engine active',
        h: ["Optimization", "Punishment", "Admin Panel", "Monitoring", "Filtering", "Server Status"],
        defaults: ["Zero-Latency Engine", "30m → 2h → 24h", "3 Access Levels", "Active", "Dynamic List", "Secured by Aegis"]
    }
};

let currentLang = localStorage.getItem('lang') || 'ru';

async function updateData() {
    const data = lang[currentLang];
    document.getElementById('status-text').innerText = data.status;
    try {
        const res = await fetch(`stats.json?nocache=${Date.now()}`);
        const json = await res.json();
        for(let i=1; i<=6; i++) document.getElementById(`v${i}`).innerText = json[`v${i}`] || data.defaults[i-1];
    } catch(e) {
        data.defaults.forEach((v, i) => document.getElementById(`v${i+1}`).innerText = v);
    }
    data.h.forEach((h, i) => document.getElementById(`h${i+1}`).innerText = h);
    document.querySelectorAll('.btn').forEach(b => b.classList.toggle('active', b.id === currentLang));
}

function setLang(l) { currentLang = l; localStorage.setItem('lang', l); updateData(); }
document.addEventListener('DOMContentLoaded', () => { updateData(); setInterval(updateData, 30000); });