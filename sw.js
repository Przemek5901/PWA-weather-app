const CACHE_NAME = "pwa-cache-v1";
const OFFLINE_URL = "offline.html";

const urlsToCache = [
  "/",
  "/index.html",
  "/form.html",
  "/api.html",
  "/offline.html",
  "/css/base-style.css",
  "/css/form-style.css",
  "/css/index-style.css",
  "/js/db.js",
  "/js/api.js",
  "/assets/logo-big.png",
  "/assets/logo-small.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Caching:", urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.error("Caching failed:", err);
      })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
});
