# Răgaz 17

Website boutique hospitality multi-page pentru **Răgaz 17**, un **Proiect concept** fictiv.

## Important

- Nu reprezintă o proprietate reală.
- Nu conține adresă, coordonate, ratinguri, review-uri, premii, presă, disponibilitate reală sau prețuri comerciale.
- Vizualurile proprietății sunt marcate **Imagine concept**.
- Formularul de disponibilitate este demonstrativ. Validează datele în browser și nu trimite informații către un server.
- Site-ul folosește `noindex, follow` și nu include schema Hotel cu date fictive.

## Stack

- HTML multi-page generat la build
- CSS custom
- JavaScript vanilla
- Node.js pentru build și QA
- Newsreader + Manrope prin Google Fonts, cu fallback local sigur
- fără framework și fără dependențe npm

## Rute

- `/`
- `/cazare/`
- `/experienta/`
- `/zona/`
- `/galerie/`
- `/jurnal/`
- `/intrebari/`
- `/rezervare/`
- `404.html` pentru rute necunoscute

## Funcționalități

- navigație editorială responsive
- booking strip cu validare check-in / check-out
- selector de oaspeți ca input demonstrativ, fără a declara capacitatea proprietății
- stări loading, error și success
- mobile booking bar sticky
- galerie responsive fără slideshow automat
- lightbox cu focus management, focus trap, Escape și săgeți stânga/dreapta
- FAQ cu elemente native `details` / `summary`
- skip link și landmarks
- `prefers-reduced-motion`
- imagini WebP la 1600 px și 800 px, cu `srcset`, dimensiuni explicite și lazy loading unde este potrivit
- preload controlat pentru imaginea hero
- metadata unică pe rută și `noindex, follow`

## Build

Nu sunt necesare dependențe.

```bash
npm run build
```

Output-ul este generat în `dist/`.

## Pornire locală

Proiectul folosește `http-server` în scriptul de preview din mediul în care a fost construit:

```bash
npm run preview
```

Alternativ, folderul `dist/` poate fi servit cu orice server static.

## Verificare

```bash
npm run check
node --check src/site.js
```

QA-ul static verifică rutele, markerii de concept, `noindex`, imaginile, lightbox-ul, reduced motion și absența expresiilor interzise din brief.

## Design

Direcție: **travel editorial + architecture book**.

Paletă: cream, deep forest, mineral brown, muted brick.

Tipografie: Newsreader pentru display, Manrope pentru interfață și text.

## Structură

- `src/styles.css` - sistem vizual și responsive
- `src/site.js` - navigație mobilă, booking flow, galerie și lightbox
- `scripts/build.mjs` - generatorul tuturor paginilor
- `scripts/check.mjs` - QA static
- `public/images/` - imagini concept WebP și surse SVG
- `dist/` - build-ul final gata de servire
