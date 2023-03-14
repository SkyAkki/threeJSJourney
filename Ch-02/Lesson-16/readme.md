# Chapter-02 Classic Techniques

## Lesson-16 Shadows

### Type of shadows
1. Core shadows are the dark regions (shadows) created on a subject because of a light source.
2. Drop shadows are the shadows created on other objects by the subject.

### Problem with shadows
They require a lot of computing power for real time 3D rendering because we need shadows at a good framerate.
In software such as blender we have "ray-tracing" to generate good shadows but it can take hours to get one render this way.
For web-based solutions, we need atleast *60 renders per second* so ray-tracing is not an option.
We need real time solution with good performance.

### How shadow renders in three.js
1. When you do one render, Three.js will first do a render for each light supposed to cast shadows.
2. Those renders will simulate what the light sees as if it was a camera. 
3. During these lights renders, MeshDepthMaterial replaces all meshes materials.
4. The results are stored as textures and named shadow maps.
5. You won't see those shadow maps directly, but they are used on every material supposed to receive shadows and projected on the geometry.

### Activating shadows
1. First, we need to activate the shadow maps on the renderer.
2. Then, we need to go through each object of the scene and decide if the object can cast a shadow with the castShadow property, and if the object can receive shadow with the receiveShadow property.
3. Finally, activate the shadows on the light with the castShadow property.

> Only point light, directional light and spot light support shadows. The shadow maps will be stored in the light instance itself.

### Optimizing shadows
1. *Render Size*: By default, the shadow map size is only 512x512 for performance reasons. We can improve it but keep in mind that you need a power of 2 value for the mipmapping.
2. *Near and Far*: It won't really improve the shadow's quality, but it might fix bugs where you can't see the shadow or where the shadow appears suddenly cropped.
3. *Amplitude*: The smaller the values, the more precise the shadow will be. But if it's too small, the shadows will just be cropped.
4. *Blur*: You can control the shadow blur with the radius property. This technique doesn't use the proximity of the camera with the object. It's just a general and cheap blur.
5. *Shadow Map Algorithm*: Different types of algorithms can be applied to shadow maps:
    * THREE.BasicShadowMap: Very performant but lousy quality
    * THREE.PCFShadowMap: Less performant but smoother edges. Default.
    * THREE.PCFSoftShadowMap: Less performant but even softer edges. Does not support radius property. To simulate blur effect while using SoftShadowMap we can play with the mapSize.width and height.
    * THREE.VSMShadowMap: Less performant, more constraints, can have unexpected results.

> When we use shadows on multiple light sources, shadows don't merge nicely. They are handled independently, and, unfortunately, there is not much to do about it. But we can improve the shadow quality using the same techniques that we used for the directional light.

> Because the point light illuminates in every direction, Three.js will have to render each of the 6 directions to create a cube shadow map. The camera helper you see is the camera's position in the last of those 6 renders (which is downward). Doing all those renders can generate performance issues. Try to avoid having too much PointLight with shadows enabled.

### Baking Shadows
Baking shadow is the same as baking lights. Shadows are integrated into textures that we apply on materials.
<br>
For this we have to deactive all shadows on all ligths and renderer and instead of using a MeshStandardMaterial on the *plane*, we'll use a simple MeshBasicMaterial with the bakedShadow as map.
<br>
The main problem is that it's not dynamic, and if the sphere or the lights moves, the shadows won't.

### Alternative to baked shadows
A less realistic but more dynamic solution would be to use a more simple shadow under the object and slightly above the plane (to avoid z-fighting), and move this shadow plane along with the object. To simulate depth we can change the alpha value of opacity according to the height of the object.

