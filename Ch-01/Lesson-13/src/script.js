import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
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
const fontLoader = new FontLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/1.png');

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font)=>{
        const textGeometry = new TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const text = new THREE.Mesh(textGeometry, textMaterial)
        /*
        textGeometry.computeBoundingBox();
        //without calling the computeBoundingBox first, textGeometry.boundingBox will not be available
        // The result is an object called Box3 that has a min property and a max property. The min property isn't at 0 as we could have expected. That is due to the bevelThickness and bevelSize.
        textGeometry.translate(
            - (textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
            - (textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
            - (textGeometry.boundingBox.max.z - 0.03) * 0.5  // Subtract bevel thickness
        )
        */
        textGeometry.center()


        //optimized
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        // further optimized since donut and text material are the same
        // const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        for(let i = 0; i < 100; i++)
        {
            // const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
            // const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
            const donut = new THREE.Mesh(donutGeometry, textMaterial)
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            // we need to use the same value for all 3 axes (x, y, z) in case of scale randomness
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)
            scene.add(donut)
        }
        scene.add(text)
    }
)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()