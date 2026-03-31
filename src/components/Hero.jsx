import { motion } from 'framer-motion'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { HiArrowDown } from 'react-icons/hi'

function Hero() {
  const jsLines = [
    <>
      <span className="text-violet-400">const</span> <span className="text-sky-300">developer</span>{' '}
      <span className="text-zinc-300">=</span> <span className="text-zinc-500">{'{'}</span>
    </>,
    <>
      {'  '}
      <span className="text-emerald-300">"name"</span>: <span className="text-emerald-400">"Pitambar Pandey"</span>,
    </>,
    <>
      {'  '}
      <span className="text-emerald-300">"role"</span>: [
      <span className="text-emerald-400">"SWE Student"</span>, <span className="text-emerald-400">"AI Enthusiast"</span>,{' '}
      <span className="text-emerald-400">"Builder"</span>
      <span className="text-zinc-500">]</span>,
    </>,
    <>
      {'  '}
      <span className="text-emerald-300">"university"</span>: <span className="text-emerald-400">"UW-Green Bay"</span>,
    </>,
    <>
      {'  '}
      <span className="text-emerald-300">"gpa"</span>: <span className="text-orange-300">4.0</span>,
    </>,
    <>
      {'  '}
      <span className="text-emerald-300">"status"</span>: <span className="text-emerald-400">"open_to_opportunities"</span>
    </>,
    <>
      <span className="text-zinc-500">{'}'}</span>;
    </>,
  ]

  return (
    <section id="start" className="relative min-h-[calc(100svh-6rem)] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="grid-bg h-full w-full" />
      </div>
      <div className="relative z-10 flex min-h-[calc(100svh-6rem)] flex-col items-center justify-center gap-6 px-4 py-6 sm:gap-7 sm:px-6 sm:py-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 font-mono text-[11px] text-zinc-700 shadow-sm dark:border-white/10 dark:bg-black/20 dark:text-zinc-200">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Welcome to my page
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl rounded-2xl border border-black/15 bg-lightCard/80 shadow-xl backdrop-blur dark:border-white/10 dark:bg-darkCard/90 lg:max-w-4xl"
        >
          <div className="flex items-center gap-2 border-b border-black/10 px-5 py-3 dark:border-white/10">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="px-4 py-6">
            <div className="grid gap-5 font-mono text-xs md:text-sm">
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                  JavaScript
                </p>

                {/* Smooth "typing" reveal from top */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'top' }}
                  className="overflow-hidden will-change-transform"
                >
                  <pre className="overflow-x-auto whitespace-pre text-zinc-100">
                    <code>
                      {jsLines.map((line, idx) => (
                        <span key={idx}>
                          {line}
                          {idx < jsLines.length - 1 ? '\n' : ''}
                        </span>
                      ))}
                      <span className="ml-0.5 animate-blink text-indigo-300">|</span>
                    </code>
                  </pre>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex w-full max-w-3xl flex-col items-center gap-3 sm:gap-4 lg:max-w-4xl"
        >
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
            <a
              href="#projects"
              className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center font-semibold text-white transition hover:bg-indigo-500 sm:w-auto"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="w-full rounded-lg border border-indigo-500 px-5 py-2.5 text-center font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-950/40 sm:w-auto"
            >
              Get In Touch
            </a>
          </div>

          <div className="flex items-center justify-center gap-3 pt-0.5">
            <a
              className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/55 text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow dark:border-white/10 dark:bg-black/20 dark:text-zinc-200 dark:hover:border-indigo-500/30"
              href="https://github.com/Pitambar004"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="text-[15px]" />
            </a>
            <a
              className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/55 text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow dark:border-white/10 dark:bg-black/20 dark:text-zinc-200 dark:hover:border-indigo-500/30"
              href="https://www.linkedin.com/in/pitambar-pandey-50265a2ba/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-[15px]" />
            </a>
            <a
              className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/55 text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow dark:border-white/10 dark:bg-black/20 dark:text-zinc-200 dark:hover:border-indigo-500/30"
              href="https://www.instagram.com/pri_nce.pandey/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-[15px]" />
            </a>
            <a
              className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/55 text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow dark:border-white/10 dark:bg-black/20 dark:text-zinc-200 dark:hover:border-indigo-500/30"
              href="https://www.facebook.com/pitambar.pandey.818841"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="text-[15px]" />
            </a>
          </div>

          <a
            href="#about"
            aria-label="Scroll down"
            className="mt-1.5 grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/45 text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow dark:border-white/10 dark:bg-black/15 dark:text-indigo-200 dark:hover:border-indigo-500/30"
            style={{
              boxShadow:
                '0 0 0 4px rgba(79,70,229,0.10), 0 10px 30px rgba(79,70,229,0.15)',
            }}
          >
            <HiArrowDown className="animate-bounce text-lg" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
