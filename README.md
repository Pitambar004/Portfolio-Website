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

## License

This project is for personal portfolio use.
