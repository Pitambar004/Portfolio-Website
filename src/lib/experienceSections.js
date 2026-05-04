/** Experience is stored as sections[]. Legacy uwgbWork + entries are migrated on load. */

export const SECTION_VARIANTS = {
  /** One outer card; jobs nested inside (UWGB-style) */
  grouped: 'grouped',
  /** One timeline card per job (Other-style) */
  timeline: 'timeline',
}

export function normalizeEntry(e) {
  return {
    company: typeof e?.company === 'string' ? e.company : '',
    role: typeof e?.role === 'string' ? e.role : '',
    location: typeof e?.location === 'string' ? e.location : '',
    date: typeof e?.date === 'string' ? e.date : '',
    bullets: Array.isArray(e?.bullets)
      ? e.bullets.filter((b) => typeof b === 'string')
      : typeof e?.bullets === 'string'
        ? [e.bullets]
        : [],
  }
}

export function normalizeSection(s, fallbackId) {
  const id =
    typeof s?.id === 'string' && s.id.trim()
      ? s.id.trim()
      : typeof fallbackId === 'string'
        ? fallbackId
        : `section-${Math.random().toString(36).slice(2, 9)}`
  const variant =
    s?.variant === SECTION_VARIANTS.timeline ? SECTION_VARIANTS.timeline : SECTION_VARIANTS.grouped
  const entries = Array.isArray(s?.entries) ? s.entries.map(normalizeEntry) : []
  return {
    id,
    title: typeof s?.title === 'string' && s.title.trim() ? s.title.trim() : 'Experience',
    badge: typeof s?.badge === 'string' ? s.badge : '',
    variant,
    entries,
  }
}

/** Converts legacy { uwgbWork, entries } or partial data into sections[]. */
export function migrateExperienceToSections(exp) {
  if (!exp || typeof exp !== 'object') {
    return [
      normalizeSection({
        id: 'uwgb-work',
        title: 'UWGB Work',
        badge: 'On-campus Experience',
        variant: SECTION_VARIANTS.grouped,
        entries: [],
      }),
      normalizeSection({
        id: 'other-experience',
        title: 'Other experience',
        badge: '',
        variant: SECTION_VARIANTS.timeline,
        entries: [],
      }),
    ]
  }

  if (Array.isArray(exp.sections) && exp.sections.length > 0) {
    return exp.sections.map((s, i) => normalizeSection(s, `section-${i}`))
  }

  const uwgb = Array.isArray(exp.uwgbWork) ? exp.uwgbWork.map(normalizeEntry) : []
  const ent = Array.isArray(exp.entries) ? exp.entries.map(normalizeEntry) : []

  return [
    normalizeSection({
      id: 'uwgb-work',
      title: 'UWGB Work',
      badge: 'On-campus Experience',
      variant: SECTION_VARIANTS.grouped,
      entries: uwgb,
    }),
    normalizeSection({
      id: 'other-experience',
      title: 'Other experience',
      badge: '',
      variant: SECTION_VARIANTS.timeline,
      entries: ent,
    }),
  ]
}

export function newSectionIdFromTitle(title) {
  const slug = String(title || 'section')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const safe = slug || 'section'
  return `${safe}-${Math.random().toString(36).slice(2, 7)}`
}
