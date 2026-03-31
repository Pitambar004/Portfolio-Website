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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-lightBg/75 backdrop-blur-xl dark:border-white/10 dark:bg-darkBg/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#start"
          className="hidden select-none items-center gap-2 rounded-lg border border-black/10 bg-white/50 px-2.5 py-1 font-mono text-[11px] text-zinc-700 shadow-sm dark:border-white/10 dark:bg-black/20 dark:text-zinc-200 md:flex"
        >
          <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_0_3px_rgba(79,70,229,0.12)] dark:bg-indigo-300 dark:shadow-[0_0_0_3px_rgba(129,140,248,0.12)]" />
          <span>portfolio</span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className={`group relative rounded-xl px-3 py-2 font-mono text-xs transition ${
                active === tab.id
                  ? 'border border-black/10 bg-white/70 text-zinc-900 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-100'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100'
              }`}
            >
              {tab.label}
              <motion.span
                className={`absolute inset-x-2 -bottom-[2px] h-0.5 origin-left bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 transition-transform dark:from-indigo-300 dark:via-violet-300 dark:to-purple-300 ${
                  active === tab.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </a>
          ))}
        </div>

        <button
          className="rounded-xl border border-black/20 bg-white/60 p-2 shadow-sm md:hidden dark:border-white/20 dark:bg-black/20"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        <motion.button
          whileTap={{ scale: 0.94, rotate: 8 }}
          className="ml-auto flex items-center gap-2 rounded-full border border-black/15 bg-white/70 px-3 py-1.5 font-mono text-xs text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow dark:border-white/15 dark:bg-black/20 dark:text-zinc-100"
          onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        >
          <motion.span
            animate={{ rotate: theme === 'dark' ? 180 : 0, scale: theme === 'dark' ? 1.08 : 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-[12px] text-white dark:from-indigo-400 dark:to-purple-400"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.span>
          <span className="hidden sm:inline">{theme.toUpperCase()}</span>
        </motion.button>
      </nav>

      {menuOpen && (
        <div className="border-t border-black/10 bg-lightCard px-4 py-3 sm:px-6 md:hidden dark:border-white/10 dark:bg-darkCard">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className="block rounded-lg px-2 py-2 font-mono text-sm text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/5"
              onClick={() => setMenuOpen(false)}
            >
              {tab.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export default Navbar
