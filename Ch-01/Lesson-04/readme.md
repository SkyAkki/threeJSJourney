# Chapter-01: Basics

## Lesson-04: Webpack

### Why Webpack?
1. Loading three.min.js manually doesn't include some of the classes.
2. We are also going to need to run a server to load and manipulate images (to allow cross-origin use of images) (we face the tainted canvas error)
3. A bundler is a tool in which you send assets like JavaScript, CSS, HTML, images, TypeScript, Stylus, and other languages. The bundler will handle those assets, apply potential modifications, and output a "bundle" composed of web friendly files like HTML, CSS, images, JavaScript.
4. Bundler can do even more. You can use a bundler to create a local server, manage dependencies, improve compatibility, support modules, optimize images, deploy on a server, minify the code, etc.

### Using threeJS Journey webpack template
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

### Getting Started
> You can access your local server from any other device on the same network by typing the same URL that opened in your browser (which is very useful if you want to debug on mobile).

1. We don't need to add any <script> tags. Webpack will handle that.
2. We don't add CSS to HTML anymore. We will import it in the script file.
3. We will import threeJS inside script file from /node_modules/ folder.

```
import './style.css'
import * as THREE from 'three'
```
