import { motion } from 'framer-motion'

function Skills() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ skills.json ]</p>
      <h2 className="mb-5 text-3xl font-bold md:text-4xl">Tech Stack Snapshot</h2>
      <motion.pre
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="overflow-x-auto rounded-xl border border-black/10 bg-lightCard p-6 font-mono text-sm leading-7 dark:border-white/10 dark:bg-darkCard"
      >
        <code>
          <span className="text-zinc-500">{'{'}</span>{'\n'}
          {'  '}<span className="text-indigo-600 dark:text-indigo-300">"languages"</span>: [<span className="text-emerald-600">"Java"</span>,{' '}
          <span className="text-emerald-600">"Python"</span>, <span className="text-emerald-600">"JavaScript"</span>,{' '}
          <span className="text-emerald-600">"C"</span>, <span className="text-emerald-600">"SQL"</span>,{' '}
          <span className="text-emerald-600">"HTML"</span>, <span className="text-emerald-600">"CSS"</span>],{'\n'}
          {'  '}<span className="text-indigo-600 dark:text-indigo-300">"frameworks"</span>: [<span className="text-emerald-600">"React.js"</span>,{' '}
          <span className="text-emerald-600">"Node.js"</span>, <span className="text-emerald-600">"JavaFX"</span>,{' '}
          <span className="text-emerald-600">"Tkinter"</span>, <span className="text-emerald-600">"Azure OpenAI"</span>],{'\n'}
          {'  '}<span className="text-indigo-600 dark:text-indigo-300">"devTools"</span>: [<span className="text-emerald-600">"Git"</span>,{' '}
          <span className="text-emerald-600">"GitHub"</span>, <span className="text-emerald-600">"Maven"</span>,{' '}
          <span className="text-emerald-600">"MySQL"</span>, <span className="text-emerald-600">"REST APIs"</span>],{'\n'}
          {'  '}<span className="text-indigo-600 dark:text-indigo-300">"concepts"</span>: [<span className="text-emerald-600">"OOP"</span>,{' '}
          <span className="text-emerald-600">"Database Design"</span>, <span className="text-emerald-600">"Agile"</span>,{' '}
          <span className="text-emerald-600">"OS"</span>, <span className="text-emerald-600">"Compilers"</span>]{'\n'}
          <span className="text-zinc-500">{'}'}</span>
        </code>
      </motion.pre>
    </motion.section>
  )
}

export default Skills
