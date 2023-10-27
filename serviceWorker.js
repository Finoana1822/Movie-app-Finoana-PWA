const staticDevCoffee = "PWA";
const toPutInCache = ["index.html", "./css/style.css"]
const fetchData = async () => {
  let data = await fetch(url).then((data) => data.json());
  return data;
}

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(async cache => {
      // let data = await fetchData()
      cache.addAll(toPutInCache);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
