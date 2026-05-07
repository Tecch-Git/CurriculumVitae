1. Instructions (Anweisungen)
Was: Direktive, die das Verhalten des Modells steuern
Anwendung:
System-Level Instructions (globale Verhaltensrichtlinien)
Repository-spezifische Instructions (z.B. in .github/copilot-instructions.md)
Inline-Comments oder Task-Beschreibungen im Code
Zweck: Coding-Standards, Konventionen, Best Practices durchsetzen
Beispiel: "Verwende TypeScript strict mode", "Nutze async/await statt Promises"
2. Agents (Agenten)
Was: Spezialisierte Systeme mit definierten Rollen und Werkzeugen
Besonderheiten:
Haben Zugriff auf spezifische Tools/APIs
Können mehrschrittige Aufgaben automatisieren
Arbeiten mit Kontext aus Repository, Issues, PRs
Beispiele:
GitHub Copilot CLI Agent für Terminal-Aufgaben
Chat Agents für verschiedene Spezialisierungen
Nutzen: Automatisierung von Workflows wie Code-Review, Issue-Analyse
3. Skills (Fähigkeiten)
Was: Spezialisierte Anweisungssätze für komplexe Aufgaben
Charakteristik:
Strukturierte, detaillierte Workflows
Best Practices und mehrstufige Anleitung
Laden bei Bedarf ("on-demand")
Beispiele:
Stack-Trace-Debugging-Skill (den Sie gerade sehen)
PR-Review-Skill
Testing-Strategien-Skill
Vorteil: Komplexe Aufgaben systematisch lösen
4. Weitere wichtige Kontextquellen
Repository Context (Automatisch)
Dateiinhalte und Struktur
Abhängigkeiten und Package-Manager-Konfiguration
README und Dokumentation
Aktuelle Branches und Commits
Conversation History
Bisherige Fragen und Antworten in der Session
Kontextaufbau über mehrere Turns
Referenzen zu bisherigen Erkenntnissen
GitHub Integration
Issues & PRs: Kontext aus aktuellen Aufgaben
Commit History: Verständnis für Code-Evolution
Diff Context: Veränderungen im Detail
Actions Logs: Fehlerdiagnose in CI/CD
File Context & Symbols
Explizite Dateiquellen mit #file-reference
Symbol-Definitionen und Type-Informationen
Cross-file-Dependencies verstehen
Web Context
Aktuelle Dokumentation
API-Referenzen
Externe Abhängigkeiten und Versionen


┌─────────────────────────────────────────┐
│         USER PROMPT / REQUEST            │
└────────────────┬────────────────────────┘
                 │
        ┌────────▼────────┐
        │  SKILL LOADER   │
        │  (Optional)     │
        └────────┬────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
┌───▼────┐            ┌──────▼──────┐
│SKILL   │            │  CONTEXT    │
│INSTRUC-│            │  GATHERER   │
│TIONS   │            │             │
└───┬────┘            └──────┬──────┘
    │  ┌──────────────────────┘
    │  │
    │  ├─ Repository Files
    │  ├─ GitHub Issues/PRs
    │  ├─ Conversation History
    │  ├─ Git History
    │  └─ Web Information
    │
┌───▼──────────────────────────┐
│    AGENT/LLM PROCESSING      │
│  mit ALL SKILLS & CONTEXT    │
└──────────────────────────────┘



