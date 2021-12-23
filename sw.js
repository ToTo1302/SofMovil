// imports
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/index-css.css',
    '/js/app.js',
    '/js/onsen.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'https://unpkg.com/onsenui/css/onsenui.css',
    'https://unpkg.com/onsenui/css/onsen-css-components.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
    'https://unpkg.com/onsenui/js/onsenui.min.js',
    '/css/animate.css',
    '/js/libs/jquery.js'
];


self.addEventListener('install', e => {

    const cacheStatic = caches.open(STATIC_CACHE)
        .then(cache =>
            cache.addAll(APP_SHELL))
        .catch(err => console.log('install APP_SHELL error:', err));

    const cacheInmutable = caches.open(INMUTABLE_CACHE)
        .then(cache =>
            cache.addAll(APP_SHELL_INMUTABLE))
        .catch(err => console.log('install APP_SHELL_INMUTABLE error:', err));

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {

            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

            if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);

});


self.addEventListener('fetch', e => {

    const respuesta = caches.match(e.request).then(res => {

        if (res) {
            return res;
        } else {

            return fetch(e.request).then(newRes => {

                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);

            });

        }

    });

    e.respondWith(respuesta);

});