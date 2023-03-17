# Chapter-02 Classic Techniques

## Lesson-18 Particles

### Introduction
1. Particles can be used to achieve various effects such as stars, smoke, rain, dust, fire, and many other things.
2. The good thing with particles is that you can have hundreds of thousands of them on screen with a reasonable frame rate. 
3. The downside is that each particle is composed of a plane (two triangles) always facing the camera.
4. Creating particles is as simple as making a Mesh. We need a BufferGeometry (Each vertex of the geometry will become a particle), a material that can handle particles (PointsMaterial), and instead of producing a Mesh we need to create a Points.

### Particle textures
1. When loading particle texture as the "map" property of the material, we can see the edges of the texture in the particle clearly.
2. Using alphaMap with transparent true is will provide a better result as the black area and edges of the texture are transparent now. However we can still see it somewhat.(That is because the particles are drawn in the same order as they are created, and WebGL doesn't really know which one is in front of the other.)
3. To tell the GPU to not render the black part of the texture at all, we can use alphaText property.

#### Alpha test
The alphaTest is a value between 0 and 1 that enables the WebGL to know when not to render the pixel according to that pixel's transparency. By default, the value is 0 meaning that the pixel will be rendered anyway. If we use a small value such as 0.001, the pixel won't be rendered if the alpha is 0.
#### Depth test
When drawing, the WebGL tests if what's being drawn is closer than what's already drawn. This is called depth testing and can be disabled a very close result. However, deactivating the depth testing might create bugs if you have other objects in your scene or particles with different colors. The particles might be drawn as if they were above the rest of the scene.
#### Depth Write
The WebGL is testing if what's being drawn is closer than what's already drawn. The depth of what's being drawn is stored in what we call a *depth buffer*. Instead of not testing if the particle is closer than what's in this depth buffer, we can tell the WebGL not to write particles in that depth buffer.

> These three do not impact the performance much.

#### Blending
Currently, the WebGL draws the pixels one on top of the other.<br>
By changing the blending property, we can tell the WebGL not only to draw the pixel, but also to add the color of that pixel to the color of the pixel already drawn. That will have a saturation effect that can look amazing.<br>
Blending impacts the performance so be careful.

#### Multiple Colors
1. We can have a different color for each particle. We first need to add a new attribute named color as we did for the position. A color is composed of red, green, and blue (3 values), so the code will be very similar to the position attribute.
2. To activate those vertex colors, simply change the vertexColors to true, to notify the material that it should now use vertex colors.
3. The main color of the material still affects these vertex colors, so commenting it to get the true colors.

### Animating Particles
1. Because the Points class inherits from Object3D class, we can use scale, position and rotation on the whole particle object.
2. To gain a more granular control, we will update each vertex position separately.
3. To update each vertex, we have to update the right part in the position attribute because all the vertices are stored in this one dimension array where the first 3 values correspond to the x, y and z coordinates of the first vertex, then the next 3 values correspond to the x, y and z of the second vertex, etc.
4. We only want the vertices to move up and down, meaning that we are going to update the y axis only. Because the position attribute is a one dimension array, we have to go through it 3 by 3 and only update the second value which is the y coordinate.
5. Three.js has to be notified that the geometry changed. To do that, we have to set the needsUpdate to true on the position attribute once we are done updating the vertices.