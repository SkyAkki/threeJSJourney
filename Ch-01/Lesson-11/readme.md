# Chapter-01: Basics

## Lesson-11: Textures

### What are textures?
Textures are images that will cover the surface of your geometries.
1. Albedo (color)
The albedo texture is the most simple one. It'll only take the pixels of the texture and apply them to the geometry.
2. Alpha
The alpha texture is a grayscale image where white will be visible, and black won't.
3. Height
The height texture is a grayscale image that will move the vertices to create some relief. You'll need to add subdivision if you want to see it.
4. Normal
The normal texture will add small details. It won't move the vertices, but it will lure the light into thinking that the face is oriented differently. Normal textures are very useful to add details with good performance because you don't need to subdivide the geometry.
5. Ambient Occlusion
The ambient occlusion texture is a grayscale image that will fake shadow in the surface's crevices. While it's not physically accurate, it certainly helps to create contrast.
6. Metalness
The metalness texture is a grayscale image that will specify which part is metallic (white) and non-metallic (black). This information will help to create reflection.
7. Roughness
The roughness is a grayscale image that comes with metalness, and that will specify which part is rough (white) and which part is smooth (black). This information will help to dissipate the light. A carpet is very rugged, and you won't see the light reflection on it, while the water's surface is very smooth, and you can see the light reflecting on it. 

### PBR
Those textures (especially the metalness and the roughness) follow what we call PBR principles. PBR stands for Physically Based Rendering. It regroups many techniques that tend to follow real-life directions to get realistic results.
https://marmoset.co/posts/basic-theory-of-physically-based-rendering/
https://marmoset.co/posts/physically-based-rendering-and-you-can-too/

### Loading an image
1. We can access image url from src folder directly and since we are using Vite, its template configuration allows us to access url directly from static folder as well.
2. We can use image.onload or image.addEventListener('load') methods to load the image url, or we can use the TextureLoader and LoadingManager.
3. We cannot use that image directly. We need to create a Texture from that image first. This is because WebGL needs a very specific format that can be access by the GPU and also because some changes will be applied to the textures like the mipmapping.
4. This texture is used in the material property object.
5. TextureLoader takes three callback functions as arguments:
    * load when the image loaded successfully
    * progress when the loading is progressing
    * error if something went wrong

### UV Unwrapping
1. Mapping each coordinate of a 3d object into 2d plane is called UV unwrapping.
2. We can see the coordinates using *console.log(geometry.attributes.uv)*, which gives us a Float32 array. {Here the itemsize property of the returned object will be true which means that 2 consecutive entires in the array corresponds to 1 coordinate in the plane }
3. Those UV coordinates are generated by Three.js when you use the primitives geometries. But when creating our own geometries and appling a texture to it, we have to specify the UV coordinates.
4. If you are making the geometry using a 3D software, you'll also have to do the UV unwrapping. But most 3d softwares do have auto unwrapping to do the trick.

### Filtering and Mipmapping
If looking closely at one corner of cube, you will notice that the far opposite corner looks blurry (It is called *moiré patterns* and you usually want to avoid them). 
1. Mipmapping (or "mip mapping" with a space) is a technique that consists of creating half a smaller version of a texture again and again until you get a 1x1 texture. All those texture variations are sent to the GPU, and the GPU will choose the most appropriate version of the texture.
2. Three.js and the GPU already handle all of this, and you can just set what filter algorithm to use. There are two types of filter algorithms: the minification filter and the magnification filter.

#### Minification Filter
The minification filter happens when the pixels of texture are smaller than the pixels of the render. In other words, the texture is too big for the surface, it covers.
You can change the minification filter of the texture using the minFilter property.
<br>
There are 6 possible values:

* THREE.NearestFilter
* THREE.LinearFilter
* THREE.NearestMipmapNearestFilter
* THREE.NearestMipmapLinearFilter
* THREE.LinearMipmapNearestFilter
* THREE.LinearMipmapLinearFilter (default)

> If you're using a device with a pixel ratio above one, you won't see much of a difference. 

#### Magnification Filter
1. The magnification filter works just like the minification filter, but when the pixels of the texture are bigger than the render's pixels. In other words, the texture too small for the surface it covers.
You can change the magnification filter of the texture using the magFilter property.

2. There are only two possible values:

    * THREE.NearestFilter
    * THREE.LinearFilter (default)

3. When the texture is stretched on a big surface it gets all blurry. However it may be advantageous in some cases where the effect is not too exaggerated as users may not even notice it.
4. However, if we do want to preserve the base image, we can use the NearestFilter.

#### Performance
1. THREE.NearestFilter is cheaper than the other ones, and you should get better performances when using it.
2. When using NearestFilter on minFilter, we dont need mipmapping and we can disable it by:
*colorTexture.generateMipmaps = false*. That will slightly offload the GPU.


### Texture format and optimization
When you are preparing your textures, you must keep 3 crucial elements in mind:

1. *The weight*:
    * The textures we use in our project will be downloaded by the user first when visting. User with bad connection will have to wait longer. So the weight should be light.
    * You can use most of the types of images we use on the web like .jpg (lossy compression but usually lighter) or .png (lossless compression but usually heavier).
    * Compress your jpg and png using TinyPng.
    * Basis file are really small but with lossy compression

2. *The size (or the resolution)*
    * Each pixel of the textures you are using will have to be stored on the GPU regardless of the image's weight. And like your hard drive, the GPU has storage limitations.
    * It's even worse because the automatically generated mipmapping increases the number of pixels that have to be stored.
    * Example: Have different version of the same texture. A detailed one for objects near camera and light ones for the background.
    * Mipmapping will produce a half smaller version of the texture repeatedly until it gets a 1x1 texture. Because of that, your texture width and height must be a power of 2. That is mandatory so that Three.js can divide the size of the texture by 2.
    * If you are using a texture with a width or height different than a power of 2 value, Three.js will try to stretch it to the closest power of 2 number, which can have visually poor results, and you'll also get a warning in the console.
3. *The data*
    * Textures support transparency but we can't have transparency with .jpg images as they dont have an alpha channel.
    * If we want to have only one texture that combines color and alpha, we better use .png file.
    * But sometimes its better to use two .jpg (the color version and the alpha version). It will be more to send to the GPU but less to load.
    * When using a normal texture (the purple one), you will probably want to have the exact values for each pixel's red, green, and blue channels, or you might end up with visual glitches. For that, you'll need to use a png because its lossless compression will preserve the values.


### Resources for Textures
poliigon.com
3dtextures.me
arroway-textures.ch