import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function Counter({ target, suffix = '', start }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let frame
    let startTime
    const duration = 1200
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, start])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

function Awards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.section
      ref={ref}
      id="awards"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ stats ]</p>
      <h2 className="mb-6 text-3xl font-bold md:text-4xl">Academic & Industry Highlights</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-black/10 bg-lightCard p-6 dark:border-white/10 dark:bg-darkCard">
          <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-300">
            <Counter target={4} suffix=".0" start={isInView} />
          </p>
          <p className="mt-2 text-sm text-zinc-500">GPA</p>
        </div>
        <div className="rounded-xl border border-black/10 bg-lightCard p-6 dark:border-white/10 dark:bg-darkCard">
          <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-300">Dean&apos;s List</p>
          <p className="mt-2 text-sm text-zinc-500">Academic Excellence</p>
        </div>
        <div className="rounded-xl border border-black/10 bg-lightCard p-6 dark:border-white/10 dark:bg-darkCard">
          <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-300">
            <Counter target={2} start={isInView} />
          </p>
          <p className="mt-2 text-sm text-zinc-500">Years of Industry Experience</p>
        </div>
      </div>
    </motion.section>
  )
}

export default Awards
