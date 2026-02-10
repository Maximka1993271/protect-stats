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
    const statusElem = document.getElementById('status-text');
    if (statusElem) statusElem.innerText = data.status;
    
    try {
        // Добавление nocache предотвращает отображение старых данных браузером
        const res = await fetch(`stats.json?nocache=${Date.now()}`);
        if (!res.ok) throw new Error('Network error');
        
        const json = await res.json();
        for(let i=1; i<=6; i++) {
            const valElem = document.getElementById(`v${i}`);
            if (valElem) valElem.innerText = json[`v${i}`] || data.defaults[i-1];
        }
    } catch(e) {
        // Если json не найден, используем стандартные значения
        for(let i=1; i<=6; i++) {
            const valElem = document.getElementById(`v${i}`);
            if (valElem) valElem.innerText = data.defaults[i-1];
        }
    }
    
    // Обновление заголовков карточек
    data.h.forEach((hText, i) => {
        const hElem = document.getElementById(`h${i+1}`);
        if (hElem) hElem.innerText = hText;
    });

    // Подсветка активной кнопки языка
    document.querySelectorAll('.btn').forEach(b => {
        b.classList.toggle('active', b.id === currentLang);
    });
}

function setLang(l) { 
    currentLang = l; 
    localStorage.setItem('lang', l); 
    updateData(); 
}

document.addEventListener('DOMContentLoaded', () => { 
    updateData(); 
    setInterval(updateData, 30000); // Обновление каждые 30 секунд
});