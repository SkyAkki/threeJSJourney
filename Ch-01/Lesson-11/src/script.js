import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// ---------- One way to load image ---------------
// import imageSource from './color.jpg';
// But for this appraoch (for relative pathing to work) we will have to move all the images to the src folder
// Since we are using vite, we can do this another way
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Image
 */
/* <---------------- JAVASCRIPT WAY ---------------->
// const image = new Image();
// const texture = new THREE.Texture(image); <------- blank texture ------>
// image.onload = () =>
// {
//     texture.needsUpdate = true;  <-----IMPORTANT to load image into texture----->
// }
// image.src = '/textures/door/color.jpg';
// Vite allows us to load from directly inside ths static folder as well
*/

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () =>
{
    console.log('loading started')
}
loadingManager.onLoad = () =>
{
    console.log('loading finished')
}
loadingManager.onProgress = () =>
{
    console.log('loading progressing')
}
loadingManager.onError = () =>
{
    console.log('loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load('/textures/door/color.jpg',
    () =>
    {
        console.log('texture loading finished')
    },
    () =>
    {
        console.log('texture loading progressing')
    },
    () =>
    {
        console.log('texture loading error')
    }
)

/**
 * Transforming texture 
 */
texture.repeat.x = 2;
texture.repeat.y = 3;
// Texture will not repeat as its not set to repeat by default. Currently only the last pixels on of the texture will repeat and give a stretchy look. For this we will use THREE.RepeatWrapping constant on wrapS and wrapT properties to repeat the entire pattern
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// You can also alternate the direction with THREE.MirroredRepeatWrapping:
texture.wrapS = THREE.MirroredRepeatWrapping
texture.wrapT = THREE.MirroredRepeatWrapping
// You can offset the texture using the offset property that is also a Vector2 with x and y properties. Changing these will simply offset the UV coordinates:
texture.offset.x = 0.5
texture.offset.y = 0.5
// You can rotate the texture using the rotation property, which is a simple number corresponding to the angle in radians:
texture.rotation = Math.PI * 0.25
// If you want to change the pivot of that rotation, you can do it using the center property which is also a Vector2:
texture.center.x = 0.5
texture.center.y = 0.5

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({ map: texture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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