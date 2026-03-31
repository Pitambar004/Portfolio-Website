import { motion } from 'framer-motion'

const entries = [
  {
    company: 'Media and IT Hub Pvt Ltd',
    role: 'Co-Founder / Front-End Dev',
    date: 'a3f91bc · Aug 2023 - Jul 2024',
    bullets: [
      'Led strategy and delivery across web development service lines.',
      'Rebuilt client websites with modern frontend architecture.',
      'Aligned designers and developers for predictable releases.',
    ],
  },
  {
    company: 'Sauryakunja Secondary School',
    role: 'CS & Science Teacher',
    date: 'c72be0f · Sep 2023 - Apr 2024',
    bullets: [
      'Taught CS fundamentals: HTML, CSS, C, and QBasic.',
      'Maintained school IT operations and troubleshooting workflows.',
      'Designed practical labs that improved student engagement.',
    ],
  },
]

function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ git-log ]</p>
      <h2 className="mb-6 text-3xl font-bold md:text-4xl">Experience Timeline</h2>
      <div className="relative ml-2 space-y-8 border-l border-indigo-300/70 pl-8 dark:border-indigo-400/40">
        {entries.map((entry) => (
          <article key={entry.company} className="relative rounded-xl border border-black/10 bg-lightCard p-5 dark:border-white/10 dark:bg-darkCard">
            <span className="absolute -left-[2.15rem] top-7 h-3.5 w-3.5 rounded-full bg-indigo-600 dark:bg-indigo-300" />
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 className="font-mono font-semibold">{entry.company}</h3>
              <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white dark:bg-indigo-300 dark:text-black">
                {entry.role}
              </span>
            </div>
            <p className="mb-3 font-mono text-xs text-zinc-500">{entry.date}</p>
            <ul className="space-y-1 text-sm">
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="text-zinc-700 dark:text-zinc-300">
                  <span className="mr-2 font-mono text-emerald-500">+</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </motion.section>
  )
}

export default Experience
