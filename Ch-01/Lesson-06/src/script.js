import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


/* 
<------------------ METHOD 1 To achieve constant speed --------------------->
let time = Date.now();
const tick = () => {

    // Delta time for constant website speed regardless of machine framerate
    let currentTime = Date.now();
    let deltaTime = currentTime - time;
    // update 'time' for next tick call
    time = currentTime;

    // Transform the object
    mesh.rotation.y += 0.001 * deltaTime;
    // Draw the change again
    renderer.render(scene, camera)

    requestAnimationFrame(tick);
}
tick();
*/

/*
<------------------ Method 2 using THREE.js Clock class ------------------------>
const clock = new THREE.Clock();
const tick = () => {
    let elapsedTime = clock.getElapsedTime();

    mesh.position.y = Math.sin(elapsedTime);
    mesh.position.x = Math.cos(elapsedTime);
    
    renderer.render(scene,camera);
    requestAnimationFrame(tick)
}
tick();
*/

gsap.to(mesh.position, {duration: 1, delay:1, x:2});
gsap.to(mesh.position, {duration: 1, delay:2, x:0});
const tick = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}
tick();