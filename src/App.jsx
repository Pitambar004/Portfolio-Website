import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ParticleNetwork from './components/ParticleNetwork'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Coursework from './components/Coursework'
import Awards from './components/Awards'
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
      <ParticleNetwork isDark={theme === 'dark'} />
      <div className="relative z-10">
        <Navbar theme={theme} setTheme={setTheme} />
        <main className="mx-auto max-w-6xl px-6 pt-24">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Coursework />
          <Awards />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
