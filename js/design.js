//* Hamburguer
// const hamburger = document.querySelector('.hamburger')
// const headerBtn = document.querySelector('#header-btn')
// const siteNavigation = document.querySelector('.site-navigation')

// hamburger.addEventListener('click', (e) => {
//     hamburger.classList.toggle('is-active')

//     headerBtn.style.display =
//         window.getComputedStyle(headerBtn).display === 'none' ? 'block' : 'none'
//     siteNavigation.style.display =
//         window.getComputedStyle(siteNavigation).display === 'none' ? 'flex' : 'none'
// })

//* Go To Top
const goToTopButton = document.querySelector('#goToTop')
const introductionSection = document.querySelector('#introduction')

window.addEventListener('scroll', () => {    
    // Get the position of the introduction section
    const introSectionOffset = introductionSection.offsetTop
    const scrollPosition = window.scrollY || document.documentElement.scrollTop

    // Show the button after passing the section
    if (scrollPosition > introSectionOffset) {
        goToTopButton.classList.add('break')
    } else {
        goToTopButton.classList.remove('break')
    }
})

// Smooth scroll to the top when button is clicked
goToTopButton.addEventListener('click', (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

//* TABS
const tabs = document.querySelectorAll('.radio-tab')
const containers = document.querySelectorAll('.big-cards.container')

// Add event listeners to the tabs
tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
        const newSelectedSection = document.querySelector(`.big-cards#${e.target.id}`)
        const oldSelectedSection = document.querySelector('.big-cards.active-grid')

        oldSelectedSection.classList.remove('active-grid')
        newSelectedSection.classList.add('active-grid')
    })
})

//* Plan de acción
const timeline = document.querySelector('.timeline')
const timelineContainers = document.querySelectorAll('.timeline-container')

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show')
                timeline.classList.add('show-line')
                timeline.classList.remove('hide-line')
                observer.unobserve(entry.target)
            }
        })
    },
    {
        threshold: 0.8,
    }
)

timelineContainers.forEach((container) => {
    observer.observe(container)
})

window.addEventListener('scroll', () => {
    const timelineRect = timeline.getBoundingClientRect()
    const top = timelineRect.top
    const bottom = timelineRect.bottom

    if (top > window.innerHeight / 2 || bottom < window.innerHeight / 2) {
        timeline.classList.remove('show-line')
        timeline.classList.add('hide-line')
    } else {
        timeline.classList.add('show-line')
        timeline.classList.remove('hide-line')
    }
})

//* Cards
const cards = document.querySelectorAll('.card-carousel')
let currentIndex = 0

const updateCarousel = () => {
    cards.forEach((card, index) => {
        card.classList.remove('focused', 'left', 'right', 'hidden')

        if (index === currentIndex) {
            card.classList.add('focused')
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add('left')
        } else if (index === (currentIndex + 1) % cards.length) {
            card.classList.add('right')
        } else {
            card.classList.add('hidden')
        }
    })
}

// Initial State
updateCarousel()

// Make cards clickable
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        currentIndex = index // Set the clicked card as the focused one
        updateCarousel()
    })
})
