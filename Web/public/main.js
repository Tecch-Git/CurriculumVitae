const projectData = {
    kapazitaet: {
        title: 'Kapazitätsplanung (ERP-Integration)',
        period: '12/2025 – heute',
        client: 'TimberTec',
        team: '2 Entwickler',
        role: 'Backend-Entwicklung',
        description: 'WebApp zur Kapazitätsplanung und Ressourcenübersicht mit automatisierter Datenanbindung an ein ERP.',
        bullets: [
            { label: 'Backend-Architektur', text: 'Datenbank-Modellierung und Entwicklung mittels Entity Framework. Entwurf und Entwicklung der REST API.' },
            { label: 'Kapazitätsberechnung', text: 'Entwicklung der Logik zur Berechnung der Kapazität und Auslastung von Ressourcen.' },
            { label: 'ERP-Integration', text: 'Entwicklung eines eigenständigen ASP.Net Core Services zur automatisierten, zyklischen Datenübernahme aus dem ERP via Stored Procedures. Import über die REST API mittels OAuth2 Client-Credentials-Flow.' },
            { label: 'Ergebnis', text: 'Transparente Übersicht der Auslastung von Ressourcen um Engpässen und mögliche Lieferterminen für neue Aufträge zu bestimmen.' },
        ],
        stack: ['C#', 'ASP.NET Core (.NET 10)', 'Vertical Slice Architecture', 'EF Core', 'OpenIddict (OAuth2)', 'REST', 'T-SQL', 'Blazor Hybrid'],
    },
    event: {
        title: 'Event Administration',
        period: '05/2025 – heute',
        client: 'Privat',
        team: '1 Entwickler',
        role: 'Fullstack-Entwicklung',
        description: 'WebApp zur digitalen Verwaltung von Helfern und Personaleinteilungen für mehrtägige Events inkl. automatisierter SMS-Benachrichtigung.',
        bullets: [
            { label: 'Digitalisierung Personalplanung', text: 'Ablösung Excel-basierter Planung durch eine WebApp zur Pflege von Helferstammdaten und Einteilungsplänen inkl. Plausibilitätsprüfungen.' },
            { label: 'Import & Datenübernahme', text: 'Umsetzung eines CSV-Imports für Stammdaten und Personalpläne als Einstieg für bestehende Datenbestände.' },
            { label: 'Benachrichtigungs-Automatisierung', text: 'Funktion zur automatischen Generierung von Nachrichten auf Basis definierter Vorlagen. Bereitstellung der Nachrichten über eine serverseitige Queue zum automatisierten Abruf und Versand durch die Android-App „Automate".' },
            { label: 'Ergebnis', text: 'Deutlich weniger manueller Verwaltungsaufwand durch schnellere Planänderungen, vereinfachte Erkennung von Konflikten wie Doppeleinteilungen und automatisierten Benachrichtigungen.' },
        ],
        stack: ['C#', 'ASP.NET Core (.NET 10)', 'Clean Architecture', 'EF Core', 'SQLite', 'JWT', 'Vue.js', 'Vite', 'REST'],
    },
    kvh: {
        title: 'Modernisierung KVH-Produktionslinie',
        period: '06/2024 – 08/2025',
        client: 'TimberTec',
        team: '1 Entwickler, 1 Projektleiter',
        role: 'Fullstack-Entwicklung',
        description: 'Migration und Erweiterung der Legacy-Anlagensteuerung einer KVH-Produktionslinie.',
        bullets: [
            { label: 'System-Migration (Visual Basic, C#)', text: 'Erfolgreiche Migration einer historisch gewachsenen, undokumentierten Legacy-Anlagensteuerung (Visual Basic) auf eine moderne ASP.NET-Serverarchitektur.' },
            { label: 'Algorithmen & Materialfluss', text: 'Konzeption und Implementierung einer neuen Pufferlager-Logik für den bestehenden Stangenkran zur signifikanten Optimierung des Materialflusses.' },
            { label: 'Frontend & 3D', text: 'Entwicklung einer interaktiven, webbasierten 3D-Visualisierung des Puffer- und Kommissionier-Lager zur Überwachung und erleichterten Bedienung.' },
            { label: 'Digitalisierung', text: 'Ablösung von Papierprozessen durch die vollständige Digitalisierung des Pressenlaufzettels.' },
            { label: 'Ergebnis', text: 'Zukunftssichere Modernisierung der Anlage. Steigerung der Prozesseffizienz durch einen optimierten Materialfluss sowie Arbeitserleichterung für die Bediener durch Digitalisierung und verbesserter Usability.' },
        ],
        stack: ['C#', 'ASP.NET (.NET 8)', 'Visual Basic (Legacy)', 'T-SQL', 'Vue.js', 'three.js'],
    },
    abbund: {
        title: 'Integration Abbund-Maschinen',
        period: '11/2023 – 06/2024',
        client: 'TimberTec',
        team: '1 Entwickler, 1 Projektleiter',
        role: 'FullStack-Entwickler',
        description: 'Integration von Abbund-Maschinen in die bestehende BSH-Produktionslinie. Automatisierung und Optimierung des Materialflusses.',
        bullets: [
            { label: 'Backend & Maschinensteuerung', text: 'Entwicklung der Leitrechner-Software zur Automatisierung des Materialflusses über Fetch/Write Schnittstellen zur SPS.' },
            { label: 'Intelligentes Puffer-Management', text: 'Implementierung von Algorithmen zur Platzfindung, Umschichtungsstrategien und Wegeoptimierung im vollautomatisierten Pufferlager.' },
            { label: 'Frontend & 3D', text: 'Entwicklung interaktiver Dashboards sowie einer 3D-Echtzeitvisualisierung der gesamten Anlage zur Überwachung und Steuerung.' },
            { label: 'Ergebnis', text: 'Erfolgreiche Beseitigung eines kritischen Produktionsengpasses. Umstellung von manueller Logistik- und Datenübergabeprozesse in einen durchgängig automatisierten Ablauf mit messbarer Durchsatzsteigerung.' },
        ],
        stack: ['C#', 'ASP.NET (.NET 8)', 'Vue.js', 'three.js', 'T-SQL', 'MQTT', 'XML'],
    },
};

function openModal(id) {
    const data = projectData[id];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;

    const teamInfo = document.getElementById('modalTeamInfo');
    if (data.team || data.role) {
        teamInfo.innerHTML = [
            data.team ? `<span class="text-gray-500">Team:</span> ${data.team}` : '',
            data.role ? `<span class="text-gray-500">Rolle:</span> ${data.role}` : '',
        ].filter(Boolean).join(' &nbsp;|&nbsp; ');
        teamInfo.classList.remove('hidden');
    } else {
        teamInfo.textContent = '';
        teamInfo.classList.add('hidden');
    }

    const badges = document.getElementById('modalBadges');
    badges.innerHTML = `
        <span class="bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded">${data.period}</span>
        <span class="bg-white/10 text-gray-400 text-xs font-bold px-3 py-1 rounded">${data.client}</span>
    `;

    const bullets = document.getElementById('modalBullets');
    bullets.innerHTML = data.bullets.map(b => `
        <div class="flex gap-3">
            <span class="mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
            <p class="text-sm text-gray-300 leading-relaxed"><span class="font-semibold text-white">${b.label}:</span> ${b.text}</p>
        </div>
    `).join('');

    const stack = document.getElementById('modalStack');
    stack.innerHTML = data.stack.map(s =>
        `<span class="bg-white/5 text-gray-300 px-2 py-1 rounded text-xs">${s}</span>`
    ).join('');

    const overlay = document.getElementById('projectModal');
    overlay.classList.add('modal-visible');
    document.body.classList.add('modal-open');
    overlay.querySelector('.modal-content').scrollTop = 0;
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('modal-visible');
    document.body.classList.remove('modal-open');
}

document.getElementById('projectModal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
});


function toggleDescriptionDropdown(btn) {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const panel = btn.nextElementSibling;
    const chevron = btn.querySelector('i');

    if (expanded) {
        panel.style.maxHeight = '0';
        chevron.style.transform = '';
        btn.setAttribute('aria-expanded', 'false');
    } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        chevron.style.transform = 'rotate(180deg)';
        btn.setAttribute('aria-expanded', 'true');
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('a[href="#about"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.getElementById('about');
        const offset = target.offsetTop - Math.max(0, (window.innerHeight - target.offsetHeight) / 2);
        window.scrollTo({ top: offset, behavior: 'smooth' });
    });
});

// Mobile navigation menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-xmark');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-xmark');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}
