# Fußball Imposter

Ein Party-Spiel im Stil von **Splash / Imposter** – aber alles dreht sich um Fußballer.

Alle Spieler bekommen **denselben Fußballer** angezeigt – **außer dem Imposter**.
Reihum beschreibt jeder seinen Spieler, ohne ihn direkt zu verraten. Danach wird abgestimmt: **Wer ist der Imposter?**

Läuft komplett auf **einem Handy** – das Gerät wird herumgereicht, jeder tippt heimlich sein Wort auf.

## Spielen

Einfach `index.html` im Browser öffnen (Handy oder Desktop). Keine Installation, kein Server nötig – reines HTML/CSS/JavaScript.

Alternativ über **GitHub Pages** hosten und den Link am Handy öffnen (Repo → Settings → Pages → Branch wählen).

## Ablauf

1. **Einstellungen:** Anzahl Spieler (3–15), Anzahl Imposter, optionaler Hinweis für den Imposter, zufälliger Startspieler.
2. **Aufdecken:** Das Handy geht reihum. Jeder tippt seine Karte an und sieht entweder den Fußballer oder „Du bist der Imposter“.
3. **Diskutieren:** Reihum beschreibt jeder seinen Spieler. Ein optionaler Timer hilft.
4. **Auflösen:** Das Wort und der/die Imposter werden aufgedeckt. „Neue Runde“ startet mit neuem Spieler.

## Features

- **127 bekannte Fußballer** – aktive Spieler und Legenden, die man kennt, wenn man halbwegs Fußball guckt.
- **1–5 Imposter** möglich.
- **Optionaler Hinweis** für den Imposter (z. B. „Stürmer · Argentinien“), damit er mitraten kann.
- **Zufälliger Startspieler** und **Diskussions-Timer**.
- Mobil-optimiert, mit Flip-Animation und Vibrations-Feedback.

## Dateien

| Datei | Inhalt |
|-------|--------|
| `index.html` | Aufbau der Bildschirme |
| `style.css`  | Design (Fußballplatz-Look, mobil-first) |
| `app.js`     | Spiellogik & Ablauf |
| `players.js` | Fußballer-Datenbank |

Neue Spieler hinzufügen? Einfach in `players.js` eine Zeile ergänzen:

```js
{ name: "Spielername", hint: "Position · Land" },
```
