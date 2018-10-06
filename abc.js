const cacheName = 'v2';

const cacheAssets = [
    '/',
    'index.html',
     'restaurant.html',
     'css/styles.css',
     'data/restaurants.json',
     'js/common.js',
     'js/dbhelper.js',
     'js/main.js',
     'js/restaurant_info.js',
     '/img/1.jpg',
     '/img/2.jpg',
     '/img/3.jpg',
     '/img/4.jpg',
     '/img/5.jpg',
     '/img/6.jpg',
     '/img/7.jpg',
     '/img/8.jpg',
     '/img/9.jpg',
     '/img/10.jpg'
     
]

self.addEventListener('install',(event) =>{ 
    console.log("serviceWorker installed abc");

    event.waitUntil(
        caches.open(cacheName)
        .then(cache =>{
            console.log("service worker caching files");
            cache.addAll(cacheAssets);
        })
        .then(()=>self.skipWaiting())
    );
    });
    
    
    self.addEventListener('activate',(event) =>{ 
      console.log("serviceWorker activated abc");

      //Remove unwanted caches
      caches.keys().then(cacheNames =>{
          return Promise.all(
              cacheNames.map(cache =>{
                  if(cache !== cacheName){
                      console.log("removing old caches");
                      return caches.delete(cache); 
                  }
              }

            )
          )
      })
      });


      self.addEventListener('fetch', (e) => {
           e.respondWith(
               caches.match(e.request,{ignoreSearch:true}).then(function (res) {
                   //search the cache 
                   if (res !== undefined) {
                        return res;
                         //Got it from cache, return it immediatelly!
                         } else {
                              return fetch(e.request).then(function (res) {
                                   // not in cache, fetch it 
                                   var responseClone = res.clone(); // clone the response 
                                   caches.open(cacheName).then(function (cache) {
                                        cache.put(e.request, responseClone); // add it to cache
                                     }); 
                                     return res; // return it 
                                    });
                                 }
                                 }));

  });

//       self.addEventListener('fetch', (event) => {
//           console.log("fetching service worker");
//       event.respondWith(

//           caches.match(event.request).then(function(res) {
//               console.log("searching the cache");
//           //search the cache 
//           if (res !== undefined){ 
//             console.log("res is  "+res);
//               return res;
//              //Got it from cache, return it immediatelly! 
//             } else{
//                 console.log("fetching from network");
//                  fetch(event.request).then(function(res) { // not in cache, fetch it

//                     return res; // return it
//                 });
//             }
//         })
//     )
// });

