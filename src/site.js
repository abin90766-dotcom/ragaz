(() => {
  const body = document.body
  const menuButton = document.querySelector('[data-menu-button]')
  const mobileMenu = document.querySelector('[data-mobile-menu]')
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true'
      menuButton.setAttribute('aria-expanded', String(!open))
      menuButton.querySelector('span').textContent = open ? 'Meniu' : 'Închide'
      mobileMenu.hidden = open
    })
  }

  const validateDates = (form) => {
    const checkIn = form.querySelector('[name="checkIn"]')?.value || ''
    const checkOut = form.querySelector('[name="checkOut"]')?.value || ''
    if (!checkIn || !checkOut) return { ok: false, message: 'Selectează ambele date.' }
    if (checkOut <= checkIn) return { ok: false, message: 'Data de check-out trebuie să fie după check-in.' }
    return { ok: true, checkIn, checkOut, guests: form.querySelector('[name="guests"]')?.value || '2' }
  }

  document.querySelectorAll('[data-booking-strip]').forEach(form => {
    const message = form.querySelector('[data-form-message]')
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      const result = validateDates(form)
      if (!result.ok) {
        message.hidden = false
        message.className = 'form-message error'
        message.textContent = result.message
        return
      }
      const button = form.querySelector('button[type="submit"]')
      const label = button.textContent
      button.disabled = true
      button.textContent = 'Se validează…'
      window.setTimeout(() => {
        const qs = new URLSearchParams({ checkIn: result.checkIn, checkOut: result.checkOut, guests: result.guests })
        window.location.href = `/rezervare/?${qs.toString()}`
        button.disabled = false
        button.textContent = label
      }, 450)
    })
  })

  const reservation = document.querySelector('[data-reservation-form]')
  if (reservation) {
    const params = new URLSearchParams(window.location.search)
    ;['checkIn', 'checkOut', 'guests'].forEach(name => {
      const field = reservation.querySelector(`[name="${name}"]`)
      if (field && params.get(name)) field.value = params.get(name)
    })
    const dateButton = reservation.querySelector('[data-validate-dates]')
    const submitButton = reservation.querySelector('[data-finish-reservation]')
    const message = reservation.querySelector('[data-reservation-message]')
    const contactTitle = document.getElementById('contact-details')
    let datesValid = false

    dateButton?.addEventListener('click', () => {
      const result = validateDates(reservation)
      if (!result.ok) {
        datesValid = false
        message.hidden = false
        message.className = 'form-message error'
        message.textContent = result.message
        return
      }
      dateButton.disabled = true
      dateButton.textContent = 'Se validează…'
      window.setTimeout(() => {
        datesValid = true
        message.hidden = false
        message.className = 'form-message success'
        message.textContent = 'Datele au fost validate local. Completează Pasul 02.'
        dateButton.disabled = false
        dateButton.textContent = 'Date validate'
        contactTitle?.focus()
      }, 500)
    })

    reservation.addEventListener('submit', (event) => {
      event.preventDefault()
      if (!datesValid) {
        message.hidden = false
        message.className = 'form-message error'
        message.textContent = 'Validează mai întâi datele sejurului din Pasul 01.'
        return
      }
      const name = reservation.querySelector('[name="name"]')?.value.trim() || ''
      const email = reservation.querySelector('[name="email"]')?.value.trim() || ''
      if (!name || !email.includes('@')) {
        message.hidden = false
        message.className = 'form-message error'
        message.textContent = 'Completează numele și o adresă de e-mail validă pentru demonstrație.'
        return
      }
      submitButton.disabled = true
      submitButton.textContent = 'Se procesează…'
      window.setTimeout(() => {
        reservation.parentElement.innerHTML = `
          <div class="success-panel" role="status">
            <span class="success-mark" aria-hidden="true">✓</span>
            <p class="eyebrow">Demonstrație finalizată</p>
            <h2>Formularul funcționează.</h2>
            <p>Nicio solicitare nu a fost transmisă. Răgaz 17 este un Proiect concept și nu are disponibilitate reală.</p>
            <a class="text-link" href="/">Înapoi la început</a>
          </div>`
      }, 650)
    })
  }

  const galleryButtons = [...document.querySelectorAll('[data-gallery-item]')]
  if (galleryButtons.length) {
    let index = 0
    let previousFocus = null
    const backdrop = document.createElement('div')
    backdrop.className = 'lightbox-backdrop'
    backdrop.hidden = true
    backdrop.innerHTML = `
      <div class="lightbox" role="dialog" aria-modal="true" aria-label="Galerie imagine concept">
        <div class="lightbox-toolbar"><span data-lightbox-count></span><button data-lightbox-close aria-label="Închide galeria">Închide</button></div>
        <figure><img data-lightbox-image width="1600" height="1100" alt=""><figcaption data-lightbox-caption></figcaption></figure>
        <div class="lightbox-controls"><button data-lightbox-prev>Anterior</button><button data-lightbox-next>Următor</button></div>
      </div>`
    body.appendChild(backdrop)
    const dialog = backdrop.querySelector('.lightbox')
    const closeButton = backdrop.querySelector('[data-lightbox-close]')
    const image = backdrop.querySelector('[data-lightbox-image]')
    const caption = backdrop.querySelector('[data-lightbox-caption]')
    const count = backdrop.querySelector('[data-lightbox-count]')

    const render = () => {
      const button = galleryButtons[index]
      image.src = button.dataset.src
      image.alt = button.dataset.caption
      caption.textContent = button.dataset.caption
      count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(galleryButtons.length).padStart(2, '0')}`
    }
    const close = () => {
      backdrop.hidden = true
      body.classList.remove('no-scroll')
      previousFocus?.focus?.()
    }
    const open = (i) => {
      index = i
      previousFocus = document.activeElement
      render()
      backdrop.hidden = false
      body.classList.add('no-scroll')
      closeButton.focus()
    }
    const change = (direction) => {
      index = (index + direction + galleryButtons.length) % galleryButtons.length
      render()
    }
    galleryButtons.forEach((button, i) => button.addEventListener('click', () => open(i)))
    closeButton.addEventListener('click', close)
    backdrop.querySelector('[data-lightbox-prev]').addEventListener('click', () => change(-1))
    backdrop.querySelector('[data-lightbox-next]').addEventListener('click', () => change(1))
    backdrop.addEventListener('mousedown', e => { if (e.target === backdrop) close() })
    document.addEventListener('keydown', event => {
      if (backdrop.hidden) return
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') change(1)
      if (event.key === 'ArrowLeft') change(-1)
      if (event.key === 'Tab') {
        const focusables = [...dialog.querySelectorAll('button')]
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    })
  }

  const today = new Date().toISOString().slice(0, 10)
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.min = today
    if (input.name === 'checkIn') {
      input.addEventListener('change', () => {
        const form = input.form
        const out = form?.querySelector('[name="checkOut"]')
        if (out) out.min = input.value || today
      })
    }
  })
})()
