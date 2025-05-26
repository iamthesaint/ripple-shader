import './style.css'
import './script.js'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger)
let ambient = null
let isMuted = localStorage.getItem('isMuted') === 'true' || false
let heroFadeScrollTrigger

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&?@'

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

function createNav() {
  const app = document.querySelector('#app')
  app.innerHTML = `
  <nav id="main-nav" class="">
      <div class="nav-items">
        <a class="nav-item" href="#home">s/s</a>
      </div>
      <div class="nav-items">
        <a class="nav-item" href="#about">bio</a>
        <a class="nav-item" href="#works">works</a>
        <a class="nav-item" href="#contact">contact</a>
     </div>
  </nav>
`
}

function createMuteButton() {
  if (isMobile) return

  const muteButton = document.createElement('button')
  muteButton.id = 'mute-button'
  muteButton.innerText = isMuted ? 'sound on' : 'sound off'

  document.body.appendChild(muteButton)
  muteButton.addEventListener('click', () => {
    isMuted = !isMuted
    localStorage.setItem('isMuted', isMuted)
    muteButton.innerText = isMuted ? 'sound on' : 'sound off'
    if (ambient?.audio) {
      ambient.audio.muted = isMuted
    }
  })
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
        <p class="subtitle">creative developer</p>
      </div>
        <div class="scroll-indicator">
        <p class="vertical">scroll</p>
        </div>
      </div>
    </div>
  `
  document.body.appendChild(hero)
}


function setupHeroScrollFade() {
  heroFadeScrollTrigger = gsap.to('.hero-overlay', {
    opacity: 0,
    ease: 'power1.out',
    scrollTrigger: {
      id: 'heroFade',
      trigger: '#home',
      start: 'top top',
      end: '+=100%',
      scrub: true
    }
  })
}

function createAboutSection() {
  const about = document.createElement('section')
  about.id = 'about'
  about.className = 'about'
  about.innerHTML = `
    <h1>bio</h1>
    <p class="text" style="text-align: center;">
      Hello, I'm Steph. 
      <br />
\     <br />
      I'm a creative developer who loves turning complex ideas into interactive, visually stunning web applications.
      <br />
      I thrive at the intersection of design and technology where I can build beautiful, yet seamlessly functional experiences for the user.
      <br />
      My skill set is ever-evolving, and personal projects are my favorite way to grow as a developer.
      <br />
      I am currently specializing in building UI/UX with Three.js and WebGL using custom shaders and 3D models, but I have a vast subset of skills to apply to all forms of development.
      <br />
      <br />
      I am excited for what the future holds for me.
      <br />
    </p>
      <img src="/self.png" alt="self-portrait" class="self-portrait">
    <br />
    <br />
  `
  document.body.appendChild(about)
}

function createWorksSection() {
  const works = document.createElement('section')
  works.id = 'works'
  works.className = 'works-section'
  works.innerHTML = `
    <h1>projects</h1>
    <div class="projects">
      <p class="text">
      <a href="https://cloud-orpin-nine.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-link">
      custom cloudscape shader
      </a>
      <br />
      a custom shader built with 3js and webgl that gradually changes the cloudscape from sunny blue skies to a thunderstorm.
      <br />
      <br />
      <a href="https://r3f-portal-scene-omega.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-link">
      portal scene
      </a>
      <br />
      a blender model imported into a three.js scene with a custom-written portal shader for Three.js Journey.
      <br />
      <br />
      <a href="https://ocean-waves-shader.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-link">
      ocean waves custom shader
      </a>
      <br />
      a shader created with Three.js and WebGL to showcase the use of color and trigonometry, with a tool to adjust the variables. Shader was built as a study of reflection on a moving plane. Built in Three.js Journey course.
      <br />
      <br />
      <a class="project-link">
      ripple shader (portfolio backdrop)
      </a>
      <br />
      a custom shader based on the characteristics of water that follows the cursor, taking into account its speed and pressure.
      <br />
      <br />
      <a href="https://drive.google.com/file/d/14vvZvI6X_XuW56_AdUNzxYimx6lilbkO/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="project-link">
      snowman blender model (texture study)
      </a>
      <br />
      a snowman model made in blender to study the creation of various textures and materials using geometry nodes during a Ryan King Art course.
      <br />
      <br />
      <a href="https://drive.google.com/file/d/1IKaFk0sroN4rftFAgi09vD9Pw0C82dQ6/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="project-link">
      the obligatory blender donut
      </a>
      <br />
      a realistic donut model designed during a blender guru basics course.
      <br />
      <br />
      ...more projects coming soon
      </p>
        `
  document.body.appendChild(works)
}

function createContactSection() {
  const contact = document.createElement('section')
  contact.id = 'contact'
  contact.className = 'contact-section'
  contact.innerHTML = `
    <h1>contact</h1>
    <p class="text">let's work together.</p>
    <div class="socials">
    <a href="mailto:stephenie2@me.com" class="icon">
    <img src="/em.svg" alt="email" class="icon">
    </a>  
    <a href="https://github.com/iamthesaint" class="icon">
    <img src="/gh.svg" alt="github" class="icon">
    </a>
    <a href="https://www.linkedin.com/in/stephenie-st-hilaire/" class="icon">
    <img src="/li.svg" alt="linkedin" class="icon">
    </a>
    <a href="https://www.instagram.com/iamthesaint/" class="icon">
    <img src="/ig.svg" alt="instagram" class="icon">
    </a>
    <a href="https://drive.google.com/file/d/15RNjLZXmCrOIPWI2NvMTOfCMmzjPIKdW/view?usp=sharing" class="icon">
    <img src="/cv.svg" alt="cv" class="icon">
    </a>
    </div>
  `
  document.body.appendChild(contact)
}

function setupScrambleLinks() {
  const links = document.querySelectorAll('.nav-items a')

  const scramble = (e) => {
    const target = e.target.closest('.nav-items a')
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

  document.querySelectorAll('.nav-items a').forEach((link) => {
    link.addEventListener('pointerenter', () => {
      if (isMuted) return
      audio.currentTime = 0
      audio.volume = 0.2
      audio.playbackRate = 2
      audio.play()

    })
  })
}

function navLinkJump() {
  const navItems = document.querySelectorAll('.nav-item')

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault()
    
      const targetId = item.getAttribute('href').substring(1)
      const targetElement = document.getElementById(targetId)
    
      if (!targetElement) return
    
      if (!isMuted) {
        const audio = new Audio('/nav.wav')
        audio.currentTime = 0
        audio.volume = 0.3
        audio.playbackRate = 1
        audio.play()
      }

      if (targetId === 'home') {
        heroFadeScrollTrigger?.scrollTrigger?.kill()

        gsap.to('.hero-overlay', {
          opacity: 1,
          duration: 0.8,
          ease: 'power1.out',
          onComplete: () => {
            setupHeroScrollFade()
          }
        })
        ScrollTrigger.refresh()
      }

      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.pushState(null, '', `#${targetId}`)
    })
  })
}

    
function createOverlayForAudio(onUnlock) {
  const overlay = document.createElement('div')
  overlay.className = 'audio-overlay'
  overlay.id = 'audio-overlay'
  overlay.innerText =
    'tap anywhere to begin.'
  document.body.appendChild(overlay)

  const unlock = () => {
    onUnlock()

    overlay.style.opacity = '0'

    setTimeout(() => {
      overlay.style.display = 'none'
      overlay.remove()
    }, 500)

    overlay.removeEventListener('click', unlock)
    overlay.removeEventListener('keydown', unlock)
  }

  overlay.addEventListener('click', unlock)
  overlay.addEventListener('keydown', unlock)
}

function playLoop(audioFile, fadeIn = 2) {
  if (isMobile) return {
    stop: () => {}, audio: null }
  const audioContext = new (window.AudioContext || window.AudioContext)()
  const gainNode = audioContext.createGain()
  const audio = new Audio(audioFile)
  const track = audioContext.createMediaElementSource(audio)

  track.connect(gainNode).connect(audioContext.destination)
  gainNode.gain.setValueAtTime(0, audioContext.currentTime)
  audio.volume = 0.3
  audio.loop = true
  audio.muted = isMuted
  audio.play()

  
  gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + fadeIn)

  return {
    stop: (fadeOut = 2) => {
      const now = audioContext.currentTime
      gainNode.gain.cancelScheduledValues(now)
      gainNode.gain.setValueAtTime(gainNode.gain.value, now)
      gainNode.gain.linearRampToValueAtTime(0, now + fadeOut)
      setTimeout(() => {
        audio.pause()
        audio.currentTime = 0
        audioContext.close()
      }, fadeOut * 1000)
    },
    audio,
  }
}

function showNavOnScroll() {

  ScrollTrigger.create({
    trigger: '#about',
    start: 'top center',
    onEnter: () => {
      document.getElementById('main-nav')?.classList.add('visible')
    },
    onLeaveBack: () => {
      document.getElementById('main-nav')?.classList.remove('visible')
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const scramSound = new Audio('/flip.wav')
  const navSound = new Audio('/nav.wav')

  createNav()
  
  createOverlayForAudio(() => {

    scramSound.play().catch(() => {})
    navSound.play().catch(() => {})
    scramSound.pause()
    navSound.pause()
    scramSound.currentTime = 0
    navSound.currentTime = 0

    ambient = playLoop('/enter2.wav', 2)
    createMuteButton()


  createHero()
  createAboutSection()
  createWorksSection()
  createContactSection()

  setupScrambleLinks()
  playSoundOnHover(scramSound)
  navLinkJump()

  ScrollTrigger.refresh()

  showNavOnScroll()
  setupHeroScrollFade()

  })
})

window.addEventListener('load', () => {
  ScrollTrigger.refresh()
})





