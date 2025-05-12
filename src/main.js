import './style.css'
import './script.js'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, ScrollToPlugin)

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&?@'

function createNav() {
  const app = document.querySelector('#app')
  app.innerHTML = `
  <nav>
      <div class="nav-items">
        <a class="nav-item" href="#home">s/s</a>
      </div>
      <div class="nav-items">
        <a class="nav-item" href="#about">about</a>
        <a class="nav-item" href="#works">works</a>
        <a class="nav-item" href="#contact">contact</a>
     </div>
  </nav>
`
}

function createHero() {
  const hero = document.createElement('div')
  hero.id = 'home'
  hero.className = 'content'
  hero.style.position = 'relative'
  hero.style.marginTop = '0'
  hero.innerHTML = `
  <div id="home">
    <div class="hero-overlay">
      <div class="hero-container">
        <span>i am</span>
        <p class="hero-text">steph</p>
        <p class="subtitle">// creative developer //</p>
      </div>
        <div class="scroll-indicator">
        <p class="vertical">scroll</p>
        </div>
      </div>
    </div>
  `
  document.body.appendChild(hero)
}

function createAboutSection() {
  const about = document.createElement('section');
  about.id = 'about';
  about.className = 'about';
  about.innerHTML = `
    <h1>About Me</h1>
    <p class="text">
      Hello, I'm Steph. 
      <br />
      <br />
      I'm a creative developer who loves turning complex ideas into interactive, visually stunning web applications.
      <br />
      I thrive at the intersection of design and technology, where I can build beautiful, yet seamlessly functional experiences for the user.
      <br />
      I enjoy exploring new techniques to add to my skill set - personal projects are my favorite way to do this. I am currently specializing in building UI/UX with Three.js and WebGL using custom shaders and 3D models, but I have a vast subset of skills to apply to all forms of development.
      <br />
      I am excited for what the future holds for me.
    </p>
  `;
  document.body.appendChild(about);
}

function createWorksSection() {
  const works = document.createElement('section');
  works.id = 'works';
  works.className = 'works-section';
  works.innerHTML = `
    <h1>My Works</h1>
    <p class="text">Here is a showcase of my projects and creative work.</p>
  `;
  document.body.appendChild(works);
}

function createContactSection() {
  const contact = document.createElement('section');
  contact.id = 'contact';
  contact.className = 'contact-section';
  contact.innerHTML = `
    <h1>contact</h1>
    <p class="text">let's work together.</p>

  `;
  document.body.appendChild(contact);
}

function setupScrambleLinks() {
  const links = document.querySelectorAll('a')

  const scramble = (e) => {
    const target = e.target.closest('a')
    if (
      target &&
      !gsap.isTweening(target) &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    ) {
      gsap.to(target, {
        duration: 0.8,
        ease: 'sine.in',
        scrambleText: {
          text: target.innerText,
          speed: 2,
          chars: defaultChars,
        },
      })
    }
  }

  links.forEach((link) => {
    link.addEventListener('pointerenter', scramble)
    link.addEventListener('focus', scramble)
  })
}

function playSoundOnHover() {
  const audio = new Audio('/flip.wav')

  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('pointerenter', () => {
      audio.currentTime = 0
      audio.volume = 0.2
      audio.playbackRate = 2
      audio.play()

    })
  })
}

function navLinkJump() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      const targetId = link.getAttribute('href')
      const target = document.querySelector(targetId)

      if (target) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: target, offsetY: 60 },
          ease: 'power2.out',
          onUpdate: ScrollTrigger.update,
          onComplete: () => {
            ScrollTrigger.refresh()
          }
        })
      }
    })
  })
}

function playSoundOnNavJump() {
  const audio = new Audio('/nav.wav')
  const navItems = document.querySelectorAll('.nav-item')

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      audio.currentTime = 0
      audio.volume = 0.3
      audio.playbackRate = 1
      audio.play()
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  createNav()
  createHero()
  createAboutSection()
  createWorksSection()
  createContactSection()
  setupScrambleLinks()
  playSoundOnHover()
  playSoundOnNavJump()
  navLinkJump()

  gsap.to('.hero-overlay', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about',
      start: 'top bottom',
      end: 'top top',
      scrub: true
    }
  })

  const sections = document.querySelectorAll('.text')
  sections.forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      }
    })
  })
})


