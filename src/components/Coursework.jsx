import { motion } from 'framer-motion'

function Coursework() {
  const csCourses = [
    { name: 'COMP SCI 140 - Programming Problem Solving (comp_sci_140.java)', status: 'progress' },
    { name: 'COMP SCI 181 - Human-Centered Design (comp_sci_181.md)', status: 'progress' },
    { name: 'COMP SCI 240 - Discrete Mathematics (comp_sci_240.md)', status: 'taken' },
    { name: 'COMP SCI 231 - Introduction to Operations (comp_sci_231.md)', status: 'taken' },
    { name: 'COMP SCI 256 - Intro to Software Design (comp_sci_256.md)', status: 'taken' },
    { name: 'COMP SCI 330 - Computer Programming II (comp_sci_330.java)', status: 'taken' },
    { name: 'COMP SCI 207 - Programming in C (comp_sci_207.c)', status: 'taken' },
    { name: 'MATH 203 - Calculus-Analyt Geom I (math_203.md)', status: 'taken' },
    { name: 'MATH 260 - Introductory Statistics (math_260.md)', status: 'taken' },
    { name: 'MATH 202 - Calculus-Analyt Geom E (math_202.md)', status: 'taken' },
    { name: 'MATH 320 - Linear Algebra and Matrix Theory (math_320.md)', status: 'progress' },
  ]

  const seCourses = [
    { name: 'SE 310 - SE Fundamentals (se_310.md)', status: 'progress' },
    { name: 'ENGR 236 - Technical Writing (engr_236.md)', status: 'progress' },
    { name: 'COMP SCI 256 - Intro to Software Design (comp_sci_256.md)', status: 'taken' },
  ]

  return (
    <motion.section
      id="coursework"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ coursework/tree ]</p>
      <h2 className="mb-6 text-3xl font-bold md:text-4xl">Major Coursework</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-black/10 bg-lightCard p-5 font-mono text-sm dark:border-white/10 dark:bg-darkCard">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">Computer Science</h3>
            <span className="text-xs text-zinc-500">{csCourses.length} courses</span>
          </div>
          <div className="space-y-1 text-zinc-600 dark:text-zinc-300">
            {csCourses.map((course) => (
              <div key={course.name} className="flex items-center justify-between gap-3">
                <p>{course.name}</p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    course.status === 'taken'
                      ? 'border border-emerald-300/50 bg-emerald-100 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'border border-amber-300/60 bg-amber-100 text-amber-700 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-300'
                  }`}
                >
                  {course.status === 'taken' ? '✓ Taken' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-black/10 bg-lightCard p-5 font-mono text-sm dark:border-white/10 dark:bg-darkCard">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">Software Engineering</h3>
            <span className="text-xs text-zinc-500">{seCourses.length} courses</span>
          </div>
          <div className="space-y-1 text-zinc-600 dark:text-zinc-300">
            {seCourses.map((course) => (
              <div key={course.name} className="flex items-center justify-between gap-3">
                <p>{course.name}</p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    course.status === 'taken'
                      ? 'border border-emerald-300/50 bg-emerald-100 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'border border-amber-300/60 bg-amber-100 text-amber-700 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-300'
                  }`}
                >
                  {course.status === 'taken' ? '✓ Taken' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Coursework
