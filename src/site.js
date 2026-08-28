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
