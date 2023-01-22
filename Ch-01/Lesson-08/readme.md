# Chapter-01: Basics

## Lesson-08: Fullscreen and Resizing

### Handle Resize
One resize we need to take care of three things:
1. Update the size object with current window viewport sizes.
2. Camera object was using the previous sizes to determine aspect ratio. Update the aspect ratio with the new viewport aspect ratio. *FOR CAMERA WE NEED TO ALERT THREEJS CAMERA THAT THEY NEED TO UPDATE THE PROJECTION MATRIX*.
3. Finally, update the renderer size. 
>You don't need to specify width or height on the canvas because Three.js is already taking care of that when you call the renderer.setSize(...) method.

### Handle Pixel Ratio
Pixel ratio > 1 can cause kind of blurry render and artifacts shaped likes stairs on the edges (called aliasing).
The pixel ratio corresponds to how many physical pixels you have on the screen for one pixel unit on the software part.
Screens with pixel ratio = 2 are called retina display.
While this is a good thing for the image quality, a pixel ratio of 2 means 4 times more pixels to render. And a pixel ratio of 3 means 9 times more pixels to render.
Highest pixel ratio are found in mobile devices (upto 5), because of which it takes more time to paint the screen and hence the frame rate drops.

### Handle Fullscreen
1. The method to request the fullscreen is associated with the element. It's because you can choose what will be in fullscreen. It can be the whole page, any DOM element or the <canvas>.
2. The method to leave the fullscreen mode is available directly on the document.