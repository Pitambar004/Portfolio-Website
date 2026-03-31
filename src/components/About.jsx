import { motion } from 'framer-motion'

function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ about.md ]</p>
      <h2 className="mb-5 text-3xl font-bold md:text-4xl">Built by an Engineer, Driven by Impact.</h2>
      <div className="rounded-xl border border-black/10 bg-lightCard p-6 dark:border-white/10 dark:bg-darkCard">
        <p className="leading-8 text-zinc-700 dark:text-zinc-300">
          I am a Computer Science and Software Engineering student at UW-Green Bay with a 4.0 GPA, focused on
          designing practical software systems. I combine startup execution from co-founding Media and IT Hub with
          strong foundations in AI, backend architecture, and product-focused frontend engineering.
        </p>
      </div>
    </motion.section>
  )
}

export default About
