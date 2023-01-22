# Chapter-01: Basics

## Lesson-05: Transform Objects

### Move objects
There are 4 properties to transform objects in our scene

1. position (to move the object)
2. scale (to resize the object)
3. rotation (to rotate the object)
4. quaternion (to also rotate the object)

All classes that inherit from the Object3D class possess those properties like PerspectiveCamera or Mesh. Those properties will be compiled in what we call matrices. Matrices are used internally by Three.js, by the WebGL, and by the GPU to transform things.

1. The position possesses 3 essential properties, which are x, y, and z. Those are the 3 necessary axes to position something in a 3D space.
2. The direction of each axis is purely arbitrary, and it can vary according to the environment. In Three.js, we usually consider that the y axis is going upward, the z axis is going backward, and the x axis is going to the right.
3. The position property is not any object. It's an instance of the Vector3 class. While this class has an x, a y, and a z property, it also has many useful methods.
    * Length of vector: console.log(mesh.position.length())
    * Distance from another Vector3: console.log(mesh.position.distanceTo(camera.position))
    * normalize its values (meaning that you will reduce the length of the vector to 1 unit but preserve its direction): console.log(mesh.position.normalize())
    * change all the axes simultaneously: mesh.position.set(0.7, - 0.6, 1)

### Axes Helper
The AxesHelper will display 3 lines corresponding to the x, y and z axes, each one starting at the center of the scene and going in the corresponding direction.
The green line corresponds to the y axis. The red line corresponds to the x axis and there is a blue line corresponding to the z axis.

### Rotate Objects
1. You can use the self-evident rotation property, but you can also use the less obvious quaternion property. Three.js supports both, and updating one will automatically update the other. It's just a matter of which one you prefer.
2. *The rotation property also has x, y, and z properties, but instead of a Vector3, it's a Euler.*
3. The value of these axes is expressed in radians. So for half a rotation, Math.PI will be used.
4. When we rotate in one axis, we are changing the other axes orientation as well.
5.  The rotation applies in the following order: x, y, and then z. That can result in weird behaviors like one named gimbal lock when one axis has no more effect, all because of the previous ones.
6. We can change this order by using the reorder(...) method object.rotation.reorder('YXZ')

#### lookAt
Object3D instances have an excellent method named lookAt(...) that lets you ask an object to look at something. The object will automatically rotate its -z axis toward the target you provided.
```
camera.lookAt(new THREE.Vector3(0, - 1, 0))
```
The parameter must be a Vector3

### Scene Graph
We can group multiple objects inside one and any subsequent change on the group will apply on all the objects inside.