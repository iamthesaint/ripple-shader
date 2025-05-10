import './style.css'
import './script.js'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger)

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&?@'

function createNav() {
  const app = document.querySelector('#app')
  app.innerHTML = `
    <nav>
      <div class="nav-items"
        <a class="nav-item" target="_blank" href="#home">s/s</a>
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
  hero.className = 'content'
  hero.style.position = 'relative'
  hero.style.marginTop = '0'
  hero.innerHTML = `
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
  `
  document.body.appendChild(hero)
}

function createAboutSection() {
  const about = document.createElement('section');
  about.id = 'about';
  about.className = 'about-section';
  about.innerHTML = `
    <h1>About Me</h1>
    <p>
      Hello, I'm Steph. I'm a creative developer with a passion for taking complex ideas and turning them into interactive, visually stunning web applications. I thrive at the intersection of design and technology, where I can create beautiful and functional experiences for the user. I have a healthy appetite for education in all forms, so I enjoy exploring new techniques to add to my skill set. I continue to pursue personal projects, which I find the easiest and most effective way to grow as a developer.
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
    <p>Here is a showcase of my projects and creative work.</p>
  `;
  document.body.appendChild(works);
}

function createContactSection() {
  const contact = document.createElement('section');
  contact.id = 'contact';
  contact.className = 'contact-section';
  contact.innerHTML = `
    <h1>Contact Me</h1>
    <p>Feel free to reach out to me for collaborations or inquiries.</p>
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
      audio.volume = 0.5
      audio.playbackRate = 2.5
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

  gsap.to('.hero-overlay', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  })
})


