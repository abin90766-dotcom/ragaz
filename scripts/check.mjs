import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const buildScript = fs.readFileSync(path.join(root, 'scripts', 'build.mjs'), 'utf8')
const js = fs.readFileSync(path.join(root, 'src', 'site.js'), 'utf8')
const css = fs.readFileSync(path.join(root, 'src', 'styles.css'), 'utf8')
const all = `${buildScript}\n${js}\n${css}`
const failures = []
const forbiddenCopy = ['colț de rai', 'oază de liniște', 'experiență de neuitat', 'evadează din cotidian', 'magie', 'lux redefinit']
const requiredRoutes = ['cazare','experienta','zona','galerie','jurnal','intrebari','rezervare']
const images = ['ragaz-hero.webp','exterior-dim.webp','interior-light.webp','window-forest.webp','table-materials.webp','afternoon-room.webp','evening-fire.webp','stone-detail.webp','forest-path.webp','journal-still.webp']

for (const phrase of forbiddenCopy) if (all.toLowerCase().includes(phrase)) failures.push(`Expresie interzisă: ${phrase}`)
if (all.includes(String.fromCodePoint(0x2014))) failures.push('A fost găsit em dash')
for (const marker of ['Proiect concept','Imagine concept','noindex, follow','Solicită disponibilitate']) if (!all.includes(marker)) failures.push(`Marker lipsă: ${marker}`)
for (const route of requiredRoutes) if (!buildScript.includes(`['${route}'`)) failures.push(`Rută lipsă în build: ${route}`)
for (const image of images) if (!fs.existsSync(path.join(root,'public','images',image))) failures.push(`Imagine lipsă: ${image}`)
if (!js.includes("event.key === 'Escape'")) failures.push('Escape pentru lightbox lipsește')
if (!js.includes("event.key === 'Tab'")) failures.push('Focus trap pentru lightbox lipsește')
if (!js.includes("event.key === 'ArrowRight'")) failures.push('Control săgeată dreapta lipsește')
if (!css.includes('prefers-reduced-motion')) failures.push('Reduced motion lipsește')
if (!buildScript.includes('rel="preload"')) failures.push('Preload hero lipsește')
if (!buildScript.includes('loading="lazy"')) failures.push('Lazy loading lipsește')
if (!buildScript.includes('width="1600" height="1100"')) failures.push('Dimensiuni explicite pentru imagini lipsesc')
if (css.includes('gradient(')) failures.push('Gradient CSS detectat')
if (css.includes('backdrop-filter')) failures.push('Glassmorphism / backdrop-filter detectat')
if (css.toLowerCase().includes('cursive')) failures.push('Font cursiv detectat')

if (failures.length) {
  console.error('QA static a eșuat:')
  failures.forEach(x => console.error(`- ${x}`))
  process.exit(1)
}
console.log('QA static: OK')
console.log('Rute sursă: 8 + 404')
console.log(`Imagini WebP: ${images.length}`)
