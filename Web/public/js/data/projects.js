/**
 * Project data – single source of truth.
 * Astro migration target: src/data/projects.ts
 *
 * cardTitle / cardDescription  → shown on the project card (brief)
 * title / description          → shown in the detail modal (full)
 */
export const projects = [
    {
        id: 'kapazitaet',
        cardTitle: 'Kapazitätsplanung',
        title: 'Kapazitätsplanung (ERP-Integration)',
        period: '12/2025 – heute',
        client: 'TimberTec',
        team: '2 Entwickler',
        role: 'Backend-Entwicklung',
        cardDescription: 'WebApp zur Kapazitätsplanung und Ressourcenübersicht um Engpässe zu erkennen und Lieferdaten zu optimieren.',
        description: 'WebApp zur Kapazitätsplanung und Ressourcenübersicht mit automatisierter Datenanbindung an ein ERP.',
        bullets: [
            { label: 'Backend-Architektur', text: 'Datenbank-Modellierung und Entwicklung mittels Entity Framework. Entwurf und Entwicklung der REST API.' },
            { label: 'Kapazitätsberechnung', text: 'Entwicklung der Logik zur Berechnung der Kapazität und Auslastung von Ressourcen.' },
            { label: 'ERP-Integration', text: 'Entwicklung eines eigenständigen ASP.Net Core Services zur automatisierten, zyklischen Datenübernahme aus dem ERP via Stored Procedures. Import über die REST API mittels OAuth2 Client-Credentials-Flow.' },
            { label: 'Ergebnis', text: 'Transparente Übersicht der Auslastung von Ressourcen um Engpässen und mögliche Lieferterminen für neue Aufträge zu bestimmen.' },
        ],
        stack: ['C#', 'ASP.NET Core (.NET 10)', 'Vertical Slice Architecture', 'EF Core', 'OpenIddict (OAuth2)', 'REST', 'T-SQL', 'Blazor Hybrid'],
    },
    {
        id: 'event',
        cardTitle: 'Event Administration',
        title: 'Event Administration',
        period: '05/2025 - heute',
        team: '1 Entwickler',
        role: 'Fullstack-Entwicklung',
        cardDescription: 'WebApp zur digitalen Verwaltung von Personaleinteilungen für mehrtägige Events inklusive automatisierter SMS-Benachrichtigung.',
        description: 'WebApp zur digitalen Verwaltung von Helfern und Personaleinteilungen für mehrtägige Events inkl. automatisierter SMS-Benachrichtigung.',
        bullets: [
            { label: 'Digitalisierung Personalplanung', text: 'Ablösung Excel-basierter Planung durch eine WebApp zur Pflege von Helferstammdaten und Einteilungsplänen inkl. Plausibilitätsprüfungen.' },
            { label: 'Import & Datenübernahme', text: 'Umsetzung eines CSV-Imports für Stammdaten und Personalpläne als Einstieg für bestehende Datenbestände.' },
            { label: 'Benachrichtigungs-Automatisierung', text: 'Funktion zur automatischen Generierung von Nachrichten auf Basis definierter Vorlagen. Bereitstellung der Nachrichten über eine serverseitige Queue zum automatisierten Abruf und Versand durch die Android-App „Automate".' },
            { label: 'Ergebnis', text: 'Deutlich weniger manueller Verwaltungsaufwand durch schnellere Planänderungen, vereinfachte Erkennung von Konflikten wie Doppeleinteilungen und automatisierten Benachrichtigungen.' },
        ],
        stack: ['C#', 'ASP.NET Core (.NET 10)', 'Clean Architecture', 'EF Core', 'SQLite', 'JWT', 'Vue.js', 'Vite', 'REST'],
    },
    {
        id: 'kvh',
        cardTitle: 'Modernisierung KVH-Produktionslinie',
        title: 'Modernisierung KVH-Produktionslinie',
        period: '06/2024 – 08/2025',
        client: 'TimberTec',
        team: '1 Entwickler, 1 Projektleiter',
        role: 'Fullstack-Entwicklung',
        cardDescription: 'Migration und Optimierung einer Visual Basic Anlagensteuerung auf einen modernen .NET C# LogicServer mit webbasierter 3D-Visualisierung zur Anlagenüberwachung.',
        description: 'Migration und Erweiterung der Legacy-Anlagensteuerung einer KVH-Produktionslinie.',
        bullets: [
            { label: 'System-Migration (Visual Basic → C#)', text: 'Erfolgreiche Migration einer historisch gewachsenen, undokumentierten Legacy-Anlagensteuerung (Visual Basic) auf eine moderne ASP.NET-Serverarchitektur.' },
            { label: 'Algorithmen & Materialfluss', text: 'Konzeption und Implementierung einer neuen Pufferlager-Logik für den bestehenden Stangenkran zur signifikanten Optimierung des Materialflusses.' },
            { label: 'Frontend & 3D', text: 'Entwicklung einer interaktiven, webbasierten 3D-Visualisierung des Puffer- und Kommissionier-Lager zur Überwachung und erleichterten Bedienung.' },
            { label: 'Digitalisierung', text: 'Ablösung von Papierprozessen durch die vollständige Digitalisierung des Pressenlaufzettels.' },
            { label: 'Ergebnis', text: 'Zukunftssichere Modernisierung der Anlage. Steigerung der Prozesseffizienz durch einen optimierten Materialfluss sowie Arbeitserleichterung für die Bediener durch Digitalisierung und verbesserter Usability.' },
        ],
        stack: ['C#', 'ASP.NET (.NET 8)', 'Visual Basic (Legacy)', 'T-SQL', 'Vue.js', 'three.js'],
    },
    {
        id: 'abbund',
        cardTitle: 'Integration Abbund-Maschinen',
        title: 'Integration Abbund-Maschinen',
        period: '11/2023 – 06/2024',
        client: 'TimberTec',
        team: '1 Entwickler, 1 Projektleiter',
        role: 'FullStack-Entwickler',
        cardDescription: 'Integration von Abbund-Maschinen in die bestehende BSH-Produktionslinie. Automatisierung und Optimierung des Materialflusses.',
        description: 'Integration von Abbund-Maschinen in die bestehende BSH-Produktionslinie. Automatisierung und Optimierung des Materialflusses.',
        bullets: [
            { label: 'Backend & Maschinensteuerung', text: 'Entwicklung der Leitrechner-Software zur Automatisierung des Materialflusses über Fetch/Write Schnittstellen zur SPS.' },
            { label: 'Intelligentes Puffer-Management', text: 'Implementierung von Algorithmen zur Platzfindung, Umschichtungsstrategien und Wegeoptimierung im vollautomatisierten Pufferlager.' },
            { label: 'Frontend & 3D', text: 'Entwicklung interaktiver Dashboards sowie einer 3D-Echtzeitvisualisierung der gesamten Anlage zur Überwachung und Steuerung.' },
            { label: 'Ergebnis', text: 'Erfolgreiche Beseitigung eines kritischen Produktionsengpasses. Umstellung von manueller Logistik- und Datenübergabeprozesse in einen durchgängig automatisierten Ablauf mit messbarer Durchsatzsteigerung.' },
        ],
        stack: ['C#', 'ASP.NET (.NET 8)', 'Vue.js', 'three.js', 'T-SQL', 'MQTT', 'XML'],
    },
];
