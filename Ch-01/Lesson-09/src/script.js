import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
/*
6 parameters of box geometry
Last three includes the segment information
Subdivisions correspond to how much triangles should compose the face. By default it's 1, meaning that there will only be 2 triangles per face. If you set the subdivision to 2, you'll end up with 8 triangles per face.
To see the subdivision set the wireframe:true to our material.
const geometry = new THREE.BoxGeometry(1, 1, 1,2,2,2)
const geometry = new THREE.SphereGeometry(1, 32, 32)
*/

// Buffer Geometry
/*
<-------- Filling Array Manually -------->
const arrayPositions = new Float32Array(9);

arrayPositions[0] = 0;
arrayPositions[1] = 0;
arrayPositions[2] = 0;

arrayPositions[3] = 1;
arrayPositions[4] = 0;
arrayPositions[5] = 0;

arrayPositions[6] = 0;
arrayPositions[7] = 1;
arrayPositions[8] = 0;

// The array is a one-dimensional array where you specify the x, y, and z of the first vertex, followed by the x, y, and z of the second vertex, and so on.
const arrayPositions = new Float32Array(
    0, 0, 0,
    1, 0, 0,
    0, 1, 0
);
const positionsAttributes = new THREE.BufferAttribute(arrayPositions, 3);
*/


const count = 50;
const positionsArray = new Float32Array(50*3*3);
// 50 triangles, each triangle will have 3 verticles, and each vertex will be specifeid by 3 coordinate points (x,y,z).
for(let i=0; i<50*3*3; i++){
    positionsArray[i] = Math.random() - 0.5;
    // -0.5 to generate the triangles equally around the center
}
const positionsAttributes = new THREE.BufferAttribute(positionsArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position',positionsAttributes);
// We chose 'position' as the name because Three.js internal shaders will look for that value to position the vertices.

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)



// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
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