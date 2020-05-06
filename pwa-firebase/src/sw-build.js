// provide the build instructions for custom service worker

const workboxBuild = require('workbox-build');
// NOTE: this should be run *AFTER* all your assets are built

const buildSW = () => {
  // this will return a Promise
  return workboxBuild.injectManifest({ // manifest give us total control rules storage cache
    swSrc: 'src/sw-template.js', // this is your assets are built
    swDest: 'build/sw.js', // this will be created in the build step
    globDirectory: 'build',
    globPatterns: [
      '**\/*.{js,css,html,png}',
      //'**\/!(service-worker|precache-manifest.*).{js,css,html,png}' // you need to update the glob patterns before adding clean-cra-sw else the files removed will be added to the precache of workbox.
    ]
  }).then(({ count, size, warnings }) => {
    // Optionally, log any warnings and details
    warnings.forEach(console.warn)
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  })
}

buildSW();