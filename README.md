# Jing Chen: personal website

My personal website, designed in Figma and built by hand.

**Live:** [jingchen-dev.vercel.app](https://jingchen-dev.vercel.app)

It's one page: a short introduction, a contact card, and the projects I've recently designed and built.

## Status

Work in progress. I'm building it one small step at a time, and every push to `main` goes live.

Coming next:

- page structure and the contact card
- project covers that turn from grey to colour on hover
- phone layout
- accessibility checks (keyboard, contrast, screen reader)
- a signature that writes itself when you scroll to the end

## Design

- **Look:** warm paper texture, dark brown text, and handwritten links.
- **Fonts:** Lato for body text, and Kalam for my name and the links.
- **Goals:** easy to read, accessible, fast, and working well on phones.

## Tech

- [Next.js](https://nextjs.org) (App Router) with React and TypeScript
- Plain CSS, with CSS variables for colours and sizes. No UI library.
- `next/font` to load the Google Fonts from the site itself
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

| Path              | What's in it                                    |
| ----------------- | ----------------------------------------------- |
| `app/layout.tsx`  | Fonts and page metadata (title and description) |
| `app/page.tsx`    | The page content                                |
| `app/globals.css` | Design variables and base styles                |
| `public/`         | Images, such as the paper texture               |

© 2026 Jing Chen
