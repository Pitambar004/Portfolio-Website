import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { writeFileSync } from 'node:fs'
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
      babel({ presets: [reactCompilerPreset()] }),
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
