import { motion } from 'framer-motion'
import {
  SiCss,
  SiGit,
  SiGithub,
  SiC,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSqlite,
  SiOpenai,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { FaCloud } from 'react-icons/fa'

const skillIcons = [
  { name: 'Java', Icon: FaJava, color: '#EA2845' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'C', Icon: SiC, color: '#A8B9CC' },
  { name: 'SQL', Icon: SiSqlite, color: '#4479A1' },
  { name: 'HTML', Icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', Icon: SiCss, color: '#1572B6' },
  { name: 'React.js', Icon: SiReact, color: '#61DAFB' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#3C873A' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'GitHub', Icon: SiGithub, color: '#181717' },
  { name: 'MySQL', Icon: SiMysql, color: '#00758F' },
  { name: 'Azure OpenAI', Icon: FaCloud, overlayIcon: SiOpenai, color: '#0078D4', overlayColor: '#E5E7EB' },
]

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
      <h2 className="mb-2 text-3xl font-bold md:text-4xl">Tech Stack Snapshot</h2>
      <p className="mb-5 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
        Core skills for building software as a UWGB student developer — Java, Python, JavaScript, React, and full-stack
        delivery.
      </p>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {skillIcons.map(({ name, Icon, overlayIcon: OverlayIcon, color, overlayColor }) => (
          <div
            key={name}
            className="flex items-center gap-2 rounded-lg border border-black/10 bg-lightCard px-3 py-2 text-sm dark:border-white/10 dark:bg-darkCard"
          >
            <span className="relative inline-flex h-5 w-5 items-center justify-center">
              {OverlayIcon ? (
                <>
                  <Icon style={{ color }} className="absolute inset-0 text-base" />
                  <OverlayIcon
                    style={{ color: overlayColor }}
                    className="absolute inset-0 translate-y-[1px] text-[14px]"
                  />
                </>
              ) : (
                <Icon style={{ color }} className="text-base" />
              )}
            </span>
            <span>{name}</span>
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default Skills
