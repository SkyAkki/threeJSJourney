import * as THREE from 'three'
import { TorusGeometry } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

//env map cube loader
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial({map: doorColorTexture});
// const material = new THREE.MeshNormalMaterial();
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

const material = new THREE.MeshStandardMaterial();
// Mesh Standard Material supports light so it wont be visible without it
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


const sphereGeometry = new THREE.SphereGeometry(0.5,64,64);
const planeGeometry = new THREE.PlaneGeometry(1,1,100,100);
const sphereMesh = new THREE.Mesh(sphereGeometry,material);
const planeMesh = new THREE.Mesh(planeGeometry, material);
const torusMesh = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.2,64,128), material);
planeMesh.position.x = 1.5;
torusMesh.position.x = -1.5;

/*
// MESH STANDARD MATERIAL MAPS
material.map = doorColorTexture
// Occlusion map require another set of uv coordinates
// Three js require the new attributes to be named as 'uv2' in order to place ambient occlusion on the texture 
// for our purpose the uv2 coordinates are same as uv.array in the geometry so we duplicate them
// they are the same set beacuse we want the ambient occlusion map to be applied the same way as the door color texture
console.log(planeMesh.geometry.attributes)
sphereMesh.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphereMesh.geometry.attributes.uv.array, 2));
planeMesh.geometry.setAttribute('uv2', new THREE.BufferAttribute(planeMesh.geometry.attributes.uv.array, 2));
torusMesh.geometry.setAttribute('uv2', new THREE.BufferAttribute(torusMesh.geometry.attributes.uv.array, 2));
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
//Displacement map
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.05;
//Metalness and roughness
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
//Normal map
material.normalMap = doorNormalTexture
material.normalScale.set(0.5, 0.5)
//alpha map
material.transparent = true
material.alphaMap = doorAlphaTexture
*/


// Env Maps
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture


scene.add(sphereMesh,planeMesh, torusMesh);

/**
 * Debug
 */
const gui = new dat.GUI()
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(1).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)
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

    // Update objects
    sphereMesh.rotation.y = 0.1 * elapsedTime
    planeMesh.rotation.y = 0.1 * elapsedTime
    torusMesh.rotation.y = 0.1 * elapsedTime

    sphereMesh.rotation.x = 0.15 * elapsedTime
    planeMesh.rotation.x = 0.15 * elapsedTime
    torusMesh.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()