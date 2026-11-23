# Jing Chen: personal website

My personal website, designed in Figma and built by hand.

**Live:** [jingchen-dev.vercel.app](https://jingchen-dev.vercel.app)

## Status

The redesign is live. I build it one small step at a time, and every push to `main` goes live.

Coming next:

- a page for each section: Projects, Design and Library
- library covers loaded from Open Library and TMDB, instead of saved by hand

## Features

- **Contact form** in the footer. It posts to my own Next.js route, which checks the input, drops spam caught by a hidden honeypot field, and sends the message with [Resend](https://resend.com). The button shows Sending, Sent or an error, and the visitor's text stays if sending fails.
- **Brick picture** in the footer, drawn on a canvas. When the footer scrolls into view, small bricks fall and build the Sydney Harbour Bridge and Opera House, then fireworks play once. It plays once per visit, shows the finished picture with reduced motion on, and is hidden on phones.
- **Dot grid** background that darkens around the pointer.
- **Logo** that writes itself like a pen, and replays on hover.
- **Copy email** button next to the email link.

## Tech

- [Next.js](https://nextjs.org) (App Router) with React and TypeScript
- Plain CSS Modules, with CSS variables for colours, sizes and spacing. No UI library.
- `next/font` to load the Google Font from the site itself
- `next/image` for resized, compressed images
- A Next.js route handler and [Resend](https://resend.com) to send contact messages
- Canvas 2D for the brick picture and fireworks
- Prettier and ESLint
- Hosted on [Vercel](https://vercel.com)

## Run it locally

You need Node.js installed.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

The contact form needs a Resend API key. Put it in a file called `.env.local`:

```bash
RESEND_API_KEY=re_...
```

Without it, the site still builds and runs, and the form shows its error message.

Other commands:

| Command                  | What it does                 |
| ------------------------ | ---------------------------- |
| `npm run build`          | Build the production version |
| `npm run lint`           | Check the code with ESLint   |
| `npx prettier --write .` | Format all files             |

## Project structure

| Path                       | What's in it                                                                                       |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| `app/layout.tsx`           | Font, header, footer and page metadata                                                             |
| `app/page.tsx`             | The page content                                                                                   |
| `app/page.module.css`      | Styles for the page sections                                                                       |
| `app/globals.css`          | Design variables and base styles                                                                   |
| `app/api/contact/route.ts` | Checks a contact message and sends it with Resend                                                  |
| `app/icon.png` etc.        | Favicon, Apple icon and link preview image                                                         |
| `components/`              | Header, Signature (the logo), ProjectCard, CopyEmail, DotGlow, Footer, ContactForm and BrickCanvas |
| `data/`                    | Projects, design cases, library items, my email and the brick picture map                          |
| `public/`                  | Avatar, project screenshots, library covers and CV                                                 |

© 2026 Jing Chen
