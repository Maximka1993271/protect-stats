const langData = {
    ua: {
        title: 'Моніторинг',
        status: 'Ядро Aegis Eternity: <span class="badge">ACTIVE (64-BIT)</span>',
        h: ["Ліміт порушень", "Rate Limit", "Час бану", "Скидання ліміту", "Метод бану", "Статус логів"],
        v: ["30", "25", "120 min", "Автоматично", "SourceMod Engine", "Level 2 (Warn)"]
    },
    ru: {
        title: 'Мониторинг',
        status: 'Ядро Aegis Eternity: <span class="badge">ACTIVE (64-BIT)</span>',
        h: ["Лимит нарушений", "Rate Limit", "Время бана", "Сброс лимита", "Метод бана", "Статус логов"],
        v: ["30", "25", "120 min", "Автоматически", "SourceMod Engine", "Level 2 (Warn)"]
    },
    en: {
        title: 'Monitoring',
        status: 'Aegis Eternity Core: <span class="badge">ACTIVE (64-BIT)</span>',
        h: ["Violation Limit", "Rate Limit", "Ban Duration", "Reset Period", "Ban Method", "Log Level"],
        v: ["30", "25", "120 min", "Automatic", "SourceMod Engine", "Level 2 (Warn)"]
    }
};

function setLang(lang) {
    document.getElementById('main-title').innerText = langData[lang].title;
    document.getElementById('status-line').innerHTML = langData[lang].status;
    for(let i=1; i<=6; i++) {
        document.getElementById('h'+i).innerText = langData[lang].h[i-1];
        document.getElementById('v'+i).innerText = langData[lang].v[i-1];
    }
    ['ua', 'ru', 'en'].forEach(l => {
        document.getElementById(l).className = l === lang ? 'btn active' : 'btn';
    });
    loadLiveStats();
}

function loadLiveStats() {
    fetch('stats.json?t=' + new Date().getTime())
      .then(response => response.json())
      .then(data => {
        if(data.violation_limit) document.getElementById('v1').innerText = data.violation_limit;
        if(data.global_rate) document.getElementById('v2').innerText = data.global_rate;
        if(data.ban_time) document.getElementById('v3').innerText = data.ban_time;
        if(data.reset_type) document.getElementById('v4').innerText = data.reset_type;
        if(data.ban_method) document.getElementById('v5').innerText = data.ban_method;
        if(data.log_level) document.getElementById('v6').innerText = data.log_level;
      })
      .catch(e => console.log('Fetch error:', e));
}

document.addEventListener("DOMContentLoaded", () => setLang('ru'));