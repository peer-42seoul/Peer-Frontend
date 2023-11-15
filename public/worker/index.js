self.addEventListener('push', function (event) {
  // 알림 푸시
  console.log('[Service Worker] Push Received.')
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    image: data.image,
    tag: data.tag,
    renotify: data.renotify,
    data: {
      url: data.url,
    },
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('sync', function (event) {
  //백그라운드 동기화
  console.log('sync event', event)
})
