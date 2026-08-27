// Lightweight scroll-reveal directive: v-reveal="'up'" | "'left'" | "'right'" | "'scale'"
// Adds base classes + toggles `is-visible` when the element enters the viewport.
// Respects prefers-reduced-motion (handled globally in style.css, but we also
// skip observing entirely to save work on low-power devices).

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const observer =
  typeof window !== 'undefined' && !prefersReducedMotion
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      )
    : null

export const revealDirective = {
  mounted(el, binding) {
    const variant = binding.value || 'up'
    el.classList.add('reveal', `reveal-${variant}`)
    if (prefersReducedMotion || !observer) {
      el.classList.add('is-visible')
      return
    }
    observer.observe(el)
  },
  unmounted(el) {
    if (observer) observer.unobserve(el)
  }
}
