import { motion } from 'framer-motion'

const uwgbWork = [
  {
    company: 'University of Wisconsin-Green Bay (UWGB)',
    role: 'Research Assistant',
    location: 'Green Bay, WI',
    date: 'Present',
    bullets: [
      'Conduct research on HVAC/AHU air filter degradation for the Brown County STEM Innovation Center.',
      'Assist in collecting and analyzing internal and external environmental data affecting air filter performance.',
      'Identify parameters such as temperature, humidity, airflow, and pressure for degradation analysis.',
      'Collaborate with faculty supervisors and team members to develop data-driven models for filter condition monitoring.',
      'Contribute to improving building maintenance efficiency through engineering research and sensor-based analysis.',
      'Skills: Research & Data Analysis, HVAC Systems Knowledge, Environmental Monitoring, Sensor Data Collection, Technical Documentation, Problem Solving, Team Collaboration.',
    ],
  },
  {
    company: 'University of Wisconsin-Green Bay',
    role: 'Member at Large – Student Union Funding Allocation Committee (SUFAC)',
    location: 'Green Bay, WI',
    date: 'Feb 2026 – Present',
    bullets: [
      'Review and evaluate funding requests from student organizations to support fair and effective allocation of student fees.',
      'Participate in committee discussions and decisions on budget approvals and financial planning.',
      'Represent broader student interests by promoting transparency, accountability, and equity in funding decisions.',
      'Collaborate with committee members and university staff to assess event proposals, budgets, and organizational needs.',
      'Monitor funded activities for policy compliance and proper use of allocated funds.',
      'Contribute to improving funding policies and processes that support student engagement and campus initiatives.',
    ],
  },
  {
    company: 'Google Developer Group on Campus – UWGB',
    role: 'Vice President',
    location: 'Green Bay, WI',
    date: 'Nov 2025 – Present',
    bullets: [
      'Helped establish the official GDG chapter at UW–Green Bay as a space for students to explore modern tech.',
      'Designed the chapter framework and defined leadership roles for sustainable growth.',
      'Led outreach to grow membership and visibility on campus.',
      'Planned workshops and study jams on Android, Firebase, web, AI/ML, and Google Cloud.',
      'Connected with nearby GDG communities and campus orgs; laid groundwork for hackathons and mentorship.',
    ],
  },
  {
    company: 'Chartwells Higher Education Dining Services',
    role: 'Supervisor – Einstein Bros. Bagels',
    location: 'Green Bay, WI',
    date: 'Sep 2024 – Present',
    bullets: [
      'Supervise daily operations and customer service during peak hours.',
      'Manage staff schedules, inventory, and product quality for beverages and food.',
      'Train new hires, coordinate daily tasks, and keep workflows efficient to company standards.',
    ],
  },
]

const entries = [
  {
    company: 'Media and IT Hub Pvt. Ltd.',
    role: 'CEO / Event Coordinator',
    location: 'Kathmandu, Nepal',
    date: 'Aug 2023 – Jul 2024',
    bullets: [
      'Led the company as CEO, driving strategy, growth, and innovation across media and IT services.',
      'Coordinated bridge courses blending media and IT education for students.',
      'Taught Math, Physics, and Chemistry with a focus on foundational skills.',
      'Oversaw program development and execution to deliver strong educational outcomes.',
    ],
  },
  {
    company: 'Sauryakunj Academy',
    role: 'Secondary Science & Computer Teacher',
    location: 'Nepal',
    date: 'Sep 2023 – Apr 2024',
    bullets: [
      'Designed hands-on science experiments to deepen student understanding.',
      'Adapted instruction for diverse learning styles; used simulations and educational apps.',
      'Promoted inquiry-based learning and organized science fairs and field trips.',
    ],
  },
  {
    company: 'Orient College',
    role: 'IT Head',
    location: 'Basundhara, Kathmandu',
    date: 'Jul 2021 – Aug 2023',
    bullets: [
      'Set up computers, projectors, and network gear for college events.',
      'Supported students and faculty with technical issues during programs.',
      'Ran sessions on using technology for real-world problem solving.',
      'Managed tech and registration for gaming events; collaborated with student clubs.',
    ],
  },
]

function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ git-log ]</p>
      <h2 className="mb-2 text-3xl font-bold md:text-4xl">Experience Timeline</h2>
      <p className="mb-8 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
        Leadership, teaching, operations, and community building — newest commits first.
      </p>
      <div className="relative ml-2 space-y-6 border-l border-indigo-300/70 pl-8 dark:border-indigo-400/40 md:space-y-8">
        <article className="relative rounded-xl border border-black/10 bg-lightCard p-5 shadow-sm transition hover:border-indigo-300/50 dark:border-white/10 dark:bg-darkCard dark:hover:border-indigo-500/30">
          <span className="absolute -left-[2.15rem] top-7 h-3.5 w-3.5 rounded-full bg-indigo-600 ring-4 ring-lightBg dark:bg-indigo-300 dark:ring-darkBg" />
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h3 className="font-mono text-base font-semibold md:text-lg">UWGB Work</h3>
            <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white dark:bg-indigo-300 dark:text-black">
              On-campus Experience
            </span>
          </div>
          <div className="space-y-4">
            {uwgbWork.map((entry) => (
              <div
                key={`${entry.company}-${entry.date}`}
                className="rounded-lg border border-black/10 bg-white/40 p-4 dark:border-white/10 dark:bg-black/20"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h4 className="font-mono text-sm font-semibold md:text-base">{entry.company}</h4>
                  <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[11px] text-white dark:bg-indigo-300 dark:text-black">
                    {entry.role}
                  </span>
                </div>
                <p className="mb-1 font-mono text-xs text-zinc-500">{entry.date}</p>
                <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">{entry.location}</p>
                <ul className="space-y-2 text-sm">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="text-zinc-700 dark:text-zinc-300">
                      <span className="mr-2 inline-block align-top font-mono text-emerald-500">+</span>
                      <span className="inline-block max-w-[calc(100%-1.25rem)]">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        {entries.map((entry) => (
          <article
            key={`${entry.company}-${entry.date}`}
            className="relative rounded-xl border border-black/10 bg-lightCard p-5 shadow-sm transition hover:border-indigo-300/50 dark:border-white/10 dark:bg-darkCard dark:hover:border-indigo-500/30"
          >
            <span className="absolute -left-[2.15rem] top-7 h-3.5 w-3.5 rounded-full bg-indigo-600 ring-4 ring-lightBg dark:bg-indigo-300 dark:ring-darkBg" />
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 className="font-mono text-base font-semibold md:text-lg">{entry.company}</h3>
              <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white dark:bg-indigo-300 dark:text-black">
                {entry.role}
              </span>
            </div>
            <p className="mb-1 font-mono text-xs text-zinc-500">{entry.date}</p>
            <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">{entry.location}</p>
            <ul className="space-y-2 text-sm">
              {entry.bullets.map((bullet) => (
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

export default Experience
