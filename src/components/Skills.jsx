import { motion } from 'framer-motion'
import { useSiteContent } from '../context/SiteContentContext'
import { SKILL_ICON_REGISTRY } from '../lib/skillIconRegistry'
import { SiJavascript } from 'react-icons/si'

function Skills() {
  const { data } = useSiteContent()
  const skills = data.skills
  const categoryOrder = ['languages', 'frameworks', 'devTools', 'concepts']

  const categoryLabels = {
    languages: 'languages',
    frameworks: 'frameworks',
    devTools: 'devTools',
    concepts: 'concepts',
  }

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ skills.json ]</p>
      <h2 className="mb-2 text-3xl font-bold md:text-4xl">Tech Stack Snapshot</h2>
      <p className="mb-5 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{skills.intro}</p>
      <motion.pre
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="overflow-x-auto rounded-xl border border-black/10 bg-lightCard p-6 font-mono text-sm leading-7 dark:border-white/10 dark:bg-darkCard"
      >
        <code>
          <span className="text-zinc-500">{'{'}</span>
          {'\n'}
          {categoryOrder.map((key, idx) => {
            const items = skills.categories[key] || []
            const label = categoryLabels[key]
            const isLast = idx === categoryOrder.length - 1
            return (
              <span key={key}>
                {'  '}
                <span className="text-indigo-600 dark:text-indigo-300">&quot;{label}&quot;</span>: [
                {items.map((item, i) => (
                  <span key={`${key}-${item}-${i}`}>
                    <span className="text-emerald-600">&quot;{item}&quot;</span>
                    {i < items.length - 1 ? ', ' : ''}
                  </span>
                ))}
                ]{isLast ? '' : ','}
                {'\n'}
              </span>
            )
          })}
          <span className="text-zinc-500">{'}'}</span>
        </code>
      </motion.pre>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {(skills.icons || []).map(({ id, name }) => {
          const cfg = SKILL_ICON_REGISTRY[id]
          const Icon = cfg?.Icon ?? SiJavascript
          const OverlayIcon = cfg?.overlayIcon
          const color = cfg?.color ?? '#71717a'
          const overlayColor = cfg?.overlayColor
          return (
            <div
              key={`${id}-${name}`}
              className="flex items-center gap-2 rounded-lg border border-black/10 bg-lightCard px-3 py-2 text-sm dark:border-white/10 dark:bg-darkCard"
            >
              <span className="relative inline-flex h-5 w-5 items-center justify-center">
                {OverlayIcon ? (
                  <>
                    <Icon style={{ color }} className="absolute inset-0 text-base" />
                    <OverlayIcon
                      style={{ color: overlayColor }}
                      className="absolute inset-0 translate-y-[1px] text-[14px]"
                    />
                  </>
                ) : (
                  <Icon style={{ color }} className="text-base" />
                )}
              </span>
              <span>{name}</span>
            </div>
          )
        })}
      </motion.div>
    </motion.section>
  )
}

export default Skills
