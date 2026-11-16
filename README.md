# Jing Chen: personal website

My personal website, designed in Figma and built by hand.

**Live:** [jingchen-dev.vercel.app](https://jingchen-dev.vercel.app)

It's one page with four parts:

- **Intro:** who I am, what I'm looking for, and how to contact me
- **Projects:** the two apps I've designed and built, with links to try them, the code and the Figma files
- **Design:** product design work from my five years as a designer
- **Library:** the books, manga, films and shows I've enjoyed recently

## Status

The redesign is live. I build it one small step at a time, and every push to `main` goes live.

Coming next:

- a page for each section: Projects, Design and Library
- library covers loaded from Open Library and TMDB, instead of saved by hand
- a hero background where small bricks build the Sydney Harbour Bridge and Opera House

## Design

- **Look:** warm off-white background with a faint dot grid, dark text, and a script logo.
- **Fonts:** DM Sans for text, and Sacramento for the logo.
- **Details:** the avatar, project screenshots and library covers turn from grey to colour on hover. On phones, they show in colour.
- **Phones:** cards stack, design rows wrap, and the library covers scroll sideways.
- **Goals:** easy to read, accessible, fast, and working well on phones.

## Tech

- [Next.js](https://nextjs.org) (App Router) with React and TypeScript
- Plain CSS Modules, with CSS variables for colours, sizes and spacing. No UI library.
- `next/font` to load the Google Fonts from the site itself
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
| `app/layout.tsx`      | Fonts, header and page metadata                    |
| `app/page.tsx`        | The page content                                   |
| `app/page.module.css` | Styles for the page sections                       |
| `app/globals.css`     | Design variables and base styles                   |
| `app/icon.png` etc.   | Favicon, Apple icon and link preview image         |
| `components/`         | Header and ProjectCard                             |
| `data/`               | Projects, design cases and library items           |
| `public/`             | Avatar, project screenshots, library covers and CV |

© 2026 Jing Chen
