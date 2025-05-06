import './style.css'
import './script.js'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&?@'

function createNav() {
  const app = document.querySelector('#app')
  app.innerHTML = `
    <nav>
      <div class="nav-items" aria-hidden="true">
        <a class="logo-link" target="_blank" href="#home">s/s</a>
      </div>
      <div class="nav-items" aria-hidden="true">
        <a class="nav-item" href="#about">about</a>
        <a class="nav-item" href="#works">works</a>
        <a class="nav-item" href="#contact">contact</a>
      </div>
    </nav>
  `
}

function createContent() {
  const content = document.createElement('div');
  content.className = 'content';
  content.style.position = 'relative';
  content.style.marginTop = `${window.innerHeight}px`;
  content.innerHTML = `
    <div class="hero-overlay">
      <div class="hero-container">
        <span>i am</span>
        <p class="hero-text">steph</p>
        <p class="subtitle">// creative developer //</p>
      </div>
    </div>
  `;
  document.querySelector('#main').appendChild(content)
}

function createProjectsSection() {
  const stream = document.createElement('div')
  stream.className = 'projects-stream'

  for (let i = 0; i < 10; i++) {
    const card = document.createElement('div')
    card.className = 'project-card'
    card.innerHTML = `
      <div class="glitch-title">project ${i + 1}</div>
      <p class="glitch-desc">// description of project ${i + 1}</p>
    `;
    stream.appendChild(card);
  }
  document.querySelector('#main').appendChild(stream)
}

function animateProjectCards() {
  gsap.utils.toArray('.project-card').forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
    })
  })
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
  createContent()
  setupScrambleLinks()
  playSoundOnHover()
  createProjectsSection()
})
