import { motion } from 'framer-motion'
import { useSiteContent } from '../context/SiteContentContext'
import { SECTION_VARIANTS } from '../lib/experienceSections'

function Experience() {
  const { data } = useSiteContent()
  const sections = data.experience?.sections || []

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ git-log ]</p>
      <h2 className="mb-2 text-3xl font-bold md:text-4xl">Experience Timeline</h2>
      <p className="mb-8 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
        Leadership, teaching, operations, and community building — newest commits first.
      </p>
      <div className="relative ml-2 space-y-6 border-l border-indigo-300/70 pl-8 dark:border-indigo-400/40 md:space-y-8">
        {sections.map((section) =>
          section.variant === SECTION_VARIANTS.timeline ? (
            <div key={section.id} className="space-y-6">
              <div className="-ml-2 border-b border-black/5 pb-2 dark:border-white/10">
                <h3 className="font-mono text-base font-semibold text-zinc-900 dark:text-zinc-50">{section.title}</h3>
                {section.badge ? (
                  <span className="mt-1 inline-block rounded-full bg-indigo-600/15 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-400/20 dark:text-indigo-200">
                    {section.badge}
                  </span>
                ) : null}
              </div>
              {(section.entries || []).map((entry) => (
                <article
                  key={`${section.id}-${entry.company}-${entry.date}-${entry.role}`}
                  className="relative rounded-xl border border-black/10 bg-lightCard p-5 shadow-sm transition hover:border-indigo-300/50 dark:border-white/10 dark:bg-darkCard dark:hover:border-indigo-500/30"
                >
                  <span className="absolute -left-[2.15rem] top-7 h-3.5 w-3.5 rounded-full bg-indigo-600 ring-4 ring-lightBg dark:bg-indigo-300 dark:ring-darkBg" />
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-mono text-base font-semibold md:text-lg">{entry.company}</h3>
                    <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white dark:bg-indigo-300 dark:text-black">
                      {entry.role}
                    </span>
                  </div>
                  <p className="mb-1 font-mono text-xs text-zinc-500">{entry.date}</p>
                  <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">{entry.location}</p>
                  <ul className="space-y-2 text-sm">
                    {(entry.bullets || []).map((bullet, bi) => (
                      <li
                        key={`${entry.company}-${bi}-${bullet.slice(0, 24)}`}
                        className="text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="mr-2 inline-block align-top font-mono text-emerald-500">+</span>
                        <span className="inline-block max-w-[calc(100%-1.25rem)]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <article
              key={section.id}
              className="relative rounded-xl border border-black/10 bg-lightCard p-5 shadow-sm transition hover:border-indigo-300/50 dark:border-white/10 dark:bg-darkCard dark:hover:border-indigo-500/30"
            >
              <span className="absolute -left-[2.15rem] top-7 h-3.5 w-3.5 rounded-full bg-indigo-600 ring-4 ring-lightBg dark:bg-indigo-300 dark:ring-darkBg" />
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <h3 className="font-mono text-base font-semibold md:text-lg">{section.title}</h3>
                {section.badge ? (
                  <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white dark:bg-indigo-300 dark:text-black">
                    {section.badge}
                  </span>
                ) : null}
              </div>
              <div className="space-y-4">
                {(section.entries || []).map((entry) => (
                  <div
                    key={`${section.id}-${entry.company}-${entry.date}-${entry.role}`}
                    className="rounded-lg border border-black/10 bg-white/40 p-4 dark:border-white/10 dark:bg-black/20"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h4 className="font-mono text-sm font-semibold md:text-base">{entry.company}</h4>
                      <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[11px] text-white dark:bg-indigo-300 dark:text-black">
                        {entry.role}
                      </span>
                    </div>
                    <p className="mb-1 font-mono text-xs text-zinc-500">{entry.date}</p>
                    <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">{entry.location}</p>
                    <ul className="space-y-2 text-sm">
                      {(entry.bullets || []).map((bullet, bi) => (
                        <li
                          key={`${entry.company}-${bi}-${bullet.slice(0, 24)}`}
                          className="text-zinc-700 dark:text-zinc-300"
                        >
                          <span className="mr-2 inline-block align-top font-mono text-emerald-500">+</span>
                          <span className="inline-block max-w-[calc(100%-1.25rem)]">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ),
        )}
      </div>
    </motion.section>
  )
}

export default Experience
