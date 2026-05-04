import { motion } from 'framer-motion'
import { useSiteContent } from '../context/SiteContentContext'
import { COURSEWORK_STATUS } from '../lib/siteDataSchema'

function CourseSubsection({ title, courses }) {
  return (
    <div className="rounded-xl border border-black/10 bg-lightCard p-5 font-mono text-sm dark:border-white/10 dark:bg-darkCard">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">{title}</h3>
        <span className="shrink-0 text-xs text-zinc-500">{courses.length} courses</span>
      </div>
      <div className="space-y-1 text-zinc-600 dark:text-zinc-300">
        {courses.map((course) => (
          <div key={course.id} className="flex items-center justify-between gap-3">
            <p className="min-w-0 flex-1">{course.name}</p>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                course.status === COURSEWORK_STATUS.taken
                  ? 'border border-emerald-300/50 bg-emerald-100 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'border border-amber-300/60 bg-amber-100 text-amber-700 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-300'
              }`}
            >
              {course.status === COURSEWORK_STATUS.taken ? '✓ Taken' : 'In progress'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Coursework() {
  const { data } = useSiteContent()
  const cw = data.coursework
  const eng = cw?.engineeringSupporting
  const other = cw?.otherCourses

  return (
    <motion.section
      id="coursework"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ coursework ]</p>
      <h2 className="mb-6 text-3xl font-bold md:text-4xl">{cw?.pageHeading || 'Major Coursework'}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CourseSubsection title={eng?.title || ''} courses={eng?.courses || []} />
        <CourseSubsection title={other?.title || ''} courses={other?.courses || []} />
      </div>
    </motion.section>
  )
}

export default Coursework
