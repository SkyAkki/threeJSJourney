import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Custom Controls
// Dont need it for built-in controls
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove',(event)=>{
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = (event.clientY/ sizes.width - 0.5) * -1;
    // Dividing event.clientX by sizes.width will give us a value between 0 and 1 (if we keep the cursor above the canvas) while subtracting 0.5 will give you a value between - 0.5 and 0.5.

    // x-axis shows inverted control but we multiply by -1 in y-axis. This is because we should keep in mind that we are moving the camera here so the inverted behavious of the x-axis inversion is expected (since moving the camera to the right will make the object feel like it is on the left)
})

// Perspective Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 50)
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Built-in Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
// controls.target.y = 1;
// controls.update(); ------------> Telling the OrbitControls to update itself once. Damping require update each frame

// <-------------- Orthographic Camera -------------->
/*
<------------- The below code will stretch according to the size of the canvas ------------------>
const camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,100);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);
//This is because we are rendering a square area camera into a rectangle canvas. We need to use the canvas ratio.
*/
/*
<------------- Fix the above issue ------------------>
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(-1* aspectRatio,1 * aspectRatio,1,-1,0.1,100);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);
*/
// <--------------------------------------------->

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = elapsedTime;

    // Update Camera
    // <--------- Handled by OrbitControls when using built-in class ---------->
    // camera.position.x  = cursor.x;
    // camera.position.y = cursor.y;

    //Damping
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()