const currentCache = 'restaurantsCache-v1';

self.addEventListener('install', event => {
    const urlsToCache = [
        '/index.html',
        '/restaurant.html',
        '/restaurant.html?id=1',
        '/restaurant.html?id=2',
        '/restaurant.html?id=3',
        '/restaurant.html?id=4',
        '/restaurant.html?id=5',
        '/restaurant.html?id=6',
        '/restaurant.html?id=7',
        '/restaurant.html?id=8',
        '/restaurant.html?id=9',
        '/restaurant.html?id=10',
        '/css/styles.css',
        '/data/restaurants.json',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/dbhelper.js',
        '/img/restaurant-reviews-fav.png',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/img/404-error.jpg'
    ];
    event.waitUntil(
        caches.open(currentCache).then(cache => cache.addAll(urlsToCache)).catch(error => {
            console.log(error);
        })
    );
    
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.filter(cacheName => cacheName !== currentCache).map(cacheName => caches.delete(cacheName))
        ))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request).then(response => {
                if (response.status === 404) {
                    //404 Error image created by Freepik = https://www.freepik.com/free-photos-vectors/business
                    return fetch('/img/404-error.jpg');
                }
                return response;
            });
        })
    );

});