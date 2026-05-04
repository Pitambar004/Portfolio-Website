import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminChrome from '../components/AdminChrome'
import { useSiteContent } from '../context/SiteContentContext'
import { getSkillIconIds } from '../lib/skillIconRegistry'
import { COURSEWORK_STATUS, isValidSiteData, sanitizeSiteData } from '../lib/siteDataSchema'
import { newSectionIdFromTitle, SECTION_VARIANTS } from '../lib/experienceSections'

const SESSION_KEY = 'portfolio_admin_session'
const SESSION_EXPIRY_KEY = 'portfolio_admin_session_exp'
const SESSION_MS = 8 * 60 * 60 * 1000

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function loadSession() {
  try {
    const ok = sessionStorage.getItem(SESSION_KEY)
    const exp = Number(sessionStorage.getItem(SESSION_EXPIRY_KEY) || 0)
    if (ok === '1' && exp > Date.now()) return true
  } catch {
    /* ignore */
  }
  sessionStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_EXPIRY_KEY)
  return false
}

function saveSession() {
  sessionStorage.setItem(SESSION_KEY, '1')
  sessionStorage.setItem(SESSION_EXPIRY_KEY, String(Date.now() + SESSION_MS))
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_EXPIRY_KEY)
}

const LANGUAGE_COLOR_OPTIONS = [
  'bg-red-500',
  'bg-blue-500',
  'bg-orange-500',
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-yellow-500',
  'bg-pink-500',
  'bg-zinc-500',
]

function Admin({ theme, setTheme }) {
  const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD
  const passwordConfigured = Boolean(expectedPassword && String(expectedPassword).length > 0)

  const { data, setData, defaults, resetToBundledDefaults } = useSiteContent()
  const [authenticated, setAuthenticated] = useState(() => loadSession())
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const [fileError, setFileError] = useState('')
  const [actionNotice, setActionNotice] = useState('')
  const [tab, setTab] = useState('skills')
  const [draft, setDraft] = useState(() => sanitizeSiteData(deepClone(data)))
  /** Experience editor: 'extend' = add bullets under existing topic; 'create' = new topic block */
  const [experienceFlow, setExperienceFlow] = useState(null)
  const [extendSectionIndex, setExtendSectionIndex] = useState(0)
  const [extendBulletIndex, setExtendBulletIndex] = useState('')
  const [createTarget, setCreateTarget] = useState('')
  const [newSectionTitle, setNewSectionTitle] = useState('')
  const [newSectionBadge, setNewSectionBadge] = useState('')
  const [newSectionVariant, setNewSectionVariant] = useState('grouped')
  const importInputId = useId()

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  /** Sync draft when signing in only — avoids overwriting unsaved edits whenever live data updates. */
  useEffect(() => {
    if (authenticated) {
      setDraft(sanitizeSiteData(deepClone(data)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally not depending on `data`
  }, [authenticated])

  const skillIconIds = useMemo(() => getSkillIconIds(), [])

  const handleLogin = (e) => {
    e.preventDefault()
    setLoginError('')
    if (!passwordConfigured) {
      setLoginError('Admin password is not configured for this build.')
      return
    }
    if (passwordInput !== expectedPassword) {
      setLoginError('Incorrect password.')
      return
    }
    saveSession()
    setAuthenticated(true)
    setPasswordInput('')
  }

  const handleLogout = () => {
    clearSession()
    setAuthenticated(false)
  }

  const flashNotice = (msg) => {
    setActionNotice(msg)
    window.setTimeout(() => setActionNotice(''), 3500)
  }

  const applyPreview = () => {
    const cleaned = sanitizeSiteData(draft)
    setDraft(cleaned)
    setData(cleaned)
    flashNotice('Saved to this browser and applied to the live preview. Refresh the homepage to confirm.')
  }

  const resetDraftFromDeployed = () => {
    setDraft(deepClone(data))
    flashNotice('Draft reloaded from the current site content.')
  }

  const resetDraftFromDefaults = () => {
    setDraft(deepClone(defaults))
    flashNotice('Draft reset to shipped defaults (not applied until you click Apply preview).')
  }

  const restoreLiveToShippedDefaults = () => {
    if (
      typeof window !== 'undefined' &&
      !window.confirm(
        'Reset the live site to the original shipped content and clear saved browser data? This cannot be undone.',
      )
    ) {
      return
    }
    resetToBundledDefaults()
    setDraft(deepClone(defaults))
    flashNotice('Live site restored to shipped defaults. Other visitors still see the last deploy unless you update the repo.')
  }

  const exportJson = () => {
    const cleaned = sanitizeSiteData(draft)
    const blob = new Blob([JSON.stringify(cleaned, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'siteData.json'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    flashNotice('Download started (siteData.json). Replace src/data/siteData.json to ship changes to everyone.')
  }

  const importFromFile = useCallback((file) => {
    setFileError('')
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '{}'))
        if (!isValidSiteData(parsed)) {
          setFileError('JSON must include skills, projects, and experience sections.')
          return
        }
        setDraft(sanitizeSiteData(parsed))
        flashNotice('Imported into draft. Click Apply preview to update the site, or Download JSON for Git.')
      } catch {
        setFileError('Could not parse JSON file.')
      }
    }
    reader.onerror = () => setFileError('Could not read file.')
    reader.readAsText(file)
  }, [])

  const updateSkillsIntro = (intro) => {
    setDraft((d) => ({
      ...d,
      skills: { ...(d.skills || {}), intro },
    }))
  }

  const updateCategory = (key, value) => {
    const items = value
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
    setDraft((d) => {
      const skills = d.skills && typeof d.skills === 'object' ? d.skills : {}
      const categories = skills.categories && typeof skills.categories === 'object' ? skills.categories : {}
      return {
        ...d,
        skills: {
          ...skills,
          categories: {
            ...categories,
            [key]: items,
          },
        },
      }
    })
  }

  const updateIconRow = (index, patch) => {
    setDraft((d) => {
      const skills = d.skills && typeof d.skills === 'object' ? d.skills : {}
      const icons = [...(skills.icons || [])]
      icons[index] = { ...icons[index], ...patch }
      return { ...d, skills: { ...skills, icons } }
    })
  }

  const addIconRow = () => {
    setDraft((d) => {
      const skills = d.skills && typeof d.skills === 'object' ? d.skills : {}
      return {
        ...d,
        skills: {
          ...skills,
          icons: [...(skills.icons || []), { id: skillIconIds[0] || 'java', name: 'New skill' }],
        },
      }
    })
  }

  const removeIconRow = (index) => {
    setDraft((d) => {
      const skills = d.skills && typeof d.skills === 'object' ? d.skills : {}
      const icons = [...(skills.icons || [])]
      icons.splice(index, 1)
      return { ...d, skills: { ...skills, icons } }
    })
  }

  const updateProjectsShowMore = (checked) => {
    setDraft((d) => ({ ...d, projectsShowMoreComing: checked }))
  }

  const updateProject = (index, patch) => {
    setDraft((d) => {
      const projects = [...(d.projects || [])]
      projects[index] = { ...projects[index], ...patch }
      return { ...d, projects }
    })
  }

  const addProject = () => {
    setDraft((d) => ({
      ...d,
      projects: [
        ...(d.projects || []),
        {
          name: 'New project',
          description: '',
          stack: '',
          languageColor: 'bg-zinc-500',
          github: '#',
          live: '#',
        },
      ],
    }))
  }

  const removeProject = (index) => {
    setDraft((d) => {
      const projects = [...(d.projects || [])]
      projects.splice(index, 1)
      return { ...d, projects }
    })
  }

  const expSections = draft.experience?.sections || []
  const safeExtendSi = expSections.length ? Math.min(extendSectionIndex, expSections.length - 1) : 0

  const updateExpEntry = (sectionIndex, entryIndex, patch) => {
    setDraft((d) => {
      const exp = d.experience && typeof d.experience === 'object' ? d.experience : {}
      const sections = [...(exp.sections || [])]
      const sec = sections[sectionIndex]
      if (!sec) return d
      const entries = [...(sec.entries || [])]
      entries[entryIndex] = { ...entries[entryIndex], ...patch }
      sections[sectionIndex] = { ...sec, entries }
      return { ...d, experience: { ...exp, sections } }
    })
  }

  const updateExpBulletsEntry = (sectionIndex, entryIndex, text) => {
    const bullets = text
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    updateExpEntry(sectionIndex, entryIndex, { bullets })
  }

  const addExpEntry = (sectionIndex) => {
    setDraft((d) => {
      const exp = d.experience && typeof d.experience === 'object' ? d.experience : {}
      const sections = [...(exp.sections || [])]
      const sec = sections[sectionIndex]
      if (!sec) return d
      const entries = [
        ...(sec.entries || []),
        {
          company: 'Company',
          role: 'Role',
          location: 'Location',
          date: 'Date',
          bullets: ['First bullet point'],
        },
      ]
      sections[sectionIndex] = { ...sec, entries }
      return { ...d, experience: { ...exp, sections } }
    })
  }

  const removeExpEntry = (sectionIndex, entryIndex) => {
    setDraft((d) => {
      const exp = d.experience && typeof d.experience === 'object' ? d.experience : {}
      const sections = [...(exp.sections || [])]
      const sec = sections[sectionIndex]
      if (!sec) return d
      const entries = [...(sec.entries || [])]
      entries.splice(entryIndex, 1)
      sections[sectionIndex] = { ...sec, entries }
      return { ...d, experience: { ...exp, sections } }
    })
  }

  const appendBulletExp = (sectionIndex, entryIndex) => {
    setDraft((d) => {
      const exp = d.experience && typeof d.experience === 'object' ? d.experience : {}
      const sections = [...(exp.sections || [])]
      const sec = sections[sectionIndex]
      if (!sec) return d
      const entries = [...(sec.entries || [])]
      const prev = entries[entryIndex]
      if (!prev) return d
      const bullets = [...(prev.bullets || []), 'Edit this bullet']
      entries[entryIndex] = { ...prev, bullets }
      sections[sectionIndex] = { ...sec, entries }
      return { ...d, experience: { ...exp, sections } }
    })
    flashNotice('Bullet added. Scroll to that card and edit it in the bullet list.')
  }

  const splitSameCompanyNewRoleExp = (sectionIndex, entryIndex) => {
    setDraft((d) => {
      const exp = d.experience && typeof d.experience === 'object' ? d.experience : {}
      const sections = [...(exp.sections || [])]
      const sec = sections[sectionIndex]
      if (!sec) return d
      const list = [...(sec.entries || [])]
      const cur = list[entryIndex]
      if (!cur) return d
      const newEntry = {
        company: cur.company || '',
        role: 'New role title — e.g. Senior / Lead (edit)',
        location: cur.location || '',
        date: 'Dates for this role — edit',
        bullets: [
          'Summarize this role after your promotion or title change (keep the previous role as the card above).',
        ],
      }
      list.splice(entryIndex + 1, 0, newEntry)
      sections[sectionIndex] = { ...sec, entries: list }
      return { ...d, experience: { ...exp, sections } }
    })
    flashNotice(
      'New topic added directly below with the same company. Fill in the new role, dates, and bullets.',
    )
  }

  const moveExpEntryBetweenSections = (fromSi, entryIndex, toSi) => {
    if (fromSi === toSi) return
    setDraft((d) => {
      const exp = d.experience && typeof d.experience === 'object' ? d.experience : {}
      const sections = [...(exp.sections || [])]
      const fromSec = sections[fromSi]
      const toSec = sections[toSi]
      if (!fromSec || !toSec) return d
      const fromEntries = [...(fromSec.entries || [])]
      const [item] = fromEntries.splice(entryIndex, 1)
      if (!item) return d
      const toEntries = [...(toSec.entries || []), { ...item }]
      sections[fromSi] = { ...fromSec, entries: fromEntries }
      sections[toSi] = { ...toSec, entries: toEntries }
      return { ...d, experience: { ...exp, sections } }
    })
    flashNotice('Job moved. It appears at the bottom of the destination section’s list.')
  }

  const addExperienceSectionBox = () => {
    const title = newSectionTitle.trim()
    if (!title) {
      flashNotice('Enter a title for the new section.')
      return
    }
    setDraft((d) => {
      const exp = d.experience && typeof d.experience === 'object' ? d.experience : {}
      const sections = [...(exp.sections || [])]
      const variant =
        newSectionVariant === SECTION_VARIANTS.timeline ? SECTION_VARIANTS.timeline : SECTION_VARIANTS.grouped
      sections.push({
        id: newSectionIdFromTitle(title),
        title,
        badge: newSectionBadge.trim(),
        variant,
        entries: [],
      })
      return { ...d, experience: { ...exp, sections } }
    })
    setNewSectionTitle('')
    setNewSectionBadge('')
    setNewSectionVariant('grouped')
    setCreateTarget('')
    flashNotice(`Section “${title}” created. Add jobs in “Edit topics” or pick it in Step 2.`)
  }

  const removeExperienceSection = (sectionIndex) => {
    const sec = expSections[sectionIndex]
    if (!sec) return
    if (expSections.length <= 1) {
      flashNotice('You need at least one experience section.')
      return
    }
    if (
      (sec.entries || []).length > 0 &&
      typeof window !== 'undefined' &&
      !window.confirm(`Remove section “${sec.title}” and all ${(sec.entries || []).length} job(s) inside it?`)
    ) {
      return
    }
    setDraft((d) => {
      const exp = d.experience && typeof d.experience === 'object' ? d.experience : {}
      const sections = [...(exp.sections || [])]
      sections.splice(sectionIndex, 1)
      return { ...d, experience: { ...exp, sections } }
    })
    setExtendSectionIndex((i) => Math.min(i, Math.max(0, expSections.length - 2)))
    flashNotice('Section removed.')
  }

  const updateExperienceSectionMeta = (sectionIndex, patch) => {
    setDraft((d) => {
      const exp = d.experience && typeof d.experience === 'object' ? d.experience : {}
      const sections = [...(exp.sections || [])]
      if (!sections[sectionIndex]) return d
      sections[sectionIndex] = { ...sections[sectionIndex], ...patch }
      return { ...d, experience: { ...exp, sections } }
    })
  }

  const updateAbout = (patch) => {
    setDraft((d) => {
      const ab = d.about && typeof d.about === 'object' ? d.about : {}
      return { ...d, about: { ...ab, ...patch } }
    })
  }

  const updateAboutParagraph = (index, value) => {
    setDraft((d) => {
      const ab = d.about && typeof d.about === 'object' ? d.about : {}
      const paragraphs = [...(Array.isArray(ab.paragraphs) ? ab.paragraphs : [])]
      paragraphs[index] = value
      return { ...d, about: { ...ab, paragraphs } }
    })
  }

  const addAboutParagraph = () => {
    setDraft((d) => {
      const ab = d.about && typeof d.about === 'object' ? d.about : {}
      const paragraphs = [...(Array.isArray(ab.paragraphs) ? ab.paragraphs : []), '']
      return { ...d, about: { ...ab, paragraphs } }
    })
  }

  const removeAboutParagraph = (index) => {
    setDraft((d) => {
      const ab = d.about && typeof d.about === 'object' ? d.about : {}
      const paragraphs = [...(Array.isArray(ab.paragraphs) ? ab.paragraphs : [])]
      paragraphs.splice(index, 1)
      return { ...d, about: { ...ab, paragraphs } }
    })
  }

  const updateCourseworkPageHeading = (pageHeading) => {
    setDraft((d) => {
      const cw = d.coursework && typeof d.coursework === 'object' ? d.coursework : {}
      return { ...d, coursework: { ...cw, pageHeading } }
    })
  }

  const updateCourseworkSubsectionTitle = (subsectionKey, title) => {
    setDraft((d) => {
      const cw = d.coursework && typeof d.coursework === 'object' ? d.coursework : {}
      const sub = cw[subsectionKey] && typeof cw[subsectionKey] === 'object' ? cw[subsectionKey] : {}
      return {
        ...d,
        coursework: { ...cw, [subsectionKey]: { ...sub, title } },
      }
    })
  }

  const updateCourseworkEntry = (subsectionKey, index, patch) => {
    setDraft((d) => {
      const cw = d.coursework && typeof d.coursework === 'object' ? d.coursework : {}
      const sub = cw[subsectionKey] && typeof cw[subsectionKey] === 'object' ? cw[subsectionKey] : {}
      const courses = [...(sub.courses || [])]
      courses[index] = { ...courses[index], ...patch }
      return {
        ...d,
        coursework: { ...cw, [subsectionKey]: { ...sub, courses } },
      }
    })
  }

  const addCourseworkEntry = (subsectionKey) => {
    setDraft((d) => {
      const cw = d.coursework && typeof d.coursework === 'object' ? d.coursework : {}
      const sub = cw[subsectionKey] && typeof cw[subsectionKey] === 'object' ? cw[subsectionKey] : {}
      const courses = [
        ...(sub.courses || []),
        {
          id: `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
          name: 'New course',
          status: COURSEWORK_STATUS.progress,
        },
      ]
      return {
        ...d,
        coursework: { ...cw, [subsectionKey]: { ...sub, courses } },
      }
    })
  }

  const removeCourseworkEntry = (subsectionKey, index) => {
    setDraft((d) => {
      const cw = d.coursework && typeof d.coursework === 'object' ? d.coursework : {}
      const sub = cw[subsectionKey] && typeof cw[subsectionKey] === 'object' ? cw[subsectionKey] : {}
      const courses = [...(sub.courses || [])]
      courses.splice(index, 1)
      return {
        ...d,
        coursework: { ...cw, [subsectionKey]: { ...sub, courses } },
      }
    })
  }

  if (!authenticated) {
    return (
      <AdminChrome theme={theme} setTheme={setTheme}>
        <main
          id="main-content"
          className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-md flex-col justify-center px-4 pb-16 pt-24"
        >
        <div className="rounded-2xl border border-black/10 bg-lightCard p-6 shadow-sm dark:border-white/10 dark:bg-darkCard">
          <p className="mb-1 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ admin ]</p>
          <h1 className="mb-2 text-xl font-bold">Portfolio admin</h1>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to edit skills, projects, and experience. This URL is not linked from the public site.
          </p>
          {!passwordConfigured && (
            <div className="mb-4 rounded-lg border border-amber-300/80 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-500/40 dark:bg-amber-950/30 dark:text-amber-100">
              Set <span className="font-mono">VITE_ADMIN_PASSWORD</span> in a{' '}
              <span className="font-mono">.env</span> file locally and in your hosting provider&apos;s environment
              variables for production. Never commit real passwords to Git.
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-3">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Password
              <input
                type="password"
                autoComplete="current-password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none ring-indigo-500/0 transition focus:ring-2 dark:border-white/15 dark:bg-black/25"
              />
            </label>
            {loginError && <p className="text-sm text-red-600 dark:text-red-400">{loginError}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-zinc-500">
            <Link to="/" className="text-indigo-600 hover:underline dark:text-indigo-300">
              ← Back to site
            </Link>
          </p>
        </div>
        </main>
      </AdminChrome>
    )
  }

  const cats = draft.skills?.categories || {}

  return (
    <AdminChrome theme={theme} setTheme={setTheme}>
      <main id="main-content" className="mx-auto max-w-4xl px-4 pb-20 pt-24 sm:px-6">
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-indigo-600 dark:text-indigo-300">[ admin ]</p>
          <h1 className="text-2xl font-bold">Edit portfolio content</h1>
          <p className="mt-1 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Click <strong className="font-medium text-zinc-800 dark:text-zinc-100">Apply preview</strong> to save to this
            browser and update the portfolio immediately. Download JSON to replace{' '}
            <span className="font-mono">src/data/siteData.json</span> for all visitors after deploy.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={applyPreview}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Apply preview
          </button>
          <button
            type="button"
            onClick={resetDraftFromDeployed}
            className="rounded-lg border border-black/15 px-3 py-2 text-sm dark:border-white/15"
          >
            Reload from site
          </button>
          <button
            type="button"
            onClick={resetDraftFromDefaults}
            className="rounded-lg border border-black/15 px-3 py-2 text-sm dark:border-white/15"
          >
            Reset draft to shipped
          </button>
          <button
            type="button"
            onClick={restoreLiveToShippedDefaults}
            className="rounded-lg border border-amber-300 px-3 py-2 text-sm text-amber-900 hover:bg-amber-50 dark:border-amber-500/40 dark:text-amber-100 dark:hover:bg-amber-950/40"
          >
            Restore live to shipped
          </button>
          <button
            type="button"
            onClick={exportJson}
            className="rounded-lg border border-black/15 px-3 py-2 text-sm dark:border-white/15"
          >
            Download JSON
          </button>
          <label
            htmlFor={importInputId}
            className="cursor-pointer rounded-lg border border-black/15 px-3 py-2 text-sm dark:border-white/15"
          >
            Import JSON
            <input
              id={importInputId}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) importFromFile(f)
                e.target.value = ''
              }}
            />
          </label>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-700 hover:bg-red-50 dark:border-red-500/40 dark:text-red-300 dark:hover:bg-red-950/40"
          >
            Sign out
          </button>
        </div>
        </div>
        {actionNotice && (
          <p className="rounded-lg border border-emerald-300/60 bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-100">
            {actionNotice}
          </p>
        )}
        {fileError && (
          <p className="text-sm text-red-600 dark:text-red-400">{fileError}</p>
        )}
      </div>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-black/10 pb-3 dark:border-white/10">
        {[
          { id: 'about', label: 'About' },
          { id: 'skills', label: 'Skills' },
          { id: 'projects', label: 'Projects' },
          { id: 'experience', label: 'Experience' },
          { id: 'coursework', label: 'Coursework' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              tab === t.id
                ? 'bg-indigo-600 text-white dark:bg-indigo-300 dark:text-black'
                : 'bg-black/5 text-zinc-700 hover:bg-black/10 dark:bg-white/10 dark:text-zinc-200'
            }`}
          >
            {t.label}
          </button>
        ))}
        <Link to="/" className="ml-auto text-sm text-indigo-600 hover:underline dark:text-indigo-300">
          View site →
        </Link>
      </div>

      {tab === 'about' && (
        <div className="space-y-5 rounded-xl border border-black/10 bg-lightCard p-5 dark:border-white/10 dark:bg-darkCard">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            This content maps to the <strong className="font-medium text-zinc-800 dark:text-zinc-100">About</strong> section at
            the top of your homepage. Put the file for the portrait in <span className="font-mono text-xs">public/</span> and
            reference it as <span className="font-mono text-xs">/filename.jpg</span>.
          </p>
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Heading (H2)
            <input
              value={draft.about?.heading || ''}
              onChange={(e) => updateAbout({ heading: e.target.value })}
              className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
            />
          </label>
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Body paragraphs</h2>
              <button
                type="button"
                onClick={addAboutParagraph}
                className="text-sm text-indigo-600 hover:underline dark:text-indigo-300"
              >
                + Add paragraph
              </button>
            </div>
            <div className="space-y-3">
              {(draft.about?.paragraphs || []).map((text, idx) => (
                <div key={`about-p-${idx}`} className="rounded-lg border border-black/10 p-3 dark:border-white/10">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Paragraph {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeAboutParagraph(idx)}
                      className="text-xs text-red-600 dark:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => updateAboutParagraph(idx, e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
                  />
                </div>
              ))}
            </div>
            {(draft.about?.paragraphs || []).length === 0 && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">No paragraphs. Click + Add paragraph.</p>
            )}
          </div>
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Tagline (mono line under paragraphs, optional)
            <input
              value={draft.about?.tagline ?? ''}
              onChange={(e) => updateAbout({ tagline: e.target.value })}
              className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
            />
          </label>
          <div className="grid gap-4 border-t border-black/10 pt-4 dark:border-white/10 sm:grid-cols-2">
            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
              Image URL
              <input
                value={draft.about?.imageSrc || ''}
                onChange={(e) => updateAbout({ imageSrc: e.target.value })}
                placeholder="/profile.jpg"
                className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 font-mono text-sm dark:border-white/15 dark:bg-black/25"
              />
            </label>
            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
              Image caption (small label above photo)
              <input
                value={draft.about?.imageCaption ?? ''}
                onChange={(e) => updateAbout({ imageCaption: e.target.value })}
                className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
              />
            </label>
            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-100 sm:col-span-2">
              Image alt text (accessibility)
              <input
                value={draft.about?.imageAlt || ''}
                onChange={(e) => updateAbout({ imageAlt: e.target.value })}
                className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
              />
            </label>
          </div>
        </div>
      )}

      {tab === 'skills' && (
        <div className="space-y-4 rounded-xl border border-black/10 bg-lightCard p-5 dark:border-white/10 dark:bg-darkCard">
          <label className="block text-sm font-medium">
            Intro paragraph
            <textarea
              value={draft.skills?.intro || ''}
              onChange={(e) => updateSkillsIntro(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
            />
          </label>
          {(['languages', 'frameworks', 'devTools', 'concepts'] ).map((key) => (
            <label key={key} className="block text-sm font-medium capitalize">
              {key} (comma or newline separated)
              <textarea
                value={(cats[key] || []).join(', ')}
                onChange={(e) => updateCategory(key, e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 font-mono text-sm dark:border-white/15 dark:bg-black/25"
              />
            </label>
          ))}
          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">Skill icons (grid)</h2>
              <button type="button" onClick={addIconRow} className="text-sm text-indigo-600 hover:underline dark:text-indigo-300">
                + Add row
              </button>
            </div>
            <div className="space-y-2">
              {(draft.skills?.icons || []).map((row, idx) => (
                <div key={`icon-${idx}`} className="flex flex-wrap items-center gap-2 rounded-lg border border-black/10 p-2 dark:border-white/10">
                  <select
                    value={skillIconIds.includes(row.id) ? row.id : skillIconIds[0]}
                    onChange={(e) => updateIconRow(idx, { id: e.target.value })}
                    className="rounded-md border border-black/15 bg-white px-2 py-1 text-sm dark:border-white/15 dark:bg-black/25"
                  >
                    {skillIconIds.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                  <input
                    value={row.name}
                    onChange={(e) => updateIconRow(idx, { name: e.target.value })}
                    className="min-w-[10rem] flex-1 rounded-md border border-black/15 bg-white px-2 py-1 text-sm dark:border-white/15 dark:bg-black/25"
                  />
                  <button type="button" onClick={() => removeIconRow(idx)} className="text-sm text-red-600 dark:text-red-400">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'projects' && (
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200">
            <input type="checkbox" checked={draft.projectsShowMoreComing !== false} onChange={(e) => updateProjectsShowMore(e.target.checked)} />
            Show &quot;+ More Coming Soon&quot; tile
          </label>
          <button type="button" onClick={addProject} className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
            + Add project
          </button>
          {(draft.projects || []).map((p, idx) => (
            <div key={`proj-${idx}`} className="space-y-2 rounded-xl border border-black/10 bg-lightCard p-4 dark:border-white/10 dark:bg-darkCard">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold">Project {idx + 1}</h3>
                <button type="button" onClick={() => removeProject(idx)} className="text-sm text-red-600 dark:text-red-400">
                  Remove
                </button>
              </div>
              <input
                value={p.name}
                onChange={(e) => updateProject(idx, { name: e.target.value })}
                placeholder="Name"
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
              />
              <textarea
                value={p.description}
                onChange={(e) => updateProject(idx, { description: e.target.value })}
                placeholder="Description"
                rows={3}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
              />
              <input
                value={p.stack}
                onChange={(e) => updateProject(idx, { stack: e.target.value })}
                placeholder="Stack line"
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
              />
              <div className="flex flex-wrap gap-2">
                <label className="flex flex-col text-xs">
                  Dot preset
                  <select
                    value={
                      LANGUAGE_COLOR_OPTIONS.includes(p.languageColor) ? p.languageColor : '__custom__'
                    }
                    onChange={(e) => {
                      const v = e.target.value
                      if (v !== '__custom__') updateProject(idx, { languageColor: v })
                    }}
                    className="mt-1 rounded-md border border-black/15 bg-white px-2 py-1 text-sm dark:border-white/15 dark:bg-black/25"
                  >
                    <option value="__custom__">Custom (edit class below)</option>
                    {LANGUAGE_COLOR_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex min-w-[10rem] flex-1 flex-col text-xs">
                  Tailwind dot class
                  <input
                    value={p.languageColor || ''}
                    onChange={(e) =>
                      updateProject(idx, { languageColor: e.target.value.trim() || 'bg-zinc-500' })
                    }
                    placeholder="e.g. bg-rose-500"
                    className="mt-1 rounded-lg border border-black/15 bg-white px-3 py-2 font-mono text-sm dark:border-white/15 dark:bg-black/25"
                  />
                </label>
                <label className="min-w-[8rem] flex-1 flex flex-col text-xs">
                  GitHub URL
                  <input
                    value={p.github}
                    onChange={(e) => updateProject(idx, { github: e.target.value })}
                    className="mt-1 rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
                  />
                </label>
                <label className="min-w-[8rem] flex-1 flex flex-col text-xs">
                  Live URL
                  <input
                    value={p.live}
                    onChange={(e) => updateProject(idx, { live: e.target.value })}
                    className="mt-1 rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'experience' && (
        <div className="space-y-8">
          {/* Step 1 — pick workflow */}
          <section className="rounded-2xl border-2 border-indigo-200/80 bg-gradient-to-b from-indigo-50/90 to-white p-5 dark:border-indigo-500/30 dark:from-indigo-950/50 dark:to-darkCard">
            <p className="font-mono text-xs text-indigo-600 dark:text-indigo-300">Step 1</p>
            <h3 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">How do you want to add experience?</h3>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              Pick one: extend an <strong className="text-zinc-800 dark:text-zinc-200">existing topic</strong> (same
              company/role card) or <strong className="text-zinc-800 dark:text-zinc-200">create a new topic</strong>{' '}
              (a separate block with its own heading).
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setExperienceFlow('extend')
                  setExtendBulletIndex('')
                }}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  experienceFlow === 'extend'
                    ? 'border-indigo-600 bg-white shadow-md ring-2 ring-indigo-500/30 dark:border-indigo-400 dark:bg-indigo-950/60 dark:ring-indigo-400/20'
                    : 'border-black/10 bg-white/60 hover:border-indigo-300 dark:border-white/10 dark:bg-black/20 dark:hover:border-indigo-500/40'
                }`}
              >
                <span className="block font-semibold text-zinc-900 dark:text-zinc-50">Add under existing topic</span>
                <span className="mt-1 block text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Add another bullet line under a topic you already added (same company / role heading).
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setExperienceFlow('create')
                  setExtendBulletIndex('')
                }}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  experienceFlow === 'create'
                    ? 'border-indigo-600 bg-white shadow-md ring-2 ring-indigo-500/30 dark:border-indigo-400 dark:bg-indigo-950/60 dark:ring-indigo-400/20'
                    : 'border-black/10 bg-white/60 hover:border-indigo-300 dark:border-white/10 dark:bg-black/20 dark:hover:border-indigo-500/40'
                }`}
              >
                <span className="block font-semibold text-zinc-900 dark:text-zinc-50">Create new topic</span>
                <span className="mt-1 block text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Add a whole new experience block (new company, role, dates, and bullets).
                </span>
              </button>
            </div>
          </section>

          {/* Step 2a — existing topic */}
          {experienceFlow === 'extend' && (
            <section className="rounded-2xl border border-emerald-200/90 bg-emerald-50/40 p-5 dark:border-emerald-500/25 dark:bg-emerald-950/25">
              <p className="font-mono text-xs text-emerald-700 dark:text-emerald-300">Step 2 · Existing topic</p>
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Add a bullet under an existing heading</h3>
              <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                Choose which <strong className="font-medium text-zinc-800 dark:text-zinc-200">section box</strong> on your site
                (UWGB Work, Other experience, or any custom section), then pick the job.
              </p>
              <label className="mb-4 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Section
                <select
                  value={String(safeExtendSi)}
                  onChange={(e) => {
                    setExtendSectionIndex(Number(e.target.value))
                    setExtendBulletIndex('')
                  }}
                  className="mt-1 w-full max-w-md rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
                >
                  {expSections.map((s, si) => (
                    <option key={s.id} value={String(si)}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
                <label className="min-w-0 flex-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  Job (company — role)
                  <select
                    value={extendBulletIndex}
                    onChange={(e) => setExtendBulletIndex(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
                  >
                    <option value="">Choose a job…</option>
                    {(expSections[safeExtendSi]?.entries || []).map((e, i) => (
                      <option key={`ext-${safeExtendSi}-${i}`} value={String(i)}>
                        {(e.company || 'Company').slice(0, 52)}
                        {e.role ? ` — ${String(e.role).slice(0, 52)}` : ''}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  disabled={
                    extendBulletIndex === '' || (expSections[safeExtendSi]?.entries || []).length === 0
                  }
                  onClick={() => {
                    if (extendBulletIndex === '') return
                    appendBulletExp(safeExtendSi, Number(extendBulletIndex))
                  }}
                  className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add bullet to this topic
                </button>
              </div>
              <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                You can also use <strong className="font-medium text-zinc-700 dark:text-zinc-300">+ Add bullet here</strong> on
                each card below.
              </p>
            </section>
          )}

          {/* Step 2b — new job: pick section or create new section box */}
          {experienceFlow === 'create' && (
            <section className="rounded-2xl border border-violet-200/90 bg-violet-50/40 p-5 dark:border-violet-500/25 dark:bg-violet-950/25">
              <p className="font-mono text-xs text-violet-700 dark:text-violet-300">Step 2 · New job</p>
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Where should this job appear?</h3>
              <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                Pick <strong className="font-medium text-zinc-800 dark:text-zinc-200">UWGB Work</strong>,{' '}
                <strong className="font-medium text-zinc-800 dark:text-zinc-200">Other experience</strong>, or any section you
                added — or create a <strong className="font-medium text-zinc-800 dark:text-zinc-200">new section box</strong>{' '}
                with its own title on the site.
              </p>
              <label className="mb-3 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Add blank job to section
                <select
                  value={createTarget}
                  onChange={(e) => setCreateTarget(e.target.value)}
                  className="mt-1 w-full max-w-lg rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
                >
                  <option value="">Choose…</option>
                  {expSections.map((s, si) => (
                    <option key={s.id} value={String(si)}>
                      {s.title}
                    </option>
                  ))}
                  <option value="new">＋ Create a new section box…</option>
                </select>
              </label>
              {createTarget !== '' && createTarget !== 'new' && (
                <button
                  type="button"
                  onClick={() => {
                    addExpEntry(Number(createTarget))
                    flashNotice(
                      `Blank job added to “${expSections[Number(createTarget)]?.title}”. Scroll down to edit it.`,
                    )
                  }}
                  className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
                >
                  + Add blank job to {expSections[Number(createTarget)]?.title}
                </button>
              )}
              {createTarget === 'new' && (
                <div className="mt-4 space-y-3 rounded-xl border border-violet-300/80 bg-white/80 p-4 dark:border-violet-500/35 dark:bg-violet-950/40">
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">New section on your portfolio</p>
                  <label className="block text-xs text-zinc-700 dark:text-zinc-200">
                    Section title (shown on your site)
                    <input
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      placeholder="e.g. Internships, Freelance, Volunteering"
                      className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
                    />
                  </label>
                  <label className="block text-xs text-zinc-700 dark:text-zinc-200">
                    Badge (optional, e.g. Remote)
                    <input
                      value={newSectionBadge}
                      onChange={(e) => setNewSectionBadge(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
                    />
                  </label>
                  <label className="block text-xs text-zinc-700 dark:text-zinc-200">
                    Layout
                    <select
                      value={newSectionVariant}
                      onChange={(e) => setNewSectionVariant(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
                    >
                      <option value="grouped">One box — multiple jobs inside (like UWGB Work)</option>
                      <option value="timeline">Separate card per job (like Other experience)</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    onClick={addExperienceSectionBox}
                    className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-600"
                  >
                    Create section box
                  </button>
                </div>
              )}
            </section>
          )}

          {!experienceFlow && (
            <p className="rounded-lg border border-dashed border-zinc-300 px-4 py-3 text-center text-sm text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">
              Select <strong className="font-medium text-zinc-700 dark:text-zinc-300">Step 1</strong> above to show the
              right tools. Your saved topics are always listed in the sections below.
            </p>
          )}

          {/* Editor lists — one block per section on the site */}
          <section className="border-t border-black/10 pt-8 dark:border-white/10">
            <p className="mb-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">Edit topics below</p>
            <p className="mb-4 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
              <strong className="font-medium text-zinc-800 dark:text-zinc-200">Two roles at one company?</strong> Use{' '}
              <span className="font-mono text-xs text-violet-700 dark:text-violet-300">Same org — new role card</span>. Use{' '}
              <span className="font-mono text-xs text-amber-800 dark:text-amber-200">Move to section</span> on each card to place a
              job under UWGB Work, Other experience, or any custom section box.
            </p>
          </section>

          {expSections.map((section, sectionIndex) => (
            <section
              key={section.id}
              className={
                sectionIndex > 0
                  ? 'border-t border-black/10 pt-8 dark:border-white/10'
                  : 'pt-0'
              }
            >
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
                <div className="min-w-0 flex-1 space-y-2">
                  <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Section title (shown on site)
                    <input
                      value={section.title}
                      onChange={(ev) =>
                        updateExperienceSectionMeta(sectionIndex, { title: ev.target.value })
                      }
                      className="mt-1 w-full max-w-xl rounded-lg border border-black/15 bg-white px-3 py-2 text-base font-semibold text-zinc-900 dark:border-white/15 dark:bg-black/25 dark:text-zinc-50"
                    />
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <label className="text-xs text-zinc-600 dark:text-zinc-400">
                      Badge
                      <input
                        value={section.badge || ''}
                        onChange={(ev) =>
                          updateExperienceSectionMeta(sectionIndex, { badge: ev.target.value })
                        }
                        placeholder="optional"
                        className="ml-2 w-40 rounded border border-black/15 bg-white px-2 py-1 text-sm dark:border-white/15 dark:bg-black/25"
                      />
                    </label>
                    <label className="text-xs text-zinc-600 dark:text-zinc-400">
                      Layout
                      <select
                        value={section.variant || SECTION_VARIANTS.grouped}
                        onChange={(ev) =>
                          updateExperienceSectionMeta(sectionIndex, {
                            variant:
                              ev.target.value === SECTION_VARIANTS.timeline
                                ? SECTION_VARIANTS.timeline
                                : SECTION_VARIANTS.grouped,
                          })
                        }
                        className="ml-2 rounded border border-black/15 bg-white px-2 py-1 text-sm dark:border-white/15 dark:bg-black/25"
                      >
                        <option value={SECTION_VARIANTS.grouped}>One box (grouped)</option>
                        <option value={SECTION_VARIANTS.timeline}>Timeline (one card per job)</option>
                      </select>
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeExperienceSection(sectionIndex)}
                  className="shrink-0 rounded-lg border border-red-300/80 bg-red-50 px-3 py-2 text-xs font-medium text-red-800 hover:bg-red-100 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-950/60"
                >
                  Remove entire section
                </button>
              </div>
              <div className="space-y-4">
                {(section.entries || []).map((entry, idx) => (
                  <ExperienceEditorCard
                    key={`${section.id}-${idx}`}
                    entry={entry}
                    sectionIndex={sectionIndex}
                    sections={expSections}
                    onChangeField={(patch) => updateExpEntry(sectionIndex, idx, patch)}
                    onChangeBullets={(text) => updateExpBulletsEntry(sectionIndex, idx, text)}
                    onRemove={() => removeExpEntry(sectionIndex, idx)}
                    onAppendBullet={() => appendBulletExp(sectionIndex, idx)}
                    onSameCompanyNewRole={() => splitSameCompanyNewRoleExp(sectionIndex, idx)}
                    onMoveToSection={(toSi) => moveExpEntryBetweenSections(sectionIndex, idx, toSi)}
                  />
                ))}
              </div>
              {(section.entries || []).length === 0 && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  No jobs in this section yet. Use Step 1 → Create new topic, or add a blank job above.
                </p>
              )}
            </section>
          ))}
        </div>
      )}

      {tab === 'coursework' && (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Two columns on your site: <strong className="font-medium text-zinc-800 dark:text-zinc-100">Software engineering supporting courses</strong>{' '}
            (left) and <strong className="font-medium text-zinc-800 dark:text-zinc-100">Other courses</strong> (right). Each row can
            be marked <strong className="font-medium">Taken</strong> or <strong className="font-medium">In progress</strong>.
          </p>
          <label className="block rounded-xl border border-black/10 bg-lightCard p-4 dark:border-white/10 dark:bg-darkCard">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">Page heading (main title)</span>
            <input
              value={draft.coursework?.pageHeading || ''}
              onChange={(e) => updateCourseworkPageHeading(e.target.value)}
              className="mt-1 w-full max-w-xl rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
            />
          </label>

          {(
            [
              {
                key: 'engineeringSupporting',
                adminLabel: 'Software engineering supporting courses (left column)',
              },
              { key: 'otherCourses', adminLabel: 'Other courses (right column)' },
            ]
          ).map(({ key, adminLabel }) => {
            const sub = draft.coursework?.[key] || { title: '', courses: [] }
            return (
              <div
                key={key}
                className="space-y-3 rounded-xl border border-black/10 bg-lightCard p-4 dark:border-white/10 dark:bg-darkCard"
              >
                <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{adminLabel}</p>
                <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  Section title
                  <input
                    value={sub.title || ''}
                    onChange={(e) => updateCourseworkSubsectionTitle(key, e.target.value)}
                    className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
                  />
                </label>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Courses</h3>
                  <button
                    type="button"
                    onClick={() => addCourseworkEntry(key)}
                    className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
                  >
                    + Add course
                  </button>
                </div>
                <div className="space-y-2">
                  {(sub.courses || []).map((row, idx) => (
                    <div
                      key={row.id || `${key}-${idx}`}
                      className="flex flex-col gap-2 rounded-lg border border-black/10 p-3 sm:flex-row sm:flex-wrap sm:items-end dark:border-white/10"
                    >
                      <label className="min-w-0 flex-1 text-xs text-zinc-700 dark:text-zinc-200">
                        Course name
                        <input
                          value={row.name || ''}
                          onChange={(e) => updateCourseworkEntry(key, idx, { name: e.target.value })}
                          className="mt-1 w-full rounded-md border border-black/15 bg-white px-2 py-1.5 text-sm dark:border-white/15 dark:bg-black/25"
                        />
                      </label>
                      <label className="text-xs text-zinc-700 dark:text-zinc-200">
                        Status
                        <select
                          value={row.status === COURSEWORK_STATUS.taken ? COURSEWORK_STATUS.taken : COURSEWORK_STATUS.progress}
                          onChange={(e) =>
                            updateCourseworkEntry(key, idx, {
                              status:
                                e.target.value === COURSEWORK_STATUS.taken
                                  ? COURSEWORK_STATUS.taken
                                  : COURSEWORK_STATUS.progress,
                            })
                          }
                          className="mt-1 block rounded-md border border-black/15 bg-white px-2 py-1.5 text-sm dark:border-white/15 dark:bg-black/25"
                        >
                          <option value={COURSEWORK_STATUS.taken}>Taken</option>
                          <option value={COURSEWORK_STATUS.progress}>In progress</option>
                        </select>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeCourseworkEntry(key, idx)}
                        className="text-sm text-red-600 dark:text-red-400 sm:ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                {(sub.courses || []).length === 0 && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">No courses yet. Click + Add course.</p>
                )}
              </div>
            )
          })}
        </div>
      )}

      <p className="mt-8 text-xs text-zinc-500">
        Client-side passwords are not truly secret (someone could inspect the deployed JavaScript). For stronger protection,
        use server-side auth or a CMS. This panel is &quot;casual lock&quot; level only.
      </p>
      </main>
    </AdminChrome>
  )
}

function ExperienceEditorCard({
  entry,
  sectionIndex,
  sections,
  onChangeField,
  onChangeBullets,
  onRemove,
  onAppendBullet,
  onSameCompanyNewRole,
  onMoveToSection,
}) {
  const safe = entry || {}
  const moveTargets = (sections || []).filter((_, si) => si !== sectionIndex)
  return (
    <div className="rounded-xl border border-black/10 bg-lightCard p-4 dark:border-white/10 dark:bg-darkCard">
      <div className="mb-2 flex flex-wrap items-center justify-end gap-2">
        {onMoveToSection && moveTargets.length > 0 && (
          <label className="flex items-center gap-2 rounded-lg border border-amber-400/80 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-950 dark:border-amber-500/45 dark:bg-amber-950/45 dark:text-amber-100">
            Move to
            <select
              defaultValue=""
              onChange={(e) => {
                const v = e.target.value
                if (v === '') return
                onMoveToSection(Number(v))
                e.target.value = ''
              }}
              title="Place this job under another section box on your site."
              className="max-w-[12rem] rounded border border-amber-300/80 bg-white px-2 py-1 text-sm text-amber-950 dark:border-amber-500/40 dark:bg-amber-950/60 dark:text-amber-50"
            >
              <option value="">section…</option>
              {sections.map((s, si) =>
                si !== sectionIndex ? (
                  <option key={s.id} value={si}>
                    {s.title}
                  </option>
                ) : null,
              )}
            </select>
          </label>
        )}
        {onSameCompanyNewRole && (
          <button
            type="button"
            onClick={onSameCompanyNewRole}
            title="Same company & location → new card below for a promotion or new job title at this organization."
            className="rounded-lg border border-violet-300 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-900 hover:bg-violet-100 dark:border-violet-500/40 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/40"
          >
            Same org — new role card
          </button>
        )}
        {onAppendBullet && (
          <button
            type="button"
            onClick={onAppendBullet}
            className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-300"
          >
            + Add bullet here
          </button>
        )}
        <button type="button" onClick={onRemove} className="text-sm text-red-600 dark:text-red-400">
          Remove block
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-xs text-zinc-700 dark:text-zinc-200">
          Company
          <input
            value={safe.company ?? ''}
            onChange={(e) => onChangeField({ company: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
          />
        </label>
        <label className="text-xs text-zinc-700 dark:text-zinc-200">
          Role
          <input
            value={safe.role ?? ''}
            onChange={(e) => onChangeField({ role: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
          />
        </label>
        <label className="text-xs text-zinc-700 dark:text-zinc-200">
          Location
          <input
            value={safe.location ?? ''}
            onChange={(e) => onChangeField({ location: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
          />
        </label>
        <label className="text-xs text-zinc-700 dark:text-zinc-200">
          Date
          <input
            value={safe.date ?? ''}
            onChange={(e) => onChangeField({ date: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-black/25"
          />
        </label>
      </div>
      <label className="mt-3 block text-xs text-zinc-700 dark:text-zinc-200">
        Bullets (one per line)
        <textarea
          value={(safe.bullets || []).join('\n')}
          onChange={(e) => onChangeBullets(e.target.value)}
          rows={6}
          className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 font-mono text-sm dark:border-white/15 dark:bg-black/25"
        />
      </label>
    </div>
  )
}

export default Admin
