import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const src = path.join(root, 'src')
const publicDir = path.join(root, 'public')

fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(dist, { recursive: true })

const navItems = [
  ['Cazare', '/cazare/'], ['Experiență', '/experienta/'], ['Zona', '/zona/'], ['Galerie', '/galerie/'], ['Jurnal', '/jurnal/'], ['Întrebări', '/intrebari/']
]
const stays = [
  {name:'Camera Frasin', eyebrow:'Unitate concept 01', image:'/images/interior-light.webp', alt:'Studiu vizual concept pentru Camera Frasin, cu lemn, pat jos și fereastră mare spre pădure', copy:'O cameră construită în jurul luminii de dimineață, cu suprafețe mate, lemn în ton cald și textile cu țesătură vizibilă.', details:['lemn natur','textile mate','lumină laterală']},
  {name:'Suita Piatră', eyebrow:'Unitate concept 02', image:'/images/stone-detail.webp', alt:'Studiu vizual concept pentru Suita Piatră, cu suprafețe minerale și mobilier din lemn', copy:'Spațiul pune în contrast textura minerală cu mobilierul simplu. Deschiderile sunt desenate pentru privire, nu pentru decor.', details:['piatră aparentă','mobilier masiv','tonuri minerale']},
  {name:'Studio Foc', eyebrow:'Unitate concept 03', image:'/images/evening-fire.webp', alt:'Studiu vizual concept pentru Studio Foc, cu atmosferă de seară și sursă de căldură centrală', copy:'Un interior mai întunecat, gândit pentru sfârșitul zilei, cu o zonă de stat aproape de sursa de căldură și lumină joasă.', details:['lumină joasă','lemn închis','zonă de stat']}
]
const timeline = [
  ['07:10','Dimineața','Lumina intră oblic, atinge lemnul și lasă restul camerei aproape neschimbat. Cafeaua încape într-un ritm fără grabă.','/images/interior-light.webp'],
  ['10:30','Natură','Ieșirea începe fără traseu impus. Pădure, teren umed, pietriș și aer rece. Zona este prezentată orientativ, fără localizare fictivă.','/images/forest-path.webp'],
  ['15:20','După-amiaza','Interiorul devine loc de citit, scris sau stat. Mobilierul rămâne puțin, iar ferestrele fac cea mai mare parte din compoziție.','/images/afternoon-room.webp'],
  ['18:40','Masa','O masă simplă, materiale tactile și obiecte puține. Nu propunem meniuri, restaurante sau servicii locale inventate.','/images/table-materials.webp'],
  ['21:15','Seara','Lumina artificială rămâne joasă. Textura pereților și căldura materialelor devin mai vizibile decât peisajul din exterior.','/images/evening-fire.webp']
]
const gallery = [
  ['/images/ragaz-hero.webp','Exteriorul proprietății, studiu de volum și relație cu panta. Imagine concept.'],
  ['/images/exterior-dim.webp','Fațada în lumină difuză, cu materialitate minerală și lemn. Imagine concept.'],
  ['/images/window-forest.webp','Fereastră amplă spre vegetație, văzută din interior. Imagine concept.'],
  ['/images/interior-light.webp','Interior de dimineață, cu lumină laterală și texturi mate. Imagine concept.'],
  ['/images/afternoon-room.webp','Zonă de odihnă în lumină de după-amiază. Imagine concept.'],
  ['/images/table-materials.webp','Studiu de materiale și masă, fără elemente comerciale. Imagine concept.'],
  ['/images/stone-detail.webp','Detaliu mineral și tâmplărie din lemn. Imagine concept.'],
  ['/images/evening-fire.webp','Interior de seară, lumină joasă și suprafețe închise. Imagine concept.'],
  ['/images/forest-path.webp','Potecă prin vegetație, reper de atmosferă fără localizare reală. Imagine concept.'],
  ['/images/journal-still.webp','Natură statică pentru jurnalul editorial. Imagine concept.']
]
const faqs = [
  ['Răgaz 17 este o proprietate reală?','Nu. Răgaz 17 este un Proiect concept fictiv pentru un website boutique hospitality. Nu există adresă, disponibilitate, rating sau rezervare reală.'],
  ['Pot verifica disponibilitatea?','Poți folosi formularul ca demonstrație de interfață. Datele sunt validate local, dar nu sunt trimise către o proprietate și nu confirmă disponibilitatea.'],
  ['Unde se află cabana?','Nu este indicată nicio localitate, adresă sau coordonată. Pagina Zona descrie doar tipuri de repere și ritmul unei șederi în natură.'],
  ['Imaginile sunt fotografii reale?','Nu. Vizualurile proprietății sunt marcate Imagine concept și reprezintă studii vizuale coerente pentru aceeași direcție arhitecturală.'],
  ['Prețurile și capacitatea sunt reale?','Nu sunt afișate prețuri comerciale, capacitate sau număr de oaspeți acceptat. Orice element demonstrativ este marcat explicit.']
]
const journal = [
  ['01','Materiale care îmbătrânesc bine','Lemnul, piatra și metalul mat pot suporta urme, variații și lumină fără să ceară un interior steril.','/images/stone-detail.webp'],
  ['02','Fereastra ca piesă principală','Într-un spațiu mic, o deschidere bine așezată poate face mai mult decât un obiect decorativ suplimentar.','/images/window-forest.webp'],
  ['03','O zi fără program dens','Experiența nu are nevoie de o listă lungă de activități. Alternanța dintre interior, mers și masă poate fi suficientă.','/images/journal-still.webp']
]

const esc = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')
const badge = (text='Proiect concept') => `<span class="concept-badge">${text}</span>`
const sectionHeading = (number, eyebrow, title, intro='') => `<header class="section-heading"><div class="section-number" aria-hidden="true">${number}</div><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2>${intro ? `<p class="section-intro">${intro}</p>` : ''}</div></header>`

function nav(current='') {
  return `<header class="site-header">
    <a href="/" class="wordmark" aria-label="Răgaz 17, pagina principală"><span>Răgaz</span><sup>17</sup></a>
    <nav class="desktop-nav" aria-label="Navigație principală">${navItems.map(([label,href]) => `<a href="${href}" class="${current===href?'active':''}">${label}</a>`).join('')}</nav>
    <a class="header-cta" href="/rezervare/">Verifică sejurul</a>
    <button class="menu-button" data-menu-button aria-expanded="false" aria-controls="mobile-menu"><span>Meniu</span></button>
    <div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden><nav aria-label="Navigație mobilă">${navItems.map(([label,href]) => `<a href="${href}">${label}</a>`).join('')}<a href="/rezervare/">Verifică sejurul</a></nav>${badge()}</div>
  </header>`
}
function footer() {
  return `<footer class="site-footer">
    <div class="footer-brand"><a href="/" class="wordmark footer-wordmark"><span>Răgaz</span><sup>17</sup></a><p>Proiect concept de boutique hospitality. Fără proprietate, adresă, rating sau rezervare reală.</p></div>
    <div class="footer-nav"><p class="eyebrow">Explorare</p>${navItems.map(([label,href])=>`<a href="${href}">${label}</a>`).join('')}</div>
    <div class="footer-nav"><p class="eyebrow">Sejur</p><a href="/rezervare/">Solicită disponibilitate</a><a href="/intrebari/">Întrebări frecvente</a><span>noindex, follow</span></div>
    <div class="footer-bottom"><span>Răgaz 17 © Concept</span>${badge()}</div>
  </footer>
  <div class="mobile-booking-bar" aria-label="Acțiune rezervare"><span><small>Răgaz 17</small>Proiect concept</span><a href="/rezervare/">Verifică sejurul</a></div>`
}
function page({title, description, current='', content, preload='/images/ragaz-hero.webp'}) {
  const responsiveContent = content.replace(/<img src="(\/images\/([^"]+))\.webp"/g, (_m, base) => `<img src="${base}.webp" srcset="${base}-800.webp 800w, ${base}.webp 1600w" sizes="100vw"`)
  return `<!doctype html><html lang="ro"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex, follow"><meta name="theme-color" content="#f0eadf">
    <meta name="description" content="${esc(description)}"><title>${esc(title)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap" rel="stylesheet">
    <link rel="preload" as="image" href="${preload}" fetchpriority="high"><link rel="stylesheet" href="/styles.css?v=4"><style>.lightbox-backdrop[hidden]{display:none!important}</style>
  </head><body><a class="skip-link" href="#main-content">Sari la conținut</a>${nav(current)}<main id="main-content">${responsiveContent}</main>${footer()}<script src="/site.js?v=4" defer></script></body></html>`
}
function pageHero(eyebrow, title, text, image) {
  return `<section class="page-hero"><div class="page-hero-copy">${badge()}<p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${text}</p></div><figure><img src="${image}" alt="${esc(title)}, imagine concept" width="1600" height="1100" fetchpriority="high"><figcaption>Imagine concept</figcaption></figure></section>`
}
function editorialStory({image, number, eyebrow, title, body, reverse=false, caption='Imagine concept'}) {
  return `<article class="editorial-story ${reverse?'reverse':''}"><figure><img src="${image}" alt="${esc(title)}, imagine concept" width="1600" height="1100" loading="lazy"><figcaption>${caption}</figcaption></figure><div class="editorial-story-copy"><span class="story-number">${number}</span><p class="eyebrow">${eyebrow}</p><h3>${title}</h3><div class="prose">${body}</div></div></article>`
}
function stayCards() {
  return `<div class="stay-list">${stays.map((s,i)=>`<article class="stay-card"><figure><img src="${s.image}" alt="${esc(s.alt)}" width="1600" height="1100" loading="lazy"><figcaption>${badge('Imagine concept')}</figcaption></figure><div class="stay-card-copy"><p class="eyebrow">${s.eyebrow}</p><h3>${s.name}</h3><p>${s.copy}</p><ul aria-label="Caracteristici ${esc(s.name)}">${s.details.map(x=>`<li>${x}</li>`).join('')}</ul><span class="demo-note">Date demonstrative. Fără tarif sau capacitate reală.</span></div><span class="stay-index" aria-hidden="true">0${i+1}</span></article>`).join('')}</div>`
}
function bookingStrip() {
  return `<section class="booking-strip" aria-labelledby="booking-strip-title"><div class="booking-strip-label"><p class="eyebrow">Date demonstrative</p><h2 id="booking-strip-title">Solicită disponibilitate</h2><p>Formular demonstrativ, fără verificare reală de inventar.</p></div>
    <form class="booking-fields compact" data-booking-strip novalidate>
      <label><span>Check-in</span><input type="date" name="checkIn" required></label><label><span>Check-out</span><input type="date" name="checkOut" required></label>
      <label><span>Oaspeți</span><select name="guests"><option value="1">1</option><option value="2" selected>2</option><option value="3">3</option><option value="4+">4+</option></select></label>
      <button type="submit" class="button button-dark">Solicită disponibilitate</button><p class="form-message error" data-form-message role="alert" hidden></p>
    </form></section>`
}
function timelineMarkup() {
  return `<div class="timeline">${timeline.map(([time,title,text,image],i)=>`<article class="timeline-item"><div class="timeline-time"><span>${time}</span><small>0${i+1}</small></div><figure><img src="${image}" alt="${esc(title)}, imagine concept pentru experiența Răgaz 17" width="1600" height="1100" loading="lazy"><figcaption>Imagine concept</figcaption></figure><div class="timeline-copy"><h3>${title}</h3><p>${text}</p></div></article>`).join('')}</div>`
}
function galleryMarkup(limit=gallery.length) {
  return `<div class="gallery-grid">${gallery.slice(0,limit).map(([src,caption],i)=>`<button class="gallery-item item-${i+1}" data-static-gallery-item data-src="${src}" data-caption="${esc(caption)}" aria-label="Deschide imaginea ${i+1}: ${esc(caption)}"><img src="${src}" alt="${esc(caption)}" width="1600" height="1100" loading="${i<2?'eager':'lazy'}"><span>${String(i+1).padStart(2,'0')}</span><small>Imagine concept</small></button>`).join('')}</div>`
}
function faqMarkup() {
  return `<div class="faq-list">${faqs.map(([q,a],i)=>`<details ${i===0?'open':''}><summary><span>${String(i+1).padStart(2,'0')}</span>${q}</summary><p>${a}</p></details>`).join('')}</div>`
}

const home = page({title:'Răgaz 17 | Proiect concept de retreat montan',description:'Răgaz 17 este un proiect concept de cabană boutique și retreat montan, prezentat într-un format editorial.',content:`
<section class="hero" aria-labelledby="hero-title"><img src="/images/ragaz-hero.webp" alt="Studiu vizual concept al cabanei Răgaz 17, volum din lemn și piatră între forme montane" width="1600" height="1100" fetchpriority="high"><div class="hero-overlay">${badge('Imagine concept')}<div class="hero-copy"><p class="eyebrow light">Răgaz 17</p><h1 id="hero-title">Mai puțin program.<br>Mai mult loc.</h1><p>Un studiu de cabană boutique construit în jurul luminii, materialelor și ritmului unei zile la munte.</p><a href="/rezervare/" class="button button-light">Verifică sejurul</a></div><p class="hero-caption">Proiect concept fictiv. Proprietatea și vizualurile nu reprezintă o unitate de cazare reală.</p></div></section>
${bookingStrip()}
<section class="section section-intro-block">${sectionHeading('01','Ideea','O casă care nu cere atenție permanentă','Arhitectura rămâne calmă, iar experiența se construiește din lucruri concrete: cum cade lumina, cum se simte lemnul, unde se așază corpul după mers.')}${editorialStory({image:'/images/window-forest.webp',number:'01.1',eyebrow:'Spațiu',title:'Privirea merge înaintea obiectelor',body:'<p>Interiorul este redus la piese esențiale. Ferestrele, muchiile și diferențele de textură țin locul unei decorări insistente.</p><p>Răgaz 17 nu descrie o proprietate reală. Este un exercițiu de identitate, conținut și produs digital pentru hospitality.</p>'})}</section>
<section class="section section-stays">${sectionHeading('02','Cazare concept','Trei moduri de a locui același material','Unități demonstrative, fără tarife comerciale, capacități sau disponibilitate reală.')}${stayCards()}<a class="text-link centered-link" href="/cazare/">Vezi toate detaliile de cazare</a></section>
<section class="section section-day">${sectionHeading('03','24 de ore','O zi care se schimbă prin lumină','Niciun program obligatoriu, doar o succesiune editorială de momente și materiale.')}${timelineMarkup()}</section>
<section class="section">${sectionHeading('04','Selecție vizuală','Galerie statică','Imaginile sunt afișate direct în pagină, fără ferestre suprapuse.')}${galleryMarkup(6)}<a class="text-link centered-link" href="/galerie/">Deschide galeria completă</a></section>
<section class="closing-cta"><div><p class="eyebrow light">Următorul pas</p><h2>Alege datele. Restul rămâne o solicitare.</h2></div><div><p>Fără presiune, fără numărătoare inversă, fără disponibilitate inventată.</p><a href="/rezervare/" class="button button-light">Verifică sejurul</a></div></section>`})

const cazare = page({title:'Cazare concept | Răgaz 17',description:'Unități de cazare concept pentru Răgaz 17, cu accent pe materiale, lumină și relația cu natura.',current:'/cazare/',preload:'/images/interior-light.webp',content:`${pageHero('Cazare','Camere desenate din material spre lumină','Trei unități concept, prezentate ca studiu de atmosferă și funcționare, nu ca ofertă comercială.','/images/interior-light.webp')}<section class="section">${sectionHeading('01','Unități concept','Fără preț fictiv. Fără capacitate fictivă.','Datele de mai jos sunt demonstrative și descriu doar direcția de design.')}${stayCards()}</section><section class="materials-band"><div><span>01</span><strong>Lemn</strong><p>Suprafețe mate, muchii vizibile, tonuri care pot suporta patină.</p></div><div><span>02</span><strong>Piatră</strong><p>Masă vizuală, temperatură rece, contrast cu textilele și lumina caldă.</p></div><div><span>03</span><strong>Textil</strong><p>Țesături vizibile și culori stinse, fără ornament care domină spațiul.</p></div></section><section class="section narrow-section"><h2 class="large-quote">„Camera nu trebuie să spună tot. Uneori e suficient să lase loc.”</h2><p class="demo-note">Text editorial de concept, nu citat atribuit unei persoane reale.</p></section>`})
const experienta = page({title:'Experiență | 24 de ore la Răgaz 17',description:'O zi editorială la un retreat montan concept, de la lumina dimineții la ritmul serii.',current:'/experienta/',preload:'/images/forest-path.webp',content:`${pageHero('Experiență','24 de ore, fără listă de bifat','O structură de zi în care lumina, mersul, masa și întoarcerea în interior dau ritmul.','/images/forest-path.webp')}<section class="section">${sectionHeading('01','Ritmul zilei','Dimineața schimbă camera. Seara o reduce.','Secvențele sunt editoriale și nu presupun servicii, ghizi sau activități comerciale reale.')}${timelineMarkup()}</section><section class="section">${editorialStory({image:'/images/table-materials.webp',number:'02',eyebrow:'Masa',title:'Mai puține obiecte, mai multă textură',reverse:true,body:'<p>În locul unei liste inventate de restaurante sau produse locale, experiența rămâne la nivel de gest: masă, ceramică, lemn, lumină.</p>'})}</section>`})
const zona = page({title:'Zona | Răgaz 17',description:'Repere orientative pentru o cazare în natură, fără adresă, coordonate sau business-uri locale inventate.',current:'/zona/',preload:'/images/forest-path.webp',content:`${pageHero('Zona','Repere fără coordonate inventate','Această pagină descrie tipuri de locuri și senzații spațiale, nu o destinație reală.','/images/forest-path.webp')}<section class="section">${sectionHeading('01','Ghid orientativ','Patru repere pentru un ritm montan','Nu sunt indicate distanțe, localități, business-uri, trasee oficiale sau timpi de condus.')}<div class="area-guide">${[['01','Pădure','Un reper de atmosferă: mers pe teren natural, umbră, miros de lemn umed și schimbări rapide de lumină.'],['02','Apă','O posibilă oprire în apropierea unui curs de apă, fără a indica un punct real sau coordonate fictive.'],['03','Sat','Relația cu un sat montan este tratată doar ca scenariu editorial, fără nume de localitate sau afaceri inventate.'],['04','Drum','Accesul este prezentat ca parte a ritmului călătoriei, nu ca instrucțiune reală de navigație.']].map(([n,t,x])=>`<article><span>${n}</span><h3>${t}</h3><p>${x}</p></article>`).join('')}</div></section><section class="section">${editorialStory({image:'/images/exterior-dim.webp',number:'02',eyebrow:'Acces',title:'Drumul face parte din schimbarea de ritm',body:'<p>Un proiect hospitality poate trata sosirea ca pe o secvență de tranziție. Aici nu există însă instrucțiuni reale, adresă sau hartă, tocmai pentru a evita construirea unei geografii fictive.</p>'})}</section>`})
const galeriePage = page({title:'Galerie | Răgaz 17',description:'Galerie accesibilă cu imagini concept pentru Răgaz 17, fără slideshow automat.',current:'/galerie/',preload:'/images/window-forest.webp',content:`${pageHero('Galerie','Material, lumină, distanță','O selecție de imagini concept pentru aceeași proprietate fictivă, fără slideshow automat.','/images/window-forest.webp')}<section class="section">${sectionHeading('01','Colecție','Deschide doar ceea ce vrei să vezi','Parcurge imaginile direct în pagină, fără ferestre suprapuse.')}${galleryMarkup()}</section>`})
const jurnal = page({title:'Jurnal | Răgaz 17',description:'Note editoriale despre materiale, lumină, spațiu și ritmul unei cabane boutique concept.',current:'/jurnal/',preload:'/images/journal-still.webp',content:`${pageHero('Jurnal','Note despre cum se simte un spațiu','Texte scurte despre materialitate, lumină și ritmul unei șederi în natură.','/images/journal-still.webp')}<section class="section journal-list">${journal.map(([n,t,x,img],i)=>editorialStory({image:img,number:n,eyebrow:'Notă editorială',title:t,reverse:i%2===1,body:`<p>${x}</p>`})).join('')}</section>`})
const intrebari = page({title:'Întrebări | Răgaz 17',description:'Răspunsuri despre caracterul fictiv al proiectului, imagini concept și formularul demonstrativ de disponibilitate.',current:'/intrebari/',preload:'/images/stone-detail.webp',content:`${pageHero('Întrebări','Clar, înainte de orice solicitare','Ce este real, ce este demonstrativ și ce nu pretinde acest website.','/images/stone-detail.webp')}<section class="section faq-section">${sectionHeading('01','FAQ','Cinci răspunsuri fără ambiguitate','Proiectul nu folosește review-uri, ratinguri, premii, presă sau disponibilitate fictivă.')}${faqMarkup()}</section>`})
const rezervare = page({title:'Solicită disponibilitate | Răgaz 17',description:'Formular demonstrativ pentru solicitarea unui sejur la proiectul concept Răgaz 17.',preload:'/images/exterior-dim.webp',content:`<section class="reservation-hero"><div>${badge('Formular demonstrativ')}<p class="eyebrow">Solicită disponibilitate</p><h1>Date, oameni, un mesaj.</h1><p>Interfața validează informațiile introduse, apoi afișează o confirmare locală. Nu există motor real de rezervări.</p></div><figure><img src="/images/exterior-dim.webp" alt="Exterior Răgaz 17, imagine concept" width="1600" height="1100" fetchpriority="high"><figcaption>Imagine concept</figcaption></figure></section><section class="section reservation-section"><div class="availability-layout"><form data-reservation-form class="reservation-form" novalidate><div class="availability-dates"><p class="eyebrow">Pasul 01</p><h2>Datele sejurului</h2><div class="booking-fields"><label><span>Check-in</span><input type="date" name="checkIn" required></label><label><span>Check-out</span><input type="date" name="checkOut" required></label><label><span>Oaspeți</span><select name="guests"><option value="1">1</option><option value="2" selected>2</option><option value="3">3</option><option value="4+">4+</option></select></label><button type="button" class="button button-dark" data-validate-dates>Validează datele</button></div></div><div class="contact-form"><p class="eyebrow">Pasul 02</p><h2 id="contact-details" tabindex="-1">Date de contact</h2><label><span>Nume</span><input name="name" autocomplete="name"></label><label><span>E-mail</span><input type="email" name="email" autocomplete="email"></label><label><span>Notă opțională</span><textarea name="note" rows="5" placeholder="Ce fel de sejur ai în minte?"></textarea></label><button class="button button-dark" data-finish-reservation>Finalizează demonstrația</button><p class="privacy-note">Datele rămân doar în starea locală a acestei pagini și nu sunt trimise către un server.</p></div><p class="form-message" data-reservation-message role="status" hidden></p></form></div></section>`})
const notFound = page({title:'Pagina nu a fost găsită | Răgaz 17',description:'Pagina solicitată nu există în proiectul concept Răgaz 17.',content:`<section class="not-found"><p class="eyebrow">404</p><h1>Pagina s-a oprit aici.</h1><p>Ruta pe care ai deschis-o nu face parte din proiectul Răgaz 17.</p><a class="button button-dark" href="/">Înapoi la început</a></section>`})

const pages = [
  ['', home], ['cazare', cazare], ['experienta', experienta], ['zona', zona], ['galerie', galeriePage], ['jurnal', jurnal], ['intrebari', intrebari], ['rezervare', rezervare]
]
for (const [route, html] of pages) {
  const dir = route ? path.join(dist, route) : dist
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}
fs.writeFileSync(path.join(dist, '404.html'), notFound)
fs.copyFileSync(path.join(src, 'styles.css'), path.join(dist, 'styles.css'))
fs.copyFileSync(path.join(src, 'site.js'), path.join(dist, 'site.js'))
fs.copyFileSync(path.join(publicDir, 'robots.txt'), path.join(dist, 'robots.txt'))
fs.cpSync(path.join(publicDir, 'images'), path.join(dist, 'images'), { recursive: true })

console.log(`Build complet: ${pages.length} pagini + 404`)
console.log(`Output: ${dist}`)
