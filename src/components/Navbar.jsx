import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const tabs = [
  { id: 'about', label: 'about.jsx' },
  { id: 'skills', label: 'skills.json' },
  { id: 'projects', label: 'projects.jsx' },
  { id: 'contact', label: 'contact.jsx' },
]

function Navbar({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('about')

  useEffect(() => {
    const onHash = () => setActive(window.location.hash.replace('#', '') || 'about')
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-lightBg/80 backdrop-blur dark:border-white/10 dark:bg-darkBg/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="hidden items-center gap-3 md:flex">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className="group relative rounded-t-md px-3 py-2 font-mono text-xs text-zinc-600 dark:text-zinc-300"
            >
              {tab.label}
              <motion.span
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600 transition-transform dark:bg-indigo-300 ${
                  active === tab.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </a>
          ))}
        </div>

        <button
          className="rounded-lg border border-black/20 p-2 md:hidden dark:border-white/20"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        <motion.button
          whileTap={{ scale: 0.94, rotate: 12 }}
          className="ml-auto flex items-center gap-2 rounded-full border border-black/15 bg-white px-3 py-1.5 font-mono text-xs dark:border-white/20 dark:bg-darkCard"
          onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        >
          <motion.span animate={{ rotate: theme === 'dark' ? 180 : 0, scale: theme === 'dark' ? 1.1 : 1 }}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.span>
          {theme.toUpperCase()}
        </motion.button>
      </nav>

      {menuOpen && (
        <div className="border-t border-black/10 bg-lightCard px-6 py-3 md:hidden dark:border-white/10 dark:bg-darkCard">
          {tabs.map((tab) => (
            <a key={tab.id} href={`#${tab.id}`} className="block py-2 font-mono text-sm" onClick={() => setMenuOpen(false)}>
              {tab.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export default Navbar
