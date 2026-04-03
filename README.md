# Pitambar Pandey - Portfolio Website

A handcrafted single-page portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

This project highlights software engineering work, skills, coursework, experience, and contact details in a clean "built by an engineer" style with smooth motion and responsive design.

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- React Icons
- HTML5 Canvas (custom particle network background)

## Features

- Light mode by default + dark mode toggle
- Theme preference persisted with `localStorage`
- Fixed responsive navbar with animated tab styles
- Hero section with animated code-window presentation
- Interactive particle network background
- Skills, Projects, Experience, Schooling, Contact, and Footer sections
- Mobile-first responsive layout across sections

## Project Structure

```txt
src/
  App.jsx
  index.css
  components/
    Navbar.jsx
    Hero.jsx
    About.jsx
    Skills.jsx
    Projects.jsx
    Experience.jsx
    Schooling.jsx
    Contact.jsx
    Footer.jsx
    ParticleNetwork.jsx
public/
  favicon.svg
  profile.jpg
  resume.pdf
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Customization

- Update personal content directly in files under `src/components/`
- Replace resume at `public/resume.pdf`
- Replace profile image at `public/profile.jpg`
- Update favicon at `public/favicon.svg`
- Adjust theme tokens in `tailwind.config.js`

## Notes

- The canvas particle background is implemented with raw Canvas API (no particle library).
- Animations are powered by Framer Motion for smooth section entry and UI transitions.

## SEO & production domain

This is a **Vite + React SPA** (single HTML entry). On-page SEO is handled in `index.html` (title, meta, Open Graph, Twitter, canonical, JSON-LD). At build time, `vite.config.js` replaces `%SITE_URL%` and `%OG_IMAGE_URL%` with values from your environment and writes `robots.txt` and `sitemap.xml` into `dist/`.

1. Copy `.env.example` to `.env` and set **`VITE_SITE_URL`** to your live site (no trailing slash), e.g. `https://yourdomain.com`.
2. Add a social preview image at **`public/og-image.png`** (recommended **1200×630** PNG or JPG), or set **`VITE_OG_IMAGE_URL`** to a full image URL.
3. Run `npm run build` and deploy the **`dist`** folder.
4. After deploy, submit **`https://yourdomain.com/sitemap.xml`** in [Google Search Console](https://search.google.com/search-console) and verify domain ownership.

**Static hosting notes**

- **Netlify:** `public/_redirects` sends unknown paths to `index.html` for SPA routing.
- **GitHub Pages:** configure Pages to use the `dist` output (or Actions). Unknown paths may need your host’s SPA fallback; `public/404.html` is a minimal standalone 404 with `noindex`.
- **Vercel:** the Vite preset usually serves the SPA without extra config.

**Future blog (optional SEO growth):** add a `/blog` route or a separate repo with consistent branding, one `h1` per article, article schema (`BlogPosting`), and internal links back to this portfolio.

## License

This project is for personal portfolio use.
