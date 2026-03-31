import { motion } from 'framer-motion'
import { useState } from 'react'

function Coursework() {
  const [open, setOpen] = useState({ cs: true, se: true })

  return (
    <motion.section
      id="coursework"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ coursework/tree ]</p>
      <h2 className="mb-6 text-3xl font-bold md:text-4xl">Coursework File Tree</h2>
      <div className="rounded-xl border border-black/10 bg-lightCard p-5 font-mono text-sm dark:border-white/10 dark:bg-darkCard">
        <button className="mb-2 block" onClick={() => setOpen((p) => ({ ...p, cs: !p.cs }))}>
          📁 Computer Science/
        </button>
        {open.cs && (
          <div className="mb-4 ml-6 space-y-1 text-zinc-600 dark:text-zinc-300">
            <p>data_structures.java</p>
            <p>algorithms.py</p>
            <p>operating_systems.c</p>
            <p>compilers_notes.md</p>
          </div>
        )}
        <button className="mb-2 block" onClick={() => setOpen((p) => ({ ...p, se: !p.se }))}>
          📁 Software Engineering/
        </button>
        {open.se && (
          <div className="ml-6 space-y-1 text-zinc-600 dark:text-zinc-300">
            <p>software_design_patterns.ts</p>
            <p>database_engineering.sql</p>
            <p>agile_workflows.md</p>
            <p>api_engineering.js</p>
          </div>
        )}
      </div>
    </motion.section>
  )
}

export default Coursework
