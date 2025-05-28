// version: v1.1.0

const CACHE_NAME = 'enata-cache-v110';
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'cardList.js',
  'manifest.json',
  'images/icon-192.png',
  'images/icon-512.png',
  'images/tarot_back.png'
];

// 설치 단계: 캐시 파일 저장
self.addEventListener("install", event => {
  console.log("✅ [Service Worker] 설치됨: 캐싱 시작");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// 활성화 단계: 이전 캐시 제거
self.addEventListener("activate", event => {
  console.log("♻️ [Service Worker] 활성화됨: 이전 캐시 제거");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log("🧹 [Service Worker] 캐시 삭제:", name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// 요청 처리 단계: 캐시 우선, 없으면 네트워크
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
