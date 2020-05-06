// template for workbox service worker. 
// the rules of cache storage are described here

/* eslint-disable no-undef */

if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  )

  // importScripts(
  //   './idb.js'
  // )
  // globals workbox
  if (workbox) {
    console.log('workbox is loaded', workbox);

    // workbox.skipWaiting()
    // workbox.clientsClaim()

    // injection point for manifest files
    // eslint-disable-next-line no-restricted-globals
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST); // investigar bien que hace este self

    // custom cache rules
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    })

    // storage in cache assets cdn this use the app
    // storage in cache the responses data, assets and cdn recurses in our server
    // we use a networkFirst cache strategy, that always
    // try get assets network, if can't then try get assests the cache
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|.min.css|.min.js|.ico|.css|.js|.html)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'assets-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    // create a new data base 
    /*
    const dbPromise = idb.open('post-store', 1, db => {

      // if object store contains indicated databse, i don't created
      if (!db.objectStorenames.contains('tasks')) {
        // give name a object store, then indicated for key recuperating date
        db.createObjectStore('tasks', { KeyPath: 'id' })
      }
    })
    */

    // i can hear eventListerns lifeCycle sw
    self.addEventListener('install', event => {
      console.log('install sw...')

      const asyncInstall = new Promise((resolve, reject) => {
        console.log("waiting for resolve async data...")
        setTimeout(resolve, 5000)
      }).catch(err => {
        reject(err)
      })

      event.waitUntil(asyncInstall)

      // access api cache
      // event.waitUntil(
      //   caches.open('static')
      //     .then(cache => {
      //       console.log('!Service worker! precachiong .!.')
      //       const regex = new RegExp('.(?:png|gif|jpg|jpeg|.min|.css|.js)$')
      //       cache.add(regex)
      //     })
      // )
    })

    self.addEventListener('activate', event => {
      console.log('activate')
    })

    // if offline, try validating request and methods
    // for show users an error if fail
    self.addEventListener('fetch', event => {

      if (event.request.method === 'POST' || event.request.method === 'DELETE') {
        event.respondWith(
          fetch(event.request).catch(err => {
            return new Response(
              JSON.stringify({ error: "this action i can't offline" }), {
              headers: { 'Content-Type': 'application/json' }
            })
          })
        )
      }

      // save data in indexedDB

    })

  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}