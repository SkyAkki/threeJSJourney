# Chapter-01: Basics

## Lesson-13: 3D Text

### Typeface
1. The fonts supported by threeJS must be in a particular json format called typeface.
2. We can convert the font into a JSON object using this resource: http://gero3.github.io/facetype.js/
3. Fonts provided by the threeJS are available inside /node_modules/three/examples/fonts/ folder.

### FontLoader
1. This is similar to textureLoader but it is not available in the THREE variable. So we have to import it like we imported orbitControl.
2. Since this is not inside THREE variable, we wont be institiating it like *new THREE.FontLoader()* but direcly like *new FontLoader()*.
3. Like textureLoader, fontLoader.load() will also take font path as first argument and callback function as second argument (success), thrid argument (progress) and fourth argument (error). But unlike texture holder, we cannot assign fontLoader.load() to a variable.
4. Unlike the TextureLoader, we have to write the rest of our code inside that success function.
5. Also, TextGeometry needs to be imported separately as well.

### TextGeometry
1. This will contain the string as the first argument. The second argument is the options object.
2. The options object contain many properties are:
    * size: Float. Size of the text. Default is 100.
    * Float. Thickness to extrude text. Default is 50.
    * curveSegments: Integer. Number of points on the curves. Default is 12.
    * bevelEnabled: Boolean. Turn on bevel. Default is False.
    * bevelThickness: Float. How deep into text bevel goes. Default is 10.
    * bevelSize: Float. How far from text outline is bevel. Default is 8.
    * bevelOffset: Float. How far from text outline bevel starts. Default is 0.
    * bevelSegments: Integer. Number of bevel segments. Default is 3.
3.  Creating a text geometry is long and hard for the computer. Avoid doing it too many times and keep the geometry as low poly as possible by reducing the curveSegments and bevelSegments properties.

### Center the text
1. There are several ways to center the text. One way of doing it is by using bounding. The bounding is the information associated with the geometry that tells what space is taken by that geometry. It can be a box or a sphere.
2. You cannot actually see those boundings, but it helps Three.js easily calculate if the object is on the screen, and if not, the object won't even be rendered. That is called *frustum culling*.
3. By default, Three.js is using sphere bounding.