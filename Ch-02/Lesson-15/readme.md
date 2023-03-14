# Chapter-02 Classic Techniques

## Lesson-15 Lights

### Types of Lights
1. Ambient Light:
    * The AmbientLight applies omnidirectional lighting on all geometries of the scene. The first parameter is the color and the second parameter is the intensity.
    * If all you have is an AmbientLight you'll have the same effect as for a MeshBasicMaterial because all faces of the geometries will be lit equally.
    * In real life, when you light up an object, the sides of the objects at the opposite of the light won't be totally black because light bounces on the walls and other objects. Light bouncing is not supported in Three.js for performance reasons, but you can use a dim AmbientLight to fake this light bounce.
2. Directional Light:
    * The DirectionalLight will have a sun-like effect as if the sun rays were traveling in parallel.
    * By default, the light will seems to come from above. We can change that using light.position.set()
    * The distance of the light doesn't matter for now. The rays come from an infinite space and travel in parallel to the infinite opposite.
3. Hemisphere Light:
    * The HemisphereLight is similar to the AmbientLight but with a different color from the sky than the color coming from the ground. Faces facing the sky will be lit by one color while another color will lit faces facing the ground.
    * The first parameter is the color corresponding to the sky color, the second parameter is the groundColor and the third parameter is the intensity.
4. PointLight:
    * The PointLight is almost like a lighter. The light source is infinitely small, and the light spreads uniformly in every direction.
    * By default, the light intensity doesn't fade. But you can control that fade distance and how fast it is fading using the distance and decay properties. 
5. RectAreaLight:
    * The RectAreaLight works like the big rectangle lights you can see on the photoshoot set. It's a mix between a directional light and a diffuse light. 
    * The first parameter is the color, the second parameter is the intensity, the third parameter is width of the rectangle, and the fourth parameter is its height.
    * *The RectAreaLight only works with MeshStandardMaterial and MeshPhysicalMaterial.*
6. SpotLight:
    * The SpotLight works like a flashlight. It's a cone of light starting at a point and oriented in a direction, creating a circular contour at the surface it lands on.
    * 3rd Parameter is *distance at which the intensity drops to 0*, 4th parameter is *angle* determining how large is the beam, 5th parameter is the *penumbra* to set how diffused is the contour of the beam and last parameter *decay* determines how fast the light dims.
    * Spotlight instance will have a *target* property which is a Object3D. The SpotLight is always looking at that target object.
    * To move the target, we need to add it to the scene first and then use position on light.target.position.set.
    * *To rotate the spotlight we need to add it to the scene first.*

> A Vector3 without any parameter will have its x, y, and z to 0 (the center of the scene).

### Performance
1. Lights can cost a lot when it comes to performance. The GPU will have to do many calculations like the distance from the face to the light, how much that face is facing the light, if the face is in the spot light cone, etc.
2. Try to add as few lights as possible and try to use the lights that cost less.
    * Minimal cost: AmbientLight and HemisphereLight
    * Moderate cost: DirectionalLight and PointLight
    * High cost: SpotLight and RectAreaLight

### Baking
1. A good technique for lighting is called baking. The idea is that you bake the light into the texture. This can be done in a 3D software. 
2. The drawback is that we cannot move the light anymore and we have to load huge textures.

### Helpers
1. Positioning and orienting the lights is hard. To assist us, we can use helpers. Only the following helpers are supported:
    * HemisphereLightHelper
    * DirectionalLightHelper
    * PointLightHelper
    * RectAreaLightHelper
    * SpotLightHelper
2. To use them, simply instantiate those classes. Use the corresponding light as a parameter, and add them to the scene. The second parameter enables you to change the helper's size. This is true for first four light helpers as they are present in the THREE variable.
3. RectAreaLightHelper isn't part of the THREE core variables. You must import it from the examples dependencies as we did with OrbitControls.