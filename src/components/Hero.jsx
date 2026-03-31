import { motion } from 'framer-motion'

function Hero() {
  return (
    <section id="start" className="relative min-h-screen w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="grid-bg h-full w-full" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl rounded-2xl border border-black/15 bg-lightCard/80 shadow-xl backdrop-blur dark:border-white/10 dark:bg-darkCard/90"
        >
          <div className="flex items-center gap-2 border-b border-black/10 px-5 py-3 dark:border-white/10">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="flex px-4 py-6 font-mono text-xs md:text-base">
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
                {'  '}role: [<span className="text-emerald-500">"SWE Student"</span>,{' '}
                <span className="text-emerald-500">"AI Enthusiast"</span>,{' '}
                <span className="text-emerald-500">"Builder"</span>],{'\n'}
                {'  '}university: <span className="text-emerald-500">"UW-Green Bay"</span>,{'\n'}
                {'  '}gpa: <span className="text-orange-500">4.0</span>,{'\n'}
                {'  '}status: <span className="text-emerald-500">"open_to_opportunities"</span>{'\n'}
                {'}'};<span className="animate-blink">|</span>
              </code>
            </pre>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-20 z-10 flex gap-4"
        >
          <a
            href="#projects"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-500"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            className="rounded-lg border border-indigo-500 px-5 py-2.5 font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-950/40"
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
