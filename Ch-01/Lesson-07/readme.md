# Chapter-01: Basics

## Lesson-06: Animations

### Types Of Cameras
1. CAMERA CLASS: The Camera class is what we call an abstract class. You're not supposed to use it directly, but you can inherit from it to have access to common properties and methods.

2. ArrayCamera: The ArrayCamera is used to render your scene multiple times by using multiple cameras. Each camera will render a specific area of the canvas. You can imagine this looking like old school console multiplayer games where we had to share a split-screen.

3. StereoCamera: The StereoCamera is used to render the scene through two cameras that mimic the eyes in order to create what we call a parallax effect that will lure your brain into thinking that there is depth. You must have the adequate equipment like a VR headset or red and blue glasses to see the result.

4. CubeCamera: The CubeCamera is used to get a render facing each direction (forward, backward, leftward, rightward, upward, and downward) to create a render of the surrounding. You can use it to create an environment map for reflection or a shadow map. We'll talk about those later.

### Perspective Camera
Renders perspective and designed to mimic the way human eyes see.
1. The first parameter called field of view corresponds to your camera view's vertical amplitude angle in degrees. If you use a small angle, you'll end up with a long scope effect, and if you use a wide-angle, you'll end up with a fish eye effect because, in the end, what the camera sees will be stretched or squeezed to fit the canvas.
2. The second parameter is called aspect ratio and corresponds to the width divided by the height. While you might think that it's obviously the canvas width by the canvas height and Three.js should calculate it by itself, it's not always the case if you start using Three.js in very specific ways.
3. The third and fourth parameters called near and far, correspond to how close and how far the camera can see. Any object or part of the object closer to the camera than the near value or further away from the camera than the far value will not show up on the render.
> This can cause *z-fighting bug*, where  two faces seem to fight for which one will be rendered above the other.

### Orthographic Camera
The OrthographicCamera is used to create orthographic renders of your scene without perspective. It's useful if you make an RTS game like Age of Empire. Elements will have the same size on the screen regardless of their distance from the camera.
1. Instead of a field of view, you must provide how far the camera can see in each direction (left, right, top and bottom). Then you can provide the near and far values just like we did for the PerspectiveCamera.

### Custom Controls
*Axes movements may seem kind of wrong. This is due to the position.y axis being positive when going upward in Three.js but the clientY axis being positive when going downward in the webpage.*

### Build-in Controls
1. DeviceOrientationControls: will automatically retrieve the device orientation if your device, OS, and browser allow it and rotate the camera accordingly. You can use it to create immersive universes or VR experiences if you have the right equipment.
2. FlyControls: enable moving the camera like if you were on a spaceship. You can rotate on all 3 axes, go forward and go backward.
3. FirstPersonControls: is just like FlyControls, but with a fixed up axis. You can see that like a flying bird view where the bird cannot do a barrel roll. While the FirstPersonControls contains "FirstPerson," it doesn't work like in FPS games.
4. PointerLockControls: uses the pointer lock JavaScript API. This API hides the cursor, keeps it centered, and keeps sending the movements in the mousemove event callback. With this API, you can create FPS games right inside the browser. While this class sounds very promising if you want to create that kind of interaction, it'll only handle the camera rotation when the pointer is locked. You'll have to handle the camera position and game physics by yourself.
5. OrbitControls: is very the most useful. You can rotate around a point with the left mouse, translate laterally using the right mouse, and zoom in or out using the wheel.
6. TrackballControls: is just like OrbitControls but there are no limits in terms of vertical angle. You can keep rotating and do spins with the camera even if the scene gets upside down.
7. *TransformControls*: has nothing to do with the camera. You can use it to add a gizmo to an object to move that object.
8. *DragControls*: has nothing to do with the camera. You can use it to move objects on a plane facing the camera by drag and dropping them.


### OrbitControls
1. The OrbitControls class is part of those classes that are not available by default in the THREE variable. That decision helps to reduce the weight of the library.
2. The OrbitControls class may not be available in the THREE variable; it is still located in the dependencies folder. To import it, you must provide the path from inside the /node_modules/ folder, which is /three/examples/jsm/controls/OrbitControls.js
3. For it to work, you must provide the camera and the element in the page that will handle the mouse events as parameters
4. *Damping*: The damping will smooth the animation by adding some kind of acceleration and friction formulas.