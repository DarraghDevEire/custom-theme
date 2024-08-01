import { debounce } from '../util/Debounce.js'
import Flickity from 'flickity'

export default class Carousel extends HTMLElement {
  carouselSlides: HTMLElement | null = null
  flickity: Flickity | null = null

  connectedCallback() {
    this.carouselSlides = this.querySelector('[class$="-slides"]') || this

    const carouselOptions = {
      adaptiveHeight: false,
      imagesLoaded: true,
      pageDots: false,
      lazyLoad: 1,
    }

    this.flickity = new Flickity(this.carouselSlides, carouselOptions)

    this.flickity.on('staticClick', (event?: Event | null) => {
      if (event) {
        this.onStaticClick(event)
      }
    })

    window.addEventListener(
      'resize',
      debounce(
        50,
        () => {
          if (this.flickity) {
            this.flickity.resize()
          }
        },
        true
      )
    )
  }

  onStaticClick(event: Event) {
    this.dispatchEvent(
      new window.CustomEvent('Carousel:FlickityStaticClick', {
        detail: { event },
        bubbles: true,
      })
    )
  }

  disconnectedCallback() {
    if (this.flickity) {
      this.flickity.destroy()
    }
  }
}
