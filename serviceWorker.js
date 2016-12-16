'use strict';

//Cache polyfil to support cacheAPI in all browsers
importScripts('./cache-polyfill.js');

var cacheName = 'cache-v1';

//Files to save in cache
var files = [
  './',
  './index.html',
  './index.html?utm=homescreen', //SW treats query string as new page
  'node_modules/bootstrap/dist/css/bootstrap.css',
  'node_modules/font-awesome/css/font-awesome.css',
  'node_modules/angular-simple-sidebar/angular-simple-sidebar.min.css',
  'node_modules/angular-simple-sidebar/angular-simple-sidebar-black-theme.min.css',
  'styles/main.css',
  'styles/login.css',
  'node_modules/jquery/dist/jquery.js',
  'node_modules/angular/angular.js',
  'styles/fonts/Source-Sans-Pro.css', //caching 3rd party content
  'node.png',
  'node_modules/angular-route/angular-route.js',
  'node_modules/angular-animate/angular-animate.js',
  'node_modules/angular-simple-sidebar/angular-simple-sidebar.min.js',
  /*'js/app.js',
  'js/controllers/sideNavController.js',
  'js/controllers/loginController.js',
  'js/controllers/dashboardController.js',  NOTE CACHED FOR DEVELOPMENT
  'js/controllers/rateStarsController.js',
  'js/directives/rate-stars.js',
  'js/custom.js',
  'json/histories.json',
  */
  'music/star1.mp3',
  'music/star2.mp3',
  'music/star3.mp3',
  'music/star4.mp3',
  'music/star5.mp3',
  './manifest.json'
];

//Adding `install` event listener
self.addEventListener('install', function (event) {
  console.info('Event: Install');

  event.waitUntil(
    caches.open(cacheName)
    .then(function (cache) {
      //[] of files to cache & if any of the file not present `addAll` will fail
      return cache.addAll(files)
        .then(function () {
          console.info('All files are cached');
          return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
        })
        .catch(function (error) {
          console.error('Failed to cache', error);
        })
    })
  );
});

/*
  FETCH EVENT: triggered for every request made by index page, after install.
*/

//Adding `fetch` event listener
self.addEventListener('fetch', function (event) {
  console.info('Event: Fetch');

  var request = event.request;

  //Tell the browser to wait for newtwork request and respond with below
  event.respondWith(
    //If request is already in cache, return it
    caches.match(request).then(function (response) {
      if (response) {
        return response;
      }

      //if request is not cached, add it to cache
      return fetch(request).then(function (response) {
        var responseToCache = response.clone();
        caches.open(cacheName).then(
          function (cache) {
            cache.put(request, responseToCache).catch(function (err) {
              console.warn(request.url + ': ' + err.message);
            });
          });

        return response;
      });
    })
  );
});

/*
  ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
*/

//Adding `activate` event listener
self.addEventListener('activate', function (event) {
  console.info('Event: Activate');

  //Remove old and unwanted caches
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cache) {
          if (cache !== cacheName) { //cacheName = 'cache-v1'
            return caches.delete(cache); //Deleting the cache
          }
        })
      );
    })
  );
});

/*
  PUSH EVENT: triggered everytime, when a push notification is received.
*/

//Adding `push` event listener
self.addEventListener('push', function (event) {
  console.info('Event: Push');

  var title = 'Push notification demo';
  var body = {
    'body': 'click to return to application',
    'tag': 'demo',
    'icon': './images/icons/apple-touch-icon.png',
    'badge': './images/icons/apple-touch-icon.png',
    //Custom actions buttons
    'actions': [{
      "action": "yes",
      "title": "I ♥ this app!"
    }, {
      "action": "no",
      "title": "I don\'t like this app"
    }]
  };

  event.waitUntil(self.registration.showNotification(title, body));
});

/*
  BACKGROUND SYNC EVENT: triggers after `bg sync` registration and page has network connection.
  It will try and fetch github username, if its fulfills then sync is complete. If it fails,
  another sync is scheduled to retry (will will also waits for network connection)
*/

self.addEventListener('sync', function (event) {
  console.info('Event: Sync');

  //Check registered sync name or emulated sync from devTools
  if (event.tag === 'github' || event.tag === 'test-tag-from-devtools') {
    event.waitUntil(
      //To check all opened tabs and send postMessage to those tabs
      self.clients.matchAll().then(function (all) {
        return all.map(function (client) {
          return client.postMessage('online'); //To make fetch request, check app.js - line no: 122
        })
      })
      .catch(function (error) {
        console.error(error);
      })
    );
  }
});

/*
  NOTIFICATION EVENT: triggered when user click the notification.
*/

//Adding `notification` click event listener
self.addEventListener('notificationclick', function (event) {
  var url = 'https://demopwa.in';

  //Listen to custom action buttons in push notification
  if (event.action === 'yes') {
    console.log('I ♥ this app!');
  } else if (event.action === 'no') {
    console.warn('I don\'t like this app');
  }

  event.notification.close(); //Close the notification

  //To open the app after clicking notification
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function (clients) {
      for (var i = 0; i < clients.length; i++) {
        var client = clients[i];
        //If site is opened, focus to the site
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      //If site is cannot be opened, open in new window
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
    .catch(function (error) {
      console.error(error);
    })
  );
});