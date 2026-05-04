/* eslint-disable react-refresh/only-export-components -- provider + hook pattern */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import siteData from '../data/siteData.json'
import { SITE_DATA_STORAGE_KEY, isValidSiteData, sanitizeSiteData } from '../lib/siteDataSchema'

const SiteContentContext = createContext(null)

function loadInitialData() {
  try {
    const raw = localStorage.getItem(SITE_DATA_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (isValidSiteData(parsed)) {
        return sanitizeSiteData(parsed)
      }
    }
  } catch {
    /* ignore */
  }
  return sanitizeSiteData(siteData)
}

export function SiteContentProvider({ children }) {
  const [data, setDataState] = useState(loadInitialData)

  const setData = useCallback((next) => {
    setDataState((prev) => {
      const value = typeof next === 'function' ? next(prev) : next
      const cleaned = sanitizeSiteData(value)
      try {
        localStorage.setItem(SITE_DATA_STORAGE_KEY, JSON.stringify(cleaned))
      } catch {
        /* quota / private mode */
      }
      return cleaned
    })
  }, [])

  /** Bundled defaults from repo (no localStorage). */
  const defaults = useMemo(() => sanitizeSiteData(siteData), [])

  /** Reset live site content to shipped JSON and clear stored overrides. */
  const resetToBundledDefaults = useCallback(() => {
    const cleaned = sanitizeSiteData(siteData)
    setDataState(cleaned)
    try {
      localStorage.removeItem(SITE_DATA_STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(
    () => ({ data, setData, defaults, resetToBundledDefaults }),
    [data, setData, defaults, resetToBundledDefaults],
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext)
  if (!ctx) {
    throw new Error('useSiteContent must be used within SiteContentProvider')
  }
  return ctx
}
