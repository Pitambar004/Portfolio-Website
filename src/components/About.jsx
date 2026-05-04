import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSiteContent } from '../context/SiteContentContext'

function About() {
  const { data } = useSiteContent()
  const about = data.about
  const [photoMissing, setPhotoMissing] = useState(false)

  const heading = about?.heading ?? 'Built by an Engineer, Driven by Impact.'
  const paragraphs = Array.isArray(about?.paragraphs) ? about.paragraphs : []
  const tagline = about?.tagline ?? '🚀 Always learning. Always building.'
  const imageSrc = about?.imageSrc || '/profile.jpg'
  const imageAlt =
    about?.imageAlt ||
    'Pitambar Pandey, Software Engineering student at UW–Green Bay, portrait photo'
  const imageCaption = about?.imageCaption ?? 'profile.jpg'

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ about.md ]</p>
      <h2 className="mb-5 text-3xl font-bold md:text-4xl">{heading}</h2>
      <div className="grid gap-6 md:grid-cols-[1fr_240px]">
        <div className="rounded-xl border border-black/10 bg-lightCard p-6 dark:border-white/10 dark:bg-darkCard">
          {paragraphs.map((text, i) => (
            <p
              key={`about-p-${i}`}
              className={i > 0 ? 'mt-5 leading-8 text-zinc-700 dark:text-zinc-300' : 'leading-8 text-zinc-700 dark:text-zinc-300'}
            >
              {text}
            </p>
          ))}
          {tagline.trim() !== '' && (
            <p className="mt-5 font-mono font-semibold text-indigo-700 dark:text-indigo-300">{tagline}</p>
          )}
        </div>

        <div className="rounded-xl border border-black/10 bg-lightCard p-5 dark:border-white/10 dark:bg-darkCard">
          <p className="mb-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">{imageCaption}</p>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-indigo-300/70 bg-gradient-to-br from-indigo-100 to-white dark:border-indigo-400/30 dark:from-indigo-900/30 dark:to-zinc-900">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              onError={() => setPhotoMissing(true)}
            />
            {photoMissing && (
              <div className="absolute inset-0 grid place-items-center px-5 text-center font-mono text-xs text-zinc-500 dark:text-zinc-300">
                Image failed to load. Check the URL in admin (default:{' '}
                <span className="ml-1 text-indigo-600 dark:text-indigo-300">/public/profile.jpg</span>).
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default About
