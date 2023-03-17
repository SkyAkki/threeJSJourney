import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particlesTexture = textureLoader.load('/textures/particles/2.png')

/* 
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 20000
const positions = new Float32Array(count * 3) //1D array storing the x,y,z of 20000 point so its length will be count * 3
const colors = new Float32Array(count * 3) //because a pixel color is composed of r,g,b values

for (let i =0; i<count * 3; i++){
    positions[i] = (Math.random() - 0.5) * 10; //to make it appear like the camera is in the middle
    colors[i] = Math.random()
}
//Buffer Geometry requries a buffer attribute
particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3) //group 3 values for each vertex
)
particlesGeometry.setAttribute(
    'color', //name that is used inside the shaders of the material
    new THREE.BufferAttribute(colors, 3)
)

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true, //Particle far from camera will be bigger and closer to camera will be smaller
})
// particlesMaterial.color = new THREE.Color('#ff88cc')
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particlesTexture;
// particlesMaterial.alphaTest = 0.01
// particlesMaterial.depthTest = false;
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending
particlesMaterial.vertexColors = true
// Points
const particles = new THREE.Points(particlesGeometry,particlesMaterial)
scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Particles
    // particles.rotation.y = elapsedTime * 0.1
    for (let i=0; i<count; i++ ){
        let i3 = i*3;
        let x = particlesGeometry.attributes.position.array[i3] //i3 to access x
        particlesGeometry.attributes.position.array[i3+1] = Math.sin(elapsedTime + x) //i3+1 to access y
        // adding x to apply an offset to the sinus between the particles so that we get that wave shape.
    }
    particlesGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()