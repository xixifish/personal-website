# Jing Chen: personal website

My personal website, designed in Figma and built by hand.

**Live:** [jingchen-dev.vercel.app](https://jingchen-dev.vercel.app)

## Status

The redesign is live. I build it one small step at a time, and every push to `main` goes live.

Coming next:

- a page for each section: Projects, Design and Library
- library covers loaded from Open Library and TMDB, instead of saved by hand
- a hero background where small bricks build the Sydney Harbour Bridge and Opera House

## Tech

- [Next.js](https://nextjs.org) (App Router) with React and TypeScript
- Plain CSS Modules, with CSS variables for colours, sizes and spacing. No UI library.
- `next/font` to load the Google Font from the site itself
- `next/image` for resized, compressed images
- Prettier and ESLint
- Hosted on [Vercel](https://vercel.com)

## Run it locally

You need Node.js installed.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other commands:

| Command                  | What it does                 |
| ------------------------ | ---------------------------- |
| `npm run build`          | Build the production version |
| `npm run lint`           | Check the code with ESLint   |
| `npx prettier --write .` | Format all files             |

## Project structure

| Path                  | What's in it                                       |
| --------------------- | -------------------------------------------------- |
| `app/layout.tsx`      | Font, header and page metadata                     |
| `app/page.tsx`        | The page content                                   |
| `app/page.module.css` | Styles for the page sections                       |
| `app/globals.css`     | Design variables and base styles                   |
| `app/icon.png` etc.   | Favicon, Apple icon and link preview image         |
| `components/`         | Header, Signature (the logo) and ProjectCard       |
| `data/`               | Projects, design cases and library items           |
| `public/`             | Avatar, project screenshots, library covers and CV |

© 2026 Jing Chen
