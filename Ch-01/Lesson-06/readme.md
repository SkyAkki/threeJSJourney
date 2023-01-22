# Chapter-01: Basics

## Lesson-06: Animations

### Introduction
Animations, when using Three.js, work like stop motion. You move the objects, and you do a render. Then you move the objects a little more, and you do another render. Etc. The more you move the objects between renders, the faster they'll appear to move.
A computer with faster frame rate will iterate through the frames faster and the animation will appear to be going at a faster pace.
We want to execute a function that will move objects and do the render on each frame regardless of the frame rate.

### requestAnimationFrame
requestAnimationFrame will execute the function you provide on the next frame. But then, if this function also uses requestAnimationFrame to execute that same function on the next frame, you'll end up with your function being executed on each frame forever which is exactly what we want.

However, animation like this may behave differently wrt speed in different machines

### Adaptation to the framerate

#### DeltaTime
To adapt the animation to the framerate, we need to know how much time it's been since the last tick.
1. For this, we need the timestamp before executing the first loop
2. Then we need the time when the current running loop started
3. Subtracting the two will give us the deltaTime 
4. For the next loop, we store the curret Running loop time

This resolves our problem, because when we have a faster machine, the deltaTime will be smaller and we use this small value to change object transform increments. Obviously, the change to that object will be slower because of small deltaTime.
In case of slower machine, deltaTime will be larger and object will transform at a larger rate.

#### Using Clock Class of Three.js
Like deltaTime, clock.getElapsedTime() will give us a value how many seconds have passed since the Clock was created.

#### Using a Library such as GSAP
1. npm install gsap will install the latest version of gsap library and place the code in node_modules package.
2. npm install gsap@3.5.1 will install the specific version
3. npm install --save gsap@3.5.1 will also add entry in the package.json file in the dependencies to make it easily reproducible.


> Tween is an animation from point A to B.
> GSAP has a built-in requestAnimationFrame, so you don't need to update the animation by yourself, but still, if you want to see the cube moving, you need to keep doing the renders of your scene on each frame.

