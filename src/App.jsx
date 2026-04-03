import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ParticleNetwork from './components/ParticleNetwork'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Schooling from './components/Schooling'
import Coursework from './components/Coursework'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="relative min-h-screen bg-lightBg text-lightText transition-colors duration-300 dark:bg-darkBg dark:text-darkText">
      <a
        href="#main-content"
        className="fixed left-[-10000px] top-4 z-[100] rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg focus:left-4 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/50"
      >
        Skip to main content
      </a>
      <ParticleNetwork isDark={theme === 'dark'} />
      <div className="relative z-10">
        <Navbar theme={theme} setTheme={setTheme} />
        <main id="main-content" className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Schooling />
          <Coursework />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
