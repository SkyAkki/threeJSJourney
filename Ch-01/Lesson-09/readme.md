# Chapter-01: Basics

## Lesson-09: Geometries

### What is a Geometry?
1. In Three.js, geometries are composed of vertices (point coordinates in 3D spaces) and faces (triangles that join those vertices to create a surface).
2. We use geometries to create meshes, but you can also use geometries to form particles. Each vertex will correspond to a particle.
3. We can store more data than the position in the vertices like UV coordinates, normals, size of vertex, color etc.

### Different Build-in Geometries
> All the following geometries inherit from *BufferGeometry* class and have methods like translate, rotateX, normalize etc.

1. *BoxGeometry* To create a box.
2. *PlaneGeometry* To create a rectangle plane.
3. *CircleGeometry* To create a disc or a portion of a disc (like a pie chart).
4. *ConeGeometry* To create a cone or a portion of a cone. You can open or close the base of the cone.
5. *CylinderGeometry* To create a cylinder. You can open or close the ends of the cylinder and you can change the radius of each end.
6. *RingGeometry* To create a flat ring or portion of a flat circle.
7. *TorusGeometry* To create a ring that has a thickness (like a donut) or portion of a ring.
8. *TorusKnotGeometry* To create some sort of knot geometry.
9. *DodecahedronGeometry* To create a 12 faces sphere. You can add details for a rounder sphere.
10. *OctahedronGeometry* To create a 8 faces sphere. You can add details for a rounder sphere.
11. *TetrahedronGeometry* To create a 4 faces sphere (it won't be much of a sphere if you don't increase details). You can add details for a rounder sphere.
12. *IcosahedronGeometry* To create a sphere composed of triangles that have roughly the same size.
13. *SphereGeometry* To create the most popular type of sphere where faces looks like quads (quads are just a combination of two triangles).
14. *ShapeGeometry* To create a shape based on a path.
15. *TubeGeometry* To create a tube following a path.
16. *ExtrudeGeometry* To create an extrusion based on a path. You can add and control the bevel.
17. *LatheGeometry* To create a vase or portion of a vase (more like a revolution).
18. *TextGeometry* To create a 3D text. You'll have to provide the font in typeface json format.

> We can also create our own geometries or import from 3D softwares.

### Creating Buffer Geometry
1. Steps to follow:
    * Specify position of vertices in a *typed* array.
    * Use this array to create a BufferAttribute
    * Add the buffer attribute to the BufferObject

2. Float32Array are native JavaScript typed array. You can only store floats inside, and the length of that array is fixed.
3. In the *BufferAttribute* method, The first parameter corresponds to your typed array and the second parameter corresponds to how much values make one vertex attribute.

### INDEX
One interesting thing with BufferGeometry is that you can mutualize vertices using the index property. Consider a cube. Multiple faces can use some vertices like the ones in the corners. And if you look closely, every vertex can be used by various neighbor triangles. That will result in a smaller attribute array and performance improvement.