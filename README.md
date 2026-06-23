# Yu-Gi-Oh! Explorer: Ink & Steel Premium Edition

A high-contrast, minimalist Yu-Gi-Oh! card explorer and database terminal built with a focus on speed, mobile ergonomics, and strict image caching compliance. 

The project has been migrated from a remote Supabase backend to a **fully offline-first SQLite database architecture**, featuring automatic background metadata sync on startup.

![Theme](https://img.shields.io/badge/Theme-Ink%20%26%20Steel-ffea00?style=for-the-badge&labelColor=0a0a0a)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![SQLite](https://img.shields.io/badge/SQLite-Offline-003B57?style=for-the-badge&logo=sqlite)
![Express](https://img.shields.io/badge/Express-API-000000?style=for-the-badge&logo=express)

---

## ✨ Features

- **Holographic 3D Card Parallax**: Added mouse movement parallax calculations to rotate cards in 3D perspective, overlaying a dynamic radial foil shimmer using `mix-blend-mode: color-dodge`.
- **YDK Deck Registry Builder**: Multi-deck registry creator. Enforces Yu-Gi-Oh! copy limits (max 3 copies per card) and handles exporting `.ydk` text files compatible with standard card simulators.
- **Card Comparator (Split Screen)**: Side-by-side card stats verification. Calculates ATK, DEF, Level, and Price differences, highlighting superior values in neon green (`#a6e3a1`) and inferior values in neon red (`#ff5555`).
- **Interactive Quiz Terminal**: Timed logical decryption minigame. Guess cards using two distinct modes (Holographic image de-blurring or logic effect text analysis with redacted names) featuring score streaks and synthesized Web Audio.
- **Database Quantum Analytics**: View database aggregates (monsters, spells, traps composition percentages) and attribute distributions rendered using responsive React SVGs without third-party chart engines.
- **Booster Gacha Pack**: Open booster packs to draw 9 random cards from the offline database, complete with card reveal HMR and synthesized physical cards opening sounds.
- **Local SQLite Caching**: Express backend automatically syncs 14,000+ cards on startup in under `0.2s` using database transactions, and downloads card images locally to `data/images/` upon search query requests.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 (TypeScript), Vite
- **UI Library**: Material UI (MUI v6)
- **Icons**: Lucide React
- **Backend Server**: Express 5.x, Node.js + tsx
- **Database**: SQLite (`better-sqlite3`)
- **Sound Synth**: Web Audio API (Synthesized click, hover, correct, incorrect, and card draw tones)
- **Styling**: Vanilla CSS (`src/index.css`) + MUI Emotion Theme

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kouzen-neo/ygo-sanx.git
   cd ygo-sanx
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run Development Mode**:
   Start the Express REST API (port `3001`) and the Vite web development server (port `5173`) concurrently:
   ```bash
   pnpm dev
   ```

4. **Production Build**:
   Compile typescript declarations and bundle the static client environment:
   ```bash
   pnpm build
   ```

---

## ⚖️ License & Compliance

This project complies strictly with [YGOPRODeck API Rules](https://db.ygoprodeck.com/api-guide/). To prevent image hotlinking and protect external bandwidth resources, card images are automatically proxied, saved, and cached in the local `./data/images/` folder on first view.

---

Built with ⚡ by Antigravity CLI
