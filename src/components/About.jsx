import { motion } from 'framer-motion'
import { useState } from 'react'

function About() {
  const [photoMissing, setPhotoMissing] = useState(false)

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
      <div className="grid gap-6 md:grid-cols-[1fr_240px]">
        <div className="rounded-xl border border-black/10 bg-lightCard p-6 dark:border-white/10 dark:bg-darkCard">
          <p className="leading-8 text-zinc-700 dark:text-zinc-300">
            I&apos;m Pitambar Pandey, a Software Engineering student at the University of Wisconsin–Green Bay (UWGB). I
            build full-stack and academic software with a focus on clean design, solid fundamentals, and shipping
            projects end to end.
          </p>
          <p className="mt-5 leading-8 text-zinc-700 dark:text-zinc-300">
            My toolkit spans Java, Python, JavaScript, HTML, CSS, C, Git, and databases — from React and Node-style
            web work to Java and Python apps. I&apos;ve shipped personal and school projects (including a responsive site
            for my high school) and I&apos;m looking for internships where I can grow as a Java, Python, or full-stack
            developer.
          </p>
          <p className="mt-5 font-mono font-semibold text-indigo-700 dark:text-indigo-300">
            🚀 Always learning. Always building.
          </p>
        </div>

        <div className="rounded-xl border border-black/10 bg-lightCard p-5 dark:border-white/10 dark:bg-darkCard">
          <p className="mb-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">profile.jpg</p>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-indigo-300/70 bg-gradient-to-br from-indigo-100 to-white dark:border-indigo-400/30 dark:from-indigo-900/30 dark:to-zinc-900">
            <img
              src="/profile.jpg"
              alt="Pitambar Pandey, Software Engineering student at UW–Green Bay, portrait photo"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              onError={() => setPhotoMissing(true)}
            />
            {photoMissing && (
              <div className="absolute inset-0 grid place-items-center px-5 text-center font-mono text-xs text-zinc-500 dark:text-zinc-300">
                Add your photo at <span className="ml-1 text-indigo-600 dark:text-indigo-300">/public/profile.jpg</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default About
