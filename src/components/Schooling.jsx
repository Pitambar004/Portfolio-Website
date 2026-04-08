import { motion } from 'framer-motion'

const schooling = [
  {
    school: 'University of Wisconsin–Green Bay',
    program: 'Bachelor of Engineering (Software Engineering) + Bachelors in CS-AI',
    date: '2024 – Present',
    location: 'Green Bay, WI',
    semester: '3rd Semester',
    highlights: ['4.0 GPA', "Dean's List"],
    bullets: [
      'Software Engineering + CS/AI track with a focus on building practical, production-minded systems.',
      'Coursework and project work spanning programming, data structures, and software development fundamentals.',
      'Current academic standing: Sophomore.',
    ],
  },
  {
    school: 'Orient College Basundhara',
    program: 'High School Diploma — Science with Computer Science',
    date: '2021 – 2023',
    location: 'Kathmandu, Nepal',
    highlights: ['3.79 GPA'],
    bullets: [
      'Science + Computer Science foundation with early exposure to programming and problem solving.',
      'Built confidence in technical communication through projects and presentations.',
    ],
  },
  {
    school: 'Panas Deep School Lamki Kailai',
    program: 'Middle School Diploma',
    date: 'Completed',
    location: 'Nepal',
    highlights: ['3.7 GPA'],
    bullets: ['Built academic fundamentals and curiosity for computing and engineering.'],
  },
]

function Schooling() {
  return (
    <motion.section
      id="schooling"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ schooling.log ]</p>
      <h2 className="mb-2 text-3xl font-bold md:text-4xl">Schooling</h2>
      <p className="mb-8 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
        Academic timeline — structured like commits for fast scanning.
      </p>

      <div className="relative ml-2 space-y-6 border-l border-indigo-300/70 pl-8 dark:border-indigo-400/40 md:space-y-8">
        {schooling.map((item) => (
          <article
            key={`${item.school}-${item.date}`}
            className="relative rounded-xl border border-black/10 bg-lightCard p-5 shadow-sm transition hover:border-indigo-300/50 dark:border-white/10 dark:bg-darkCard dark:hover:border-indigo-500/30"
          >
            <span className="absolute -left-[2.15rem] top-7 h-3.5 w-3.5 rounded-full bg-indigo-600 ring-4 ring-lightBg dark:bg-indigo-300 dark:ring-darkBg" />

            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 className="font-mono text-base font-semibold md:text-lg">{item.school}</h3>
              <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white dark:bg-indigo-300 dark:text-black">
                {item.program}
              </span>
            </div>

            <p className="mb-1 font-mono text-xs text-zinc-500">{item.date}</p>
            <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">{item.location}</p>
            {item.semester && (
              <p className="mb-3 text-xs font-medium text-indigo-700 dark:text-indigo-300">Semester: {item.semester}</p>
            )}
            {item.highlights && (
              <div className="mb-3 flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-indigo-300/60 bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:border-indigo-400/40 dark:bg-indigo-900/20 dark:text-indigo-300"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}

            <ul className="space-y-2 text-sm">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="text-zinc-700 dark:text-zinc-300">
                  <span className="mr-2 inline-block align-top font-mono text-emerald-500">+</span>
                  <span className="inline-block max-w-[calc(100%-1.25rem)]">{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </motion.section>
  )
}

export default Schooling

