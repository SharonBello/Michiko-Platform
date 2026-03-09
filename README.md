# Michiko VR Platform

AI-powered VR educational game creation platform.

## Quick start
```bash
npm install
npm run dev
```

- Platform (React): http://localhost:3000
- API (Express): http://localhost:8080

## Palette (locked)
| Token | Hex | Role |
|-------|-----|------|
| `--color-brand`  | `#00C8E0` | Cyan — primary actions, links |
| `--color-accent` | `#E63946` | Red — CTAs, alerts, logo red |
| `--color-hi`     | `#7B35D4` | Purple — highlights, badges, logo accent |
| `--color-bg`     | `#080808` | Page background |
| `--color-surface`| `#101010` | Cards, panels |

## Stack
- Frontend: React 18 + TypeScript + SCSS Modules (Vite)
- Backend: Node.js Express (Cloud Run)
- DB: PostgreSQL (Cloud SQL) + Firestore
- AI: Gemini 1.5 Flash + GPT-4o
- Game Engine: Babylon.js (WebXR)
