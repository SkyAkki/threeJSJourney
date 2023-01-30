# Chapter-01: Basics

## Lesson-12: Materials

### Basics
Materials are used to put a color on each visible pixel of the geometries. The algorithms that decide on the color of each pixel are written in programs called shaders. Three.js has many built-in materials with pre-made shaders.

### Types of Materials
1. *MeshBasicMaterial*: 
    * The map property will apply a texture on the surface of the geometry:
    * The color property will apply a uniform color on the surface of the geometry. When you are changing the color property directly, you must instantiate a Color class. This is because after the inital declaration of color it is not stored as a single property but as three properties (r,g,b).
    * The wireframe property will show the triangles that compose your geometry with a thin line of 1px regardless of the distance of the camera.
    * The opacity property controls the transparency but, to work, you should set the transparent property to true to inform Three.js that this material now supports transparency.
    * The alphaMap property can be used to control the transparency with a texture. material.transparent must already be set to true for this to work.
    * The side property lets you decide which side of a face is visible. By default, the front side is visible (THREE.FrontSide), but you can show the backside instead (THREE.BackSide) or both (THREE.DoubleSide). Obviously, DoubleSide requires twice the computation power and should be used carefully.
2. *MeshNormalMaterial*:
    * The MeshNormalMaterial displays a nice purple, blueish, greenish color that looks like the normal texture. Normals are information encoded in each vertex that contains the direction of the outside of the face.
    * If you displayed those normals as arrows, you would get straight lines comings out of each vertex that composes your geometry. 
    * You can use Normals for many things like calculating how to illuminate the face or how the environment should reflect or refract on the geometries' surface.
    * When using the MeshNormalMaterial, the color will just display the normal relative's orientation to the camera. If you rotate around the sphere, you'll see that the color is always the same, regardless of which part of the sphere you're looking at.
    * The flatShading property will flatten the faces, meaning that the normals won't be interpolated between the vertices.
3. *MeshMatcapMaterial*:
    * MeshMatcapMaterial is a fantastic material because of how great it can look while being very performant.
    * For it to work, the MeshMatcapMaterial needs a reference texture that looks like a sphere The material will then pick colors on the texture according to the normal orientation relative to the camera.
    * The material.matcap property is used to set the reference matcap texture.
    * The meshes will appear illuminated, but it's just a texture that looks like it i.e. matcap does not support lights and the shading on the matcap surface is controlled directly by the matcap image.
    * Find MatCaps here: https://github.com/nidorx/matcaps
4. *MeshDepthMaterial*:
    * The MeshDepthMaterial will simply color the geometry in white if it's close to the camera's near value and in black if it's close to the far value of the camera
5. *MeshLambertMaterial*:
    * MeshLambertMaterial supports the same properties as the MeshBasicMaterial but also some properties related to lights. The MeshLambertMaterial is the most performant material that uses lights. Unfortunately, the parameters aren't convenient, and you can see strange patterns on the geometry if you look closely at rounded geometries like the sphere.
6. *MeshPhongMaterial*:
    * The MeshPhongMaterial is very similar to the MeshLambertMaterial, but the strange patterns are less visible, and you can also see the light reflection on the surface of the geometry
    * The material.shininess property controls the light reflection on the surface.
    * the material.specular property change the color of the reflection
7. *MeshToonMaterial*:
    * The MeshToonMaterial is similar to the MeshLambertMaterial in terms of properties but with a cartoonish style.
    * By default, you only get a two parts coloration (one for the shadow and one for the light).
    * The material.gradientMap property can add more steps to the coloration.
    * If the size of gradientTexture used is too small, it will be affected by minFilter, magFilter, and mipmapping.
    * To fix this, we can simply change the minFilter and magFilter to THREE.NearestFilter. Using THREE.NearestFilter means that we are not using the mip mapping, we can deactivate it with gradientTexture.generateMipmaps = false.
8. *MeshStandardMaterial*
    * The MeshStandardMaterial uses physically based rendering principles. Like the MeshLambertMaterial and the MeshPhongMaterial, it supports lights but with a more realistic algorithm and better parameters like roughness and metalness.
    * We can directly use the material.roughness and material.metalness property without applying additional textures.
    #### MAPS
    * The map property allows you to apply a simple texture.
    * The aoMap property (literally "ambient occlusion map") will add shadows where the texture is dark. For it to work, you must add what we call a second set of UV (the coordinates that help position the textures on the geometries).
    * After applying material.aoMap, we can control then intensity of shadows with material.aoMapIntensity.
    * The displacementMap property will move the vertices to create true relief. If there are not enough verticles on our geometries it will look bad and the material.displacementScale is too strong.
    * Instead of specifying uniform metalness and roughness for the whole geometry, we can use metalnessMap and roughnessMap properties to add respective texture.
    * The normalMap property will fake the normal orientation and add details on the surface regardless of the subdivision
    * You can change the normal intensity with the normalScale property. *It's a vector 2*.
    * The alphaMap property controls the alpha value. *transparent must be set to true for that material.*
10. There are other materials as well such as MeshPhysicalMaterial, PointsMaterial, ShaderMaterial and RawShaderMaterial that we will see later.

### Environment Map
1. The environment map is like an image of what's surrounding the scene. You can use it to add reflection or refraction to your objects. It can also be used as lighting information.
2. Three.js only supports cube environment maps. Cube environment maps are 6 images with each one corresponding to a side of the environment.
3. Find *High Dynamic Range Imaging* (HDRI) images here https://polyhaven.com/.
4. Convert HDRI to Cubemap here https://matheowis.github.io/HDRI-to-CubeMap/ (ouputs are .png).