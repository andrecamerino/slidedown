# Slidedown — Claude Code Context

## What this project is
Slidedown converts lecture PDFs and PowerPoints into clean markdown/text so students can paste into any AI tool (ChatGPT, Claude, Gemini) without hitting context limits. Built by students, for students.

## Your role
You are the Dev. The PM reviews and merges all PRs. Never push directly to `main` or `develop`.

---

## Tech stack
- **Framework:** Next.js 16, App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Parsers:** pdfjs-dist (client-side PDF) + jszip (client-side PPTX) — Phase 2 swaps in a Python microservice for heavier parsing
- **Package manager:** pnpm only — never use npm
- **Hosting:** Vercel

---

## Branching rules
```
main        ← production, never touch directly
staging     ← staging, never touch directly
feature/*   ← branch off develop for new features
fix/*       ← branch off develop for bug fixes
```

- Always: `git checkout -b feature/name develop`
- One feature per branch
- Commit messages: `feat:`, `fix:`, `chore:`, `refactor:`
- PM reviews and merges all PRs into develop

---

## Deployment

Vercel is connected to this repo via GitHub integration:
- `main` → production (`slidedown-andre.vercel.app`)
- `staging` → staging (`slidedown-staging.vercel.app`)
- Every PR → its own Vercel preview URL

No GitHub Actions workflow is needed — Vercel handles CI/CD automatically.
To deploy: merge develop → main via PR as usual.

## Design system

### Colours
```
--bg-base:       #0c0c0f
--bg-surface:    #111115
--bg-raised:     #141418
--purple:        #7F77DD
--purple-dark:   #534AB7
--purple-light:  #AFA9EC
--teal:          #5DCAA5
--border:        rgba(255, 255, 255, 0.07)
--text-primary:  #ffffff
--text-secondary: rgba(255, 255, 255, 0.55)
--text-muted:    rgba(255, 255, 255, 0.32)
```

### Key UI rules
- Dark theme only (no light mode in MVP)
- Hover glow on primary buttons: `box-shadow: 0 0 24px rgba(127,119,221,0.55)`
- Ghost button hover: `border-color: rgba(127,119,221,0.45)` + subtle glow
- Upload zone hover: purple border glow
- Hero gradient text: `linear-gradient(130deg, #fff 0%, #AFA9EC 60%, #7F77DD 100%)`
- Hero glow orbs: blurred radial divs, purple + teal
- Borders: always `rgba(255,255,255,0.07)` — never solid white

---

## Project structure
```
src/
├── app/
│   ├── api/convert/route.ts     ← POST /api/convert (server-side, used on Vercel)
│   ├── convert/page.tsx         ← converter UI
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 ← landing page
├── components/
│   ├── converter/
│   │   └── UploadZone.tsx
│   ├── feedback/
│   │   └── FeedbackModal.tsx
│   ├── landing/
│   │   ├── enironmental/
│   │   │   ├── EnironmentalCard.tsx
│   │   │   └── EnvironmentalSection.tsx
│   │   ├── features/
│   │   │   ├── CtrlFDemo.tsx
│   │   │   ├── Feature.tsx
│   │   │   ├── FeatureTag.tsx
│   │   │   ├── Features.tsx
│   │   │   └── MergeDemo.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── HowItWorks.tsx
│   └── layout/
│       └── Navbar.tsx
├── lib/
│   ├── parsePDF.ts              ← server-side (Node.js, used by /api/convert)
│   ├── parsePDFClient.ts        ← client-side (pdfjs-dist, browser)
│   ├── parsePPTX.ts             ← server-side (Node.js, used by /api/convert)
│   ├── parsePPTXClient.ts       ← client-side (jszip, browser)
│   ├── conversionContext.tsx    ← React context for conversion state
│   ├── fadeUp.ts                ← shared scroll-triggered fade animation
│   ├── pendingFile.ts
│   ├── markdownToPlainText.ts
│   └── constants.ts
└── types/
    └── index.ts
```

---

## API contract

### POST /api/convert
- Body: `multipart/form-data`
- Fields: `file` (PDF or PPTX), `format` (`markdown` | `plaintext`)
- Response: `{ success: boolean, output?: string, slideCount?: number, error?: string }`
- Max file size: 50MB

---

## UX rules
- No login for MVP — free, no sign-up required
- Plain language only — never use "tokens", say "AI limit" instead
- Upload zone on landing page routes directly to `/convert`
- Copy button always visible and prominent when output exists
- Mobile friendly at all times

---

## MVP feature branch order
1. `feature/landing-page` — dark hifi landing page with hero, stats, features, merge demo, env section ✓
2. `feature/pdf-converter` — PDF → markdown via /api/convert ✓
3. `feature/pptx-converter` — PPTX support + slide count. Skipping for now.
4. `feature/converter-ui` — split pane, format toggle, copy button ✓
5. `feature/merge-files` — multi-file upload + merge output. Skipping for now.

---

## Phase roadmap
| Phase | Features |
|-------|----------|
| 1 — MVP | File conversion, copy output, landing page, no auth |
| 2 — Auth | Clerk login, Supabase private library, usage limits |
| 3 — AI | Flashcards, summary templates, Stripe payments |
| 4 — Canvas | OAuth integration, institutional pitch |

---

## Commands
```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm lint         # run eslint
pnpm type-check   # run tsc --noEmit
```
