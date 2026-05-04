import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ParticleNetwork from './ParticleNetwork'

const MotionButton = motion.button
const MotionSpan = motion.span

function AdminChrome({ theme, setTheme, children }) {
  const isDark = theme === 'dark'

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ParticleNetwork isDark={isDark} />
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="grid-bg h-full w-full" />
      </div>
      <div className="relative z-10">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-lightBg/75 backdrop-blur-xl dark:border-white/10 dark:bg-darkBg/70">
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <Link
              to="/"
              className="flex select-none items-center gap-2 rounded-lg border border-black/10 bg-white/50 px-2.5 py-1 font-mono text-[11px] text-zinc-700 shadow-sm transition hover:border-indigo-300/50 dark:border-white/10 dark:bg-black/20 dark:text-zinc-200 dark:hover:border-indigo-500/30"
            >
              <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_0_3px_rgba(79,70,229,0.12)] dark:bg-indigo-300 dark:shadow-[0_0_0_3px_rgba(129,140,248,0.12)]" />
              <span>Pitambar Pandey</span>
            </Link>
            <span className="hidden font-mono text-xs text-zinc-500 dark:text-zinc-400 sm:inline">admin panel</span>
            <MotionButton
              type="button"
              whileTap={{ scale: 0.94, rotate: 8 }}
              className="flex items-center gap-2 rounded-full border border-black/15 bg-white/70 px-3 py-1.5 font-mono text-xs text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow dark:border-white/15 dark:bg-black/20 dark:text-zinc-100"
              onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              <MotionSpan
                animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 1.08 : 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-[12px] text-white dark:from-indigo-400 dark:to-purple-400"
              >
                {isDark ? '🌙' : '☀️'}
              </MotionSpan>
              <span className="hidden sm:inline">{theme.toUpperCase()}</span>
            </MotionButton>
          </nav>
        </header>
        {children}
      </div>
    </div>
  )
}

export default AdminChrome
