import { motion } from 'framer-motion'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { HiArrowDown } from 'react-icons/hi'

function Hero() {
  return (
    <section id="start" className="relative min-h-[calc(100svh-6rem)] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="grid-bg h-full w-full" />
      </div>
      <div className="relative z-10 flex min-h-[calc(100svh-6rem)] flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 font-mono text-[11px] text-zinc-700 shadow-sm dark:border-white/10 dark:bg-black/20 dark:text-zinc-200">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Welcome to my page
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
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
            <div className="flex font-mono text-xs md:text-base">
              <div className="mr-4 select-none pr-4 text-right text-zinc-400">
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <p key={n}>{n}</p>
                ))}
              </div>
              <pre className="overflow-x-auto">
                <code>
                  <span className="text-violet-500">const</span> developer <span className="text-zinc-500">=</span>{' '}
                  <span>{'{'}</span>{'\n'}
                  {'  '}name: <span className="text-emerald-500">"Pitambar Pandey"</span>,{'\n'}
                  {'  '}role: [{'\n'}
                  {'    '}<span className="text-emerald-500">"SWE Student"</span>,{'\n'}
                  {'    '}<span className="text-emerald-500">"AI Enthusiast"</span>,{'\n'}
                  {'    '}<span className="text-emerald-500">"Builder"</span>,{'\n'}
                  {'  '}],{'\n'}
                  {'  '}university: <span className="text-emerald-500">"UW-Green Bay"</span>,{'\n'}
                  {'  '}gpa: <span className="text-orange-500">4.0</span>,{'\n'}
                  {'  '}status: <span className="text-emerald-500">"open_to_opportunities"</span>{'\n'}
                  {'}'};<span className="animate-blink">|</span>
                </code>
              </pre>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-7 flex w-full max-w-3xl flex-col items-center gap-3 sm:gap-4 lg:max-w-4xl"
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
