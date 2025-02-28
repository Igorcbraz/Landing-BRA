document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100,
    delay: 100
  })

  const counters = document.querySelectorAll('.stat-item h4');
  counters.forEach(counter => {
    const target = parseInt(counter.textContent)
    counter.textContent = '0'
    counter.dataset.target = target
    counter.classList.add('count-animate')
  })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.classList.contains('count-animate')) {
          animateCount(entry.target);
        }

        observer.unobserve(entry.target);
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.count-animate').forEach(el => { observer.observe(el) })

  function animateCount(counter) {
    const target = parseInt(counter.dataset.target)
    const duration = 2000
    const startTimestamp = performance.now()

    function step(timestamp) {
      const runtime = timestamp - startTimestamp
      const progress = Math.min(runtime / duration, 1)

      counter.textContent = '+' + Math.floor(progress * target)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        counter.textContent = '+' + target
        counter.classList.add('fade-in')
        setTimeout(() => {
          counter.classList.add('visible')
        }, 10)
      }
    }

    window.requestAnimationFrame(step)
  }

  setTimeout(() => {
    const visibleElements = document.querySelectorAll('.count-animate');
    visibleElements.forEach(el => {
      const rect = el.getBoundingClientRect()
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        el.classList.add('visible')

        if (el.classList.contains('count-animate')) {
          animateCount(el)
        }
      }
    })
  }, 300)
})