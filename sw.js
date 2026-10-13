/* 離線快取：只處理同網站的檔案，不連到任何外部網址。
   網頁與設定檔：先試網路（3 秒內），成功就更新快取；沒網路或太慢就用快取。
   所以賣家更新 config.js 後，客人下次有網路打開就會拿到新版。
   照片與圖示：先用快取。要換照片時請換檔名（例如 01.jpg → 01b.jpg），舊手機才會抓新圖。 */
const CACHE = "ourdays-v1";
const CORE = ["./", "./index.html", "./config.js", "./manifest.json",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./icons/favicon-32.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("ourdays-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function fromNetwork(req) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), 3000);
    fetch(req).then(res => {
      clearTimeout(t);
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      }
      resolve(res);
    }, err => { clearTimeout(t); reject(err); });
  });
}

self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  // 雲端相簿 API 由頁面自己處理（需要配對碼），這裡不攔截
  if (req.method !== "GET" || url.origin !== self.location.origin || url.pathname.includes("/api/")) return;
  // 照片與圖示幾乎不會變：先用快取，立刻顯示
  if (/\/(photos|icons)\//.test(url.pathname)) {
    e.respondWith(caches.match(req).then(hit => hit || fromNetwork(req).catch(() =>
      new Response("", { status: 504, statusText: "offline" }))));
    return;
  }
  e.respondWith(fromNetwork(req).catch(async () => {
    const hit = await caches.match(req, { ignoreSearch: req.mode === "navigate" });
    if (hit) return hit;
    if (req.mode === "navigate") {
      const page = await caches.match("./index.html");
      if (page) return page;
    }
    return new Response("", { status: 504, statusText: "offline" });
  }));
});

// 頁面載入後會送來相簿照片清單，先存起來，離線也看得到
self.addEventListener("message", e => {
  const d = e.data;
  if (!d || d.type !== "ourdays-cache-photos" || !Array.isArray(d.urls)) return;
  const urls = d.urls.filter(u => typeof u === "string" && new URL(u, self.location.href).origin === self.location.origin);
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(urls.map(u =>
    c.match(u).then(hit => hit || c.add(u).catch(() => {}))))));
});
