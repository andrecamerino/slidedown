<p align="center">
  <img src=".github/banner.svg" alt="slidedown — your lecture slides, ready for any AI" width="100%">
</p>

<p align="center">
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/deployed%20on-Vercel-000000?logo=vercel&logoColor=white" alt="Deployed on Vercel"></a>
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/pnpm-package%20manager-F69220?logo=pnpm&logoColor=white" alt="pnpm">
</p>

<br>

Upload a lecture PDF or PowerPoint and get back clean, readable text you can paste straight into ChatGPT, Claude, Gemini, or any AI tool. No sign-up, no limits, no files leaving your browser.

## Screenshots

<p align="center">
  <img src=".github/screenshots/landing.jpg" alt="slidedown landing page" width="49%">
  <img src=".github/screenshots/converter.jpg" alt="slidedown converter — 1.2 MB PDF reduced to 12 KB" width="49%">
</p>

## Features

- 📄 Supports PDF and PowerPoint (.pptx)
- ⚡ Client-side parsing — your files never leave your browser
- 📋 One-click copy for ChatGPT, Claude, Gemini, or any AI
- 📥 Download output as a `.txt` file
- 📊 Live stats: page count, size reduction, word count
- 🚫 No login, no sign-up, completely free

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| PDF parsing | pdfjs-dist (client-side) |
| PPTX parsing | jszip (client-side) |
| Hosting | Vercel |

## Getting started

```bash
git clone https://github.com/andrecamerino/slidedown.git
cd slidedown
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Roadmap

| Phase | Status | Features |
|-------|--------|----------|
| 1 — MVP | ✅ Done | PDF/PPTX convert, copy output, landing page |
| 2 — Auth | Planned | Clerk login, Supabase library, usage limits |
| 3 — AI | Planned | Flashcards, summary templates, Stripe |
| 4 — Canvas | Planned | OAuth integration, institutional pitch |

## License

MIT
