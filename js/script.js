document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn')
  const mobileMenu = document.querySelector('.mobile-menu')

  mobileMenuBtn.addEventListener('click', function () {
    this.classList.toggle('active')
    mobileMenu.classList.toggle('active')
  })

  const mobileLinks = document.querySelectorAll('.mobile-menu a')
  mobileLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileMenuBtn.classList.remove('active')
      mobileMenu.classList.remove('active')
    })
  })

  const indicators = document.querySelectorAll('.indicator')
  const cards = document.querySelectorAll('.depoimento-card')
  let currentIndex = 0

  function showSlide(index) {
    cards.forEach(card => card.style.display = 'none')
    indicators.forEach(indicator => indicator.classList.remove('active'))

    cards[index].style.display = 'block'
    indicators[index].classList.add('active')
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index
      showSlide(currentIndex);
    })
  })

  setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length
    showSlide(currentIndex)
  }, 5000)

  showSlide(currentIndex)

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const targetId = this.getAttribute('href')
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        })
      }
    })
  })

  const slider = document.querySelector('.clientes-slider')
  const sliderItems = slider.innerHTML
  slider.innerHTML += sliderItems
})