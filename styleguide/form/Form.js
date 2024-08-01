export default class BSPForm extends HTMLElement {
  connectedCallback() {
    this.cacheElements()
    if (!this.form) return
    this.init()
  }

  cacheElements() {
    this.form = this.querySelector('form')
    this.inputs = this.form?.elements
  }

  init() {
    let timeout = null
    // on Keyup
    this.form.addEventListener(
      'keyup',
      (evt) => {
        clearTimeout(timeout)
        this.setAttribute('invalid-form', 'false')
        timeout = setTimeout(() => {
          this.validateField(evt.target)
        }, 1000)
      },
      true
    )

    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this.setAttribute('invalid-form', 'false')
      Array.from(this.querySelector('form').elements).forEach((input) => {
        this.validateField(input)
      })
      // if form is valid, submit
      if (this.getAttribute('invalid-form') === 'false') {
        this.form.submit()
      }
    })
  }

  validateField(el) {
    el.parentElement.parentElement.removeAttribute('data-invalid')
    const validity = el.validity
    if (validity.valid) {
      return
    }
    el.reportValidity()
    this.setAttribute('invalid-form', 'true')
    el.parentElement.parentElement.setAttribute('data-invalid', 'true')
  }

  disconnectedCallback() {
    return false
  }
}
