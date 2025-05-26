import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import {
    simulationVertexShader,
    simulationFragmentShader,
    renderVertexShader,
    renderFragmentShader,
} from './shaders.js';

document.addEventListener('DOMContentLoaded', () => {
    const DPR = Math.min(Math.round(window.devicePixelRatio || 1), 2)
    const scene = new THREE.Scene()
    const simScene = new THREE.Scene()

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true })
    renderer.setPixelRatio(DPR)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const mouse = new THREE.Vector2()
    let frame = 0

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: true });
    const textTexture = new THREE.CanvasTexture(canvas);
    textTexture.minFilter = THREE.LinearFilter;
    textTexture.magFilter = THREE.LinearFilter;
    textTexture.format = THREE.RGBAFormat;

    const createRenderTargets = (w, h) => {
    const options = {
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        stencilBuffer: false,
        depthBuffer: false,
    }
    return [
        new THREE.WebGLRenderTarget(w, h, options),
        new THREE.WebGLRenderTarget(w, h, options),
        ]
    }
    let rtA
    let rtB

    const simMaterial = new THREE.ShaderMaterial({
        uniforms: {
            textureA: { value: null },
            mouse: { value: mouse },
            resolution: { value: new THREE.Vector2() },
            time: { value: 0.0 },
            frame: { value: 0 },
        },
        vertexShader: simulationVertexShader,
        fragmentShader: simulationFragmentShader,
    })

    const renderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            textureA: { value: null },
            textureB: { value: textTexture },
        },
        vertexShader: renderVertexShader,
        fragmentShader: renderFragmentShader,
        transparent: true,
    })

    const plane = new THREE.PlaneGeometry(2, 2)
    const simQuad = new THREE.Mesh(plane, simMaterial)
    const renderQuad = new THREE.Mesh(plane, renderMaterial)

    simScene.add(simQuad)
    scene.add(renderQuad)

    function drawTextToCanvas(w, h) {
        canvas.width = w;
        canvas.height = h;
        ctx.fillStyle = '#000407';
        ctx.fillRect(0, 0, w, h);

        textTexture.needsUpdate = true;
    }

    function handleResize() {
        const w = window.innerWidth * DPR;
        const h = window.innerHeight * DPR;
    
        renderer.setSize(window.innerWidth, window.innerHeight);
        [rtA, rtB] = createRenderTargets(w, h);
        simMaterial.uniforms.resolution.value.set(w, h);
        drawTextToCanvas(w, h);
      }
    
      handleResize()
    
      let resizeTimeout
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(handleResize, 100)
      })

      window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX * DPR
        mouse.y = (window.innerHeight - event.clientY) * DPR
    })
    
    window.addEventListener('mouseleave', () => {
        mouse.set(0, 0)
    })

    const animate = () => {
        simMaterial.uniforms.frame.value = frame++
        simMaterial.uniforms.time.value = performance.now() / 1000
        simMaterial.uniforms.textureA.value = rtA.texture

        renderer.setRenderTarget(rtB)
        renderer.render(simScene, camera)

        renderMaterial.uniforms.textureA.value = rtB.texture
        renderMaterial.uniforms.textureB.value = textTexture
        renderer.setRenderTarget(null)
        renderer.render(scene, camera)

        const temp = rtA
        rtA = rtB
        rtB = temp

        requestAnimationFrame(animate)
    }

    animate()
})



