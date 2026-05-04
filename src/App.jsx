import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Admin from './pages/Admin'

function App() {
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="relative min-h-screen bg-lightBg text-lightText transition-colors duration-300 dark:bg-darkBg dark:text-darkText">
      <a
        href="#main-content"
        className="fixed left-[-10000px] top-4 z-[100] rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg focus:left-4 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/50"
      >
        Skip to main content
      </a>
      <Routes>
        <Route path="/admin" element={<Admin theme={theme} setTheme={setTheme} />} />
        <Route path="*" element={<MainLayout theme={theme} setTheme={setTheme} />} />
      </Routes>
    </div>
  )
}

export default App
