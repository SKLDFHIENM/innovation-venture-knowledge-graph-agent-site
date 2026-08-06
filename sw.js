/* Service Worker — 网络优先，离线兜底（避免缓存陈旧资源） */
const CACHE = 'ivk-cache-v1';
const SHELL = [
    './',
    './index.html',
    './resources.html',
    './css/style.css',
    './css/ux-enhance.css',
    './js/all.min.js',
    './js/ux-enhance.js',
    './js/resources_tools.js',
    './js/resources_extra.js'
];

self.addEventListener('install', function (e) {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE).then(function (c) {
        return c.addAll(SHELL);
    }).catch(function () { /* 离线缓存预载失败不阻塞安装 */ }));
});

self.addEventListener('activate', function (e) {
    e.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }));
    self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    var req = e.request;
    if (req.method !== 'GET') return;
    e.respondWith(
        fetch(req).then(function (res) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put(req, copy); });
            return res;
        }).catch(function () {
            return caches.match(req).then(function (r) { return r || caches.match('./'); });
        })
    );
});
