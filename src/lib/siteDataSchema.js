import { getSkillIconIds } from './skillIconRegistry'
import { migrateExperienceToSections } from './experienceSections'

export const SITE_DATA_STORAGE_KEY = 'portfolio_site_data_v1'

/** Course completion state for Major Coursework. */
export const COURSEWORK_STATUS = {
  taken: 'taken',
  progress: 'progress',
}

function defaultEngineeringSupportingCourses() {
  return [
    { name: 'SE 310 - SE Fundamentals', status: COURSEWORK_STATUS.taken },
    { name: 'ENGR 236 - Technical Writing', status: COURSEWORK_STATUS.taken },
    { name: 'COMP SCI 256 - Intro to Software Design', status: COURSEWORK_STATUS.taken },
    { name: 'SE 320 - Software Tools & Process', status: COURSEWORK_STATUS.progress },
  ]
}

function defaultOtherCourses() {
  return [
    { name: 'COMP SCI 140 - Programming Problem Solving', status: COURSEWORK_STATUS.taken },
    { name: 'COMP SCI 181 - Human-Centered Design', status: COURSEWORK_STATUS.taken },
    { name: 'COMP SCI 240 - Discrete Mathematics', status: COURSEWORK_STATUS.taken },
    { name: 'COMP SCI 231 - Introduction to Operations', status: COURSEWORK_STATUS.taken },
    { name: 'COMP SCI 256 - Intro to Software Design', status: COURSEWORK_STATUS.taken },
    { name: 'COMP SCI 330 - Computer Programming II', status: COURSEWORK_STATUS.taken },
    { name: 'COMP SCI 207 - Programming in C', status: COURSEWORK_STATUS.taken },
    { name: 'MATH 203 - Calculus-Analyt Geom I', status: COURSEWORK_STATUS.taken },
    { name: 'MATH 260 - Introductory Statistics', status: COURSEWORK_STATUS.taken },
    { name: 'MATH 202 - Calculus-Analyt Geom E', status: COURSEWORK_STATUS.taken },
    { name: 'MATH 320 - Linear Algebra and Matrix Theory', status: COURSEWORK_STATUS.taken },
    { name: 'COMP SCI 221 - Database Design & Management', status: COURSEWORK_STATUS.progress },
    { name: 'COMP SCI 351 - Data Structures', status: COURSEWORK_STATUS.progress },
    { name: 'COMP SCI 348 - Computer Networks', status: COURSEWORK_STATUS.progress },
    { name: 'COMP SCI 251 - Computer Systems Fundamentals', status: COURSEWORK_STATUS.progress },
  ]
}

function normalizeCourseworkEntry(c, stableId) {
  const status =
    c?.status === COURSEWORK_STATUS.taken ? COURSEWORK_STATUS.taken : COURSEWORK_STATUS.progress
  return {
    id: typeof c?.id === 'string' && c.id.trim() ? c.id.trim() : stableId,
    name: typeof c?.name === 'string' && c.name.trim() ? c.name.trim() : 'Course',
    status,
  }
}

function normalizeCourseworkSubsection(section, fallbackTitle, idPrefix, defaultCourseList) {
  const title =
    section && typeof section.title === 'string' && section.title.trim()
      ? section.title.trim()
      : fallbackTitle
  const raw =
    section && typeof section === 'object' && Array.isArray(section.courses) ? section.courses : defaultCourseList
  const courses = raw.map((c, i) => normalizeCourseworkEntry(c, `${idPrefix}-${i}`))
  return { title, courses }
}

const DEFAULT_ABOUT = {
  heading: 'Built by an Engineer, Driven by Impact.',
  paragraphs: [
    "I'm Pitambar Pandey, a Software Engineering student at the University of Wisconsin–Green Bay (UWGB). I build full-stack and academic software with a focus on clean design, solid fundamentals, and shipping projects end to end.",
    "My toolkit spans Java, Python, JavaScript, HTML, CSS, C, Git, and databases — from React and Node-style web work to Java and Python apps. I've shipped personal and school projects (including a responsive site for my high school) and I'm looking for internships where I can grow as a Java, Python, or full-stack developer.",
  ],
  tagline: '🚀 Always learning. Always building.',
  imageSrc: '/profile.jpg',
  imageAlt: 'Pitambar Pandey, Software Engineering student at UW–Green Bay, portrait photo',
  imageCaption: 'profile.jpg',
}

export function sanitizeAbout(raw) {
  const a = raw && typeof raw === 'object' ? raw : {}
  const heading =
    typeof a.heading === 'string' && a.heading.trim() ? a.heading.trim() : DEFAULT_ABOUT.heading
  let paragraphs
  if (Array.isArray(a.paragraphs)) {
    paragraphs = a.paragraphs.map((p) => (typeof p === 'string' ? p : ''))
  } else {
    paragraphs = [...DEFAULT_ABOUT.paragraphs]
  }
  const tagline =
    typeof a.tagline === 'string' ? a.tagline : DEFAULT_ABOUT.tagline
  const imageSrc =
    typeof a.imageSrc === 'string' && a.imageSrc.trim() ? a.imageSrc.trim() : DEFAULT_ABOUT.imageSrc
  const imageAlt =
    typeof a.imageAlt === 'string' && a.imageAlt.trim() ? a.imageAlt.trim() : DEFAULT_ABOUT.imageAlt
  const imageCaption =
    typeof a.imageCaption === 'string' ? a.imageCaption : DEFAULT_ABOUT.imageCaption
  return { heading, paragraphs, tagline, imageSrc, imageAlt, imageCaption }
}

export function sanitizeCoursework(raw) {
  const cw = raw && typeof raw === 'object' ? raw : {}
  const pageHeading =
    typeof cw.pageHeading === 'string' && cw.pageHeading.trim() ? cw.pageHeading.trim() : 'Major Coursework'
  return {
    pageHeading,
    engineeringSupporting: normalizeCourseworkSubsection(
      cw.engineeringSupporting,
      'Software engineering supporting courses',
      'eng',
      defaultEngineeringSupportingCourses(),
    ),
    otherCourses: normalizeCourseworkSubsection(
      cw.otherCourses,
      'Other courses',
      'other',
      defaultOtherCourses(),
    ),
  }
}

/** Minimal validation so broken JSON does not brick the app. */
export function isValidSiteData(o) {
  if (!o || typeof o !== 'object') return false
  if (!o.skills || typeof o.skills !== 'object') return false
  if (!o.experience || typeof o.experience !== 'object') return false
  const exp = o.experience
  const hasSections = Array.isArray(exp.sections) && exp.sections.length >= 1
  const hasLegacy =
    Array.isArray(exp.uwgbWork) &&
    Array.isArray(exp.entries)
  if (!hasSections && !hasLegacy) return false
  if (!Array.isArray(o.projects)) return false
  return true
}

/** Normalize imported / edited JSON so UI controls always receive valid shapes. */
export function sanitizeSiteData(raw) {
  const skillIds = getSkillIconIds()
  const fallbackIcon = skillIds[0] || 'java'

  const d =
    raw && typeof raw === 'object'
      ? JSON.parse(JSON.stringify(raw))
      : {}

  if (!d.version) d.version = 1

  d.about = sanitizeAbout(d.about)

  d.skills = d.skills && typeof d.skills === 'object' ? d.skills : {}
  d.skills.intro = typeof d.skills.intro === 'string' ? d.skills.intro : ''
  d.skills.categories = d.skills.categories && typeof d.skills.categories === 'object' ? d.skills.categories : {}
  const catKeys = ['languages', 'frameworks', 'devTools', 'concepts']
  for (const k of catKeys) {
    if (!Array.isArray(d.skills.categories[k])) d.skills.categories[k] = []
  }

  d.skills.icons = Array.isArray(d.skills.icons) ? d.skills.icons : []
  d.skills.icons = d.skills.icons.map((row) => {
    const id = typeof row?.id === 'string' && skillIds.includes(row.id) ? row.id : fallbackIcon
    return {
      id,
      name: typeof row?.name === 'string' ? row.name : 'Skill',
    }
  })

  d.projects = Array.isArray(d.projects) ? d.projects : []
  d.projects = d.projects.map((p) => ({
    name: typeof p?.name === 'string' ? p.name : 'Project',
    description: typeof p?.description === 'string' ? p.description : '',
    stack: typeof p?.stack === 'string' ? p.stack : '',
    languageColor: typeof p?.languageColor === 'string' ? p.languageColor : 'bg-zinc-500',
    github: typeof p?.github === 'string' ? p.github : '#',
    live: typeof p?.live === 'string' ? p.live : '#',
  }))

  if (typeof d.projectsShowMoreComing !== 'boolean') {
    d.projectsShowMoreComing = d.projectsShowMoreComing !== false
  }

  d.experience = d.experience && typeof d.experience === 'object' ? d.experience : {}
  d.experience.sections = migrateExperienceToSections(d.experience)
  delete d.experience.uwgbWork
  delete d.experience.entries

  d.coursework = sanitizeCoursework(d.coursework)

  return d
}
