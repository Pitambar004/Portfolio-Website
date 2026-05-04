import { motion } from 'framer-motion'
import { FaFolder, FaGithub } from 'react-icons/fa'
import { useSiteContent } from '../context/SiteContentContext'

function Projects() {
  const { data } = useSiteContent()
  const projects = data.projects || []
  const showMoreComing = data.projectsShowMoreComing !== false

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ projects.jsx ]</p>
      <h2 className="mb-6 text-3xl font-bold md:text-4xl">Shipped Projects</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4 }}
            className="group rounded-xl border border-black/10 bg-lightCard p-5 transition hover:-translate-y-1 hover:border-l-4 hover:border-l-indigo-600 dark:border-white/10 dark:bg-darkCard"
          >
            <div className="mb-3 flex items-center gap-2">
              <FaFolder className="text-indigo-500" />
              <h3 className="font-semibold">{project.name}</h3>
            </div>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">{project.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className={`h-2.5 w-2.5 rounded-full ${project.languageColor || 'bg-zinc-500'}`} />
                <span>{project.stack}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <a
                  href={project.github}
                  aria-label={`${project.name} on GitHub`}
                  {...(String(project.github).startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <FaGithub />
                </a>
                <a
                  href={project.live}
                  {...(String(project.live).startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  Live Demo
                </a>
              </div>
            </div>
          </motion.article>
        ))}
        {showMoreComing && (
          <div className="grid place-items-center rounded-xl border-2 border-dashed border-zinc-300 p-5 font-mono text-sm text-zinc-500 dark:border-zinc-700">
            + More Coming Soon
          </div>
        )}
      </div>
    </motion.section>
  )
}

export default Projects
