import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

/** Writes robots.txt + sitemap.xml into dist using VITE_SITE_URL (production domain). */
function seoFilesPlugin(mode, root) {
  return {
    name: 'seo-files',
    closeBundle() {
      const env = loadEnv(mode, root, '')
      const siteUrl = (env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '')
      const outDir = resolve(root, 'dist')
      const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
      writeFileSync(resolve(outDir, 'robots.txt'), robots)
      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap)
      // GitHub Pages: unknown paths (e.g. /admin) serve 404.html — must be the SPA entry so React Router runs.
      const indexPath = resolve(outDir, 'index.html')
      try {
        writeFileSync(resolve(outDir, '404.html'), readFileSync(indexPath, 'utf8'))
      } catch {
        /* dist may be missing in edge cases */
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root, '')

  return {
    plugins: [
      react(),
      {
        name: 'html-transform-seo',
        transformIndexHtml(html) {
          const siteUrl = (env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '')
          const ogImageRaw = env.VITE_OG_IMAGE_URL || `${siteUrl}/og-image.png`
          const ogImage = ogImageRaw.replace(/%SITE_URL%/g, siteUrl)
          return html.replace(/%SITE_URL%/g, siteUrl).replace(/%OG_IMAGE_URL%/g, ogImage)
        },
      },
      seoFilesPlugin(mode, root),
    ],
  }
})
