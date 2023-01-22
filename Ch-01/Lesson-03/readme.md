# Chapter-01: Baiscs

## Lesson-03: Basic Scene

### How to use Three.js
1. import the three.min.js file from threeJS bundle using <script> tag
2. check using *THREE* variable
    * The THREE variable contains most of the classes and properties you might need on a classic Three.js project. Unfortunately, not all classes are inside this variable, but we will see later how to access them.

### First Scene
We need 4 elements to get started:

1. A scene that will contain objects
    * The scene is like a container. You place your objects, models, particles, lights, etc. in it, and at some point, you ask Three.js to render that scene.
2. Some objects
    * Objects can be many things. You can have primitive geometries, imported models, particles, lights, and so on.
    * To create an object follow this hierarcy: geometry -> material -> mesh
    * A Mesh is the combination of a geometry (the shape) and a material (how it looks).
    * *Dont forget to add mesh to the scene*
3. A camera
    * The camera is not visible. It's more like a theoretical point of view. When we will do a render of your scene, it will be from that camera's point of view.
    * We can have multiple cameras if required, or move the existing cameras
    * In this lesson, we used *Perspective camera*  (making close objects look more prominent than far objects).
    * Camera needs: FOV -> Aspect ratio
    * *The field of view* is how large your vision angle is. If you use a very large angle, you'll be able to see in every direction at once but with much distortion, because the result will be drawn on a small rectangle. If you use a small angle, things will look zoomed in.
    * FOV is expressed in degrees
    * *Aspect Raio* is the width of the canvas divided by its height.
    * *Dont forget to add camera to the scene*
4. A renderer
    * We will simply ask the renderer to render our scene from the camera point of view, and the result will be drawn into a canvas. 
    * You can create the canvas by yourself, or let the renderer generate it and then add it to your page.

### First Render
We wont be able to see anything since we have not specified the object's position, or the camera's.
Both are in the default position, which is the center of the scene and we can't see an object from its inside (by default).
Three.js considers the forward/backward axis to be z, and we can move the camera backwards to take it out from inside the cube.