const projectData = {
    kapazitaet: {
        title: 'Kapazitätsplanung (ERP-Integration)',
        period: '12/2025 – heute',
        client: 'TimberTec',
        description: 'WebApp zur Kapazitätsplanung und Ressourcenübersicht für die Holzbau-Produktion mit automatisierter Datenanbindung an das TiCom-ERP.',
        bullets: [
            { label: 'Backend-Architektur (VSA)', text: 'Entwurf und Umsetzung der gesamten REST API nach dem Vertical Slice Architecture Pattern — ein Endpoint pro Use Case, selbstbeschrieben und isoliert testbar.' },
            { label: 'Multi-Provider-Persistenz', text: 'Datenbankmodellierung mit EF Core und providerübergreifendem Migrations-Konzept (SQLite, PostgreSQL, SQL Server) für flexible Deployment-Szenarien.' },
            { label: 'Kapazitätsberechnung', text: 'Serverseitige Logik zur zeitlichen Auslastungsermittlung inkl. konfigurierbarer Filter- und Aggregationsmechanismen.' },
            { label: 'ERP-Integration (Worker Service)', text: 'Entwicklung eines eigenständig deploybaren ASP.NET Core Worker Services zur automatisierten, zyklischen Datenübernahme aus dem TiCom-ERP via Stored Procedures. Import über die REST API mittels OAuth2 Client-Credentials-Flow (OpenIddict).' },
            { label: 'Ergebnis', text: 'Transparente, echtzeitnahe Kapazitätsübersicht mit automatisierter Datensynchronisation aus dem führenden ERP-System. Ablösung manueller Planungsübersichten durch eine zentrale, stets aktuelle WebApp.' },
        ],
        stack: ['C#', 'ASP.NET Core (.NET 10)', 'Vertical Slice Architecture', 'EF Core', 'OpenIddict (OAuth2)', 'Blazor Hybrid', 'MudBlazor', 'REST'],
    },
    event: {
        title: 'Event Administration',
        period: '05/2025 – heute',
        client: 'Privat',
        description: 'WebApp zur digitalen Verwaltung von Helfern und Personaleinteilungen für mehrtägige Events inkl. automatisierter SMS-Benachrichtigung.',
        bullets: [
            { label: 'Digitalisierung Personalplanung', text: 'Ablösung Excel-basierter Planung durch eine WebApp zur Pflege von Helferstammdaten und Einteilungsplänen inkl. Plausibilitätsprüfungen.' },
            { label: 'Import & Datenübernahme', text: 'Umsetzung eines CSV-Imports für Helfer und Personalpläne als Einstieg für bestehende Datenbestände.' },
            { label: 'Benachrichtigungs-Automatisierung', text: 'Nachrichtenfunktion zur automatischen Generierung (Vorlagen) und Kontrolle/Bearbeitung von SMS-Texten.' },
            { label: 'Queue-/Pull-Prinzip (REST)', text: 'Bereitstellung von ausgehenden SMS in einer serverseitigen Queue. Abruf der nächsten Nachricht per REST Endpoint durch die Android-App „Automate" zum automatisierten Versand aller generierten Nachrichten.' },
            { label: 'Security & Ausblick', text: 'Authentifizierung via JWT, Rollen-/Rechtekonzept für Bereichsverantwortliche in Arbeit.' },
            { label: 'Ergebnis', text: 'Deutlich weniger manueller Kommunikationsaufwand (SMS), schnellere Planänderungen und vereinfachte Erkennung von Konflikten wie Doppeleinteilungen.' },
        ],
        stack: ['C#', 'ASP.NET Core (.NET 10)', 'Clean Architecture', 'EF Core', 'SQLite', 'JWT', 'Vue.js', 'Vite', 'REST'],
    },
    kvh: {
        title: 'Modernisierung KVH-Produktionslinie',
        period: '06/2024 – 08/2025',
        client: 'TimberTec',
        description: 'Migration und Erweiterung der Legacy-Anlagensteuerung einer KVH-Produktionslinie.',
        bullets: [
            { label: 'System-Migration (C#, .NET)', text: 'Erfolgreiche Migration einer historisch gewachsenen, undokumentierten Legacy-Anlagensteuerung (Visual Basic) auf eine moderne C#/.NET-Serverarchitektur für eine komplette KVH-Linie (u.a. Keilzinke, Hobel, Säge, Krananlagen).' },
            { label: 'Algorithmen & Materialfluss', text: 'Konzeption und Implementierung einer neuen Pufferlager-Logik für den bestehenden Stangenkran zur signifikanten Optimierung des Materialflusses.' },
            { label: 'Frontend & 3D', text: 'Entwicklung einer interaktiven, webbasierten 3D-Visualisierung des Puffer- und Kommissionierlagers zur Überwachung und erleichterten Bedienung.' },
            { label: 'Digitalisierung', text: 'Ablösung von Papierprozessen durch die vollständige Digitalisierung des Pressenlaufzettels.' },
            { label: 'Ergebnis', text: 'Zukunftssichere Modernisierung der Anlage. Steigerung der Prozesseffizienz durch den optimierten Materialfluss sowie Arbeitserleichterung für die Bediener durch Digitalisierung und verbesserter Usability.' },
        ],
        stack: ['C#', '.NET', 'Visual Basic (Legacy)', 'Vue.js', 'Three.js', 'T-SQL'],
    },
    abbund: {
        title: 'Integration Abbund-Maschinen',
        period: '11/2023 – 06/2024',
        client: 'TimberTec',
        description: 'Integration von Abbund-Maschinen in die bestehende BSH-Produktionslinie. Automatisierung und Optimierung des Materialflusses.',
        bullets: [
            { label: 'Backend & Maschinensteuerung (C#, .NET)', text: 'Entwicklung der Leitrechner-Software zur Automatisierung des Materialflusses über Fetch/Write Schnittstellen zur SPS.' },
            { label: 'Intelligentes Puffer-Management', text: 'Implementierung von Algorithmen zur Platzfindung, Umschichtungsstrategien und Wegeoptimierung.' },
            { label: 'Frontend & 3D', text: 'Entwicklung interaktiver Dashboards mit einer 3D-Echtzeitvisualisierung zur Live-Überwachung und Anlagensteuerung.' },
            { label: 'Ergebnis', text: 'Erfolgreiche Beseitigung eines kritischen Produktionsengpasses. Transformation manueller Logistik- und Datenübergabeprozesse in einen durchgängig automatisierten Ablauf mit messbarer Durchsatzsteigerung.' },
        ],
        stack: ['C#', '.NET', 'Vue.js', 'Three.js', 'T-SQL', 'MQTT', 'XML'],
    },
};

function openModal(id) {
    const data = projectData[id];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;

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


function toggleDiplomarbeit(btn) {
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
