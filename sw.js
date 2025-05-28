self.addEventListener("install", (e) => {
  console.log("Service Worker installed");
});

self.addEventListener("fetch", (e) => {
  // 모든 요청을 그냥 통과시킴 (캐싱 안함)
});
