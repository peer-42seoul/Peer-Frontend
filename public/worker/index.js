self.addEventListener('push', (event) => {
  // 알림 푸시
  console.log('[Service Worker] Push Received.')
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)
  const { title, body } = event.data.json()

  event.waitUntil(self.registration.showNotification(title, { body }))
})

self.addEventListener('notificationclick', (event) => {
  // 알림 클릭
  console.log('[Service Worker] Notification click Received.')
  clients.openWindow(event.notification.data.link)
})
