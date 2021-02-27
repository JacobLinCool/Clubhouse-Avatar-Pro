const cache_name = "chap-v1";
let cache_files = ["/", "/static/images/favicon.png"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cache_name).then(cache => {
      console.log("[Service Worker] Caching Files.");
      return cache.addAll(cache_files);
    })
  );
  console.log("[Service Worker] Installed");
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      if (r) {
        console.log(`[Service Worker] Serving Cached File.`, {
          request: e.request,
          response: r
        });
        fetch(e.request).then(response => {
          return caches.open(cache_name).then(cache => {
            console.log("[Service Worker] Caching Resource: " + e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        }).catch(()=>{});
        return r;
      } else {
        console.log(`[Service Worker] Serving Online File.`, {
          request: e.request
        });
        return fetch(e.request).then(response => {
          return caches.open(cache_name).then(cache => {
            console.log("[Service Worker] Caching Resource: " + e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      }
    })
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(key_list => {
      return Promise.all(
        key_list.map(key => {
          if (key !== cache_name) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
