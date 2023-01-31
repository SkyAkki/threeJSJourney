# Chapter-01: Basics

## Lesson-13: Go Live

### Problems faced while going live
1. In the earlier days of the internet, we had to subscribe to a "traditional" hosting solution like OVH, 1and1 or Gandhi where we have to upload files manually by using an FTP client.
2. You can't simply put the whole project with the node_modules/ folder and the Vite configuration on the host.
3. For this we have to "build" the assets compatible for server in order to create HTML, CSS, JS and assets files that can be interpreted by browsers.

### Build
1. To build your project, run npm run build in the terminal.
2. This command will run the script located in the /package.json file in the scripts > build property.
3. Wait a few seconds and the files should be available in the /dist/ folder which will be created when build is executed. We can put these files online.
4. We are going to use Vercel for our purposes.

### Vercel Setup