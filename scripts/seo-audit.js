#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const required = [
  'app/layout.tsx',
  'app/robots.ts',
  'app/sitemap.ts',
  'lib/seo.ts',
  'lib/schema.ts',
  'lib/site.ts',
  'public/llms.txt',
  'app/faq/page.tsx',
  'app/glossary/page.tsx',
  'app/visit/page.tsx',
  'app/admin/layout.tsx',
  'components/seo/JsonLd.tsx',
  'components/seo/GoogleAnalytics.tsx',
]

let failed = false
for (const rel of required) {
  const full = path.join(root, rel)
  if (!fs.existsSync(full)) {
    console.error(`Missing: ${rel}`)
    failed = true
  }
}

const layout = fs.readFileSync(path.join(root, 'app/layout.tsx'), 'utf8')
if (layout.includes('<link rel="canonical"')) {
  console.error('layout.tsx must not hardcode a canonical link tag')
  failed = true
}

const robots = fs.readFileSync(path.join(root, 'app/robots.ts'), 'utf8')
for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot']) {
  if (!robots.includes(bot)) {
    console.error(`robots.ts missing user agent ${bot}`)
    failed = true
  }
}

const site = fs.readFileSync(path.join(root, 'lib/site.ts'), 'utf8')
if (!site.includes('www.prayerhouseministryintl.org')) {
  console.error('lib/site.ts must canonicalize to www')
  failed = true
}

if (failed) {
  process.exit(1)
}
console.log('SEO audit checks passed')
