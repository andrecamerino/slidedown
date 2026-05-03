# slidedown

Convert lecture slides (PDF/PPTX) into clean, AI-ready text.

## Tech stack
- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4**
- **shadcn/ui**
- **pdf-parse** + **pptx2json** (Phase 1 parsers)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Branching strategy

```
main          ← production, always stable
develop       ← staging, tested features
feature/*     ← new features (branch off develop)
fix/*         ← bug fixes (branch off develop)
```

All PRs go into `develop`. PM reviews and merges.

## Project structure

```
src/
├── app/
│   ├── api/convert/route.ts   ← file conversion API
│   ├── convert/page.tsx       ← converter UI
│   └── page.tsx               ← landing page
├── components/
│   ├── converter/UploadZone.tsx
│   └── layout/Navbar.tsx
├── lib/
│   ├── parsePDF.ts
│   ├── parsePPTX.ts
│   └── markdownToPlainText.ts
└── types/index.ts
```

## Roadmap

| Phase | Features |
|-------|----------|
| 1 — MVP | PDF/PPTX convert, copy output, landing page |
| 2 — Auth | Clerk login, Supabase library, usage limits |
| 3 — AI | Flashcards, summary templates, Stripe |
| 4 — Canvas | OAuth integration, institutional pitch |
