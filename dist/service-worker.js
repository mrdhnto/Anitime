importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js');
importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js');

/* WORKBOX SCRIPT STARTED */
workbox.precaching.precacheAndRoute([
  { url: './', revision: '1' },
  { url: './index.html', revision: '1' },
  { url: './manifest.json', revision: '1' },
  { url: './bundle.js', revision: '1' },
  { url: './assets/css/styles.css', revision: '1' },
  { url: './assets/css/bootstrap.min.css', revision: '1' },
  { url: './assets/css/jquery.mCustomScrollbar.min.css', revision: '1' },
  { url: './assets/css/materialdesignicons.min.css', revision: '1' },
  { url: './assets/css/mdb.lite.min.css', revision: '1' },
  { url: './assets/js/bootstrap.min.js', revision: '1' },
  { url: './assets/js/jquery-3.5.1.min.js', revision: '1' },
  { url: './assets/js/jquery.mCustomScrollbar.concat.min.js', revision: '1' },
  { url: './assets/js/mdb.lite.min.js', revision: '1' },
  { url: './assets/js/moment.js', revision: '1' },
  { url: './assets/js/popper.min.js', revision: '1' },
  { url: './assets/js/idb.js', revision: '1' },
  { url: './assets/fonts/materialdesignicons-webfont.woff', revision: '1' },
  { url: './assets/fonts/materialdesignicons-webfont.woff2', revision: '1' },
  { url: './assets/images/icon-512.png', revision: '1' },
  { url: './assets/images/icon-384.png', revision: '1' },
  { url: './assets/images/icon-256.png', revision: '1' },
  { url: './assets/images/icon-192.png', revision: '1' },
  { url: './assets/images/icon-152.png', revision: '1' },
  { url: './assets/images/icon-144.png', revision: '1' },
  { url: './assets/images/icon-128.png', revision: '1' },
  { url: './assets/images/icon-96.png', revision: '1' },
  { url: './assets/images/icon-72.png', revision: '1' },
  { url: './assets/images/apple-icon.png', revision: '1' },
  { url: './assets/images/logo.png', revision: '1' },
  { url: './assets/images/anitime-bn.png', revision: '1' },
],{
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/]
});

const store = new idbKeyval.Store('GraphQL-Cache', 'PostResponses');

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 
// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

//Menyimpan cache untuk file cdn selama 1 tahun
workbox.routing.registerRoute(
  new RegExp('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'cdn-file',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Workbox with custom handler to use IndexedDB for cache.
workbox.routing.registerRoute(
  new RegExp('https://graphql.anilist.co(/)?'),
  // Uncomment below to see the error thrown from Cache Storage API.
  //workbox.strategies.staleWhileRevalidate(),
  async ({
    event
  }) => {
    return staleWhileRevalidate(event);
  },
  'POST'
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
     new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30days
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('.*\\.js'),
    new workbox.strategies.CacheFirst()
);

// Return cached response when possible, and fetch new results from server in
// the background and update the cache.
self.addEventListener('fetch', async (event) => {
  if (event.request.method === 'POST') {
    event.respondWith(staleWhileRevalidate(event));
  }
  // TODO: Handles other types of requests.
});

async function staleWhileRevalidate(event) {
  let promise = null;
  let cachedResponse = await getCache(event.request.clone());
  let fetchPromise = fetch(event.request.clone())
    .then((response) => {
      setCache(event.request.clone(), response.clone());
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
  return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;
}

async function serializeResponse(response) {
  let serializedHeaders = {};
  for (var entry of response.headers.entries()) {
    serializedHeaders[entry[0]] = entry[1];
  }
  let serialized = {
    headers: serializedHeaders,
    status: response.status,
    statusText: response.statusText
  };
  serialized.body = await response.json();
  return serialized;
}

async function setCache(request, response) {
  let key, data, id;
  let body = await request.json();
  if (body.variables.season === undefined){
    id = CryptoJS.MD5(body.variables.start + body.variables.end + body.query).toString();
  } else {
    id = CryptoJS.MD5(body.variables.season + body.query).toString();
  }
  

  let entry = {
    query: body.query,
    response: await serializeResponse(response),
    timestamp: Date.now()
  };
  idbKeyval.set(id, entry, store);
}

async function getCache(request) {
  let data, id;
  try {
    let body = await request.json();
    if (body.variables.season === undefined){
      id = CryptoJS.MD5(body.variables.start + body.variables.end + body.query).toString();
    } else {
      id = CryptoJS.MD5(body.variables.season + body.query).toString();
    }
    data = await idbKeyval.get(id, store);
    if (!data) return null;

    // Check cache max age.
    let cacheControl = request.headers.get('Cache-Control');
    let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
    if (Date.now() - data.timestamp > maxAge * 1000) {
      console.log(`Cache expired. Load from API endpoint.`);
      return null;
    }

    console.log(`Load response from cache.`);
    return new Response(JSON.stringify(data.response.body), data.response);
  } catch (err) {
    return null;
  }
}

async function getPostKey(request) {
  let body = await request.json();
  return JSON.stringify(body);
}