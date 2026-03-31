import { motion } from 'framer-motion'
import { FaFolder, FaGithub } from 'react-icons/fa'

const projects = [
  {
    name: 'Bill Splitter App',
    description: 'GUI app that splits bills with tax logic and validation for cleaner shared expense tracking.',
    stack: 'Python · Tkinter · OOP',
    languageColor: 'bg-blue-500',
    github: '#',
    live: '#',
  },
  {
    name: 'Task Manager CLI',
    description: 'Command-line task manager with Gson persistence, UUID tasks, and scalable object-oriented design.',
    stack: 'Java · Maven · Gson',
    languageColor: 'bg-orange-500',
    github: '#',
    live: '#',
  },
  {
    name: 'Lost & Found System',
    description: 'Desktop JavaFX app backed by MySQL for reporting, managing, and verifying lost/found items.',
    stack: 'Java 17 · JavaFX · MySQL',
    languageColor: 'bg-indigo-500',
    github: '#',
    live: '#',
  },
]

function Projects() {
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
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {projects.map((project) => (
          <motion.article
            key={project.name}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="group rounded-xl border border-black/10 bg-lightCard p-5 transition hover:-translate-y-1 hover:border-l-4 hover:border-l-indigo-600 dark:border-white/10 dark:bg-darkCard"
          >
            <div className="mb-3 flex items-center gap-2">
              <FaFolder className="text-indigo-500" />
              <h3 className="font-semibold">{project.name}</h3>
            </div>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">{project.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className={`h-2.5 w-2.5 rounded-full ${project.languageColor}`} />
                <span>{project.stack}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <a href={project.github} aria-label="GitHub project link">
                  <FaGithub />
                </a>
                <a href={project.live}>Live Demo</a>
              </div>
            </div>
          </motion.article>
        ))}
        <div className="grid place-items-center rounded-xl border-2 border-dashed border-zinc-300 p-5 font-mono text-sm text-zinc-500 dark:border-zinc-700">
          + More Coming Soon
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Projects
