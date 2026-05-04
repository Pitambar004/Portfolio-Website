import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ParticleNetwork from '../components/ParticleNetwork'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Schooling from '../components/Schooling'
import Coursework from '../components/Coursework'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function MainLayout({ theme, setTheme }) {
  return (
    <>
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
    </>
  )
}

export default MainLayout
