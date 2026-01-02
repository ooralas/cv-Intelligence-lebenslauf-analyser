# CV Intelligence - Lebenslauf Analyser

Dieses Projekt ist eine moderne Web-Anwendung zur Analyse von Lebensläufen. Es nutzt Künstliche Intelligenz, um unstrukturierte Lebenslauf-Texte in strukturierte, visuell ansprechende Berichte zu verwandeln.

## Features
- **PDF & Bild Analyse**: Unterstützt das Hochladen von Lebensläufen als PDF oder Foto (PNG, JPG).
- **KI-Analyse**: Nutzt `puter.js` (@heyputer/puter.js) für fortschrittliche Dokumenten-Analyse.
- **Privacy Focused**: Nutzt nur systemeigene Schriften (keine Google Fonts).
- **Modernes UI**: Glassmorphismus-Design mit flüssigen Animationen und Responsive Layout.

## Tech Stack
- **Vue.js 3**: Modernes Frontend Framework (Composition API).
- **Pinia**: Zentrales State Management.
- **Puter.js**: Cloud-Infrastruktur und AI-Dienste.
- **Vite**: Superschnelles Build-Tool.
- **Vanilla CSS**: Individuelles Design-System für maximale Performance und Flexibilität.

## Installation und Start

1.  **Abhängigkeiten installieren:**
    ```bash
    npm install
    ```

2.  **Entwicklungsserver starten:**
    ```bash
    npm run dev
    ```

3.  **Produktions-Build:**
    ```bash
    npm run build
    ```

## Funktionsweise
Die App ermöglicht es dem Nutzer, den Text seines Lebenslaufs einzufügen. Dieser Text wird an das AI-Modell von Puter gesendet, welches die Informationen extrahiert und als strukturiertes JSON zurückgibt. Die Anwendung visualisiert diese Daten dann in einem übersichtlichen, professionellen Dashboard.

---
