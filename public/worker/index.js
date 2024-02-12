self.addEventListener('push', (event) => {
  // 알림 푸시
  console.log('[Service Worker] Push Received.')
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)
  const data = event.data.json().notification

  const title = data.title
  const options = {
    body: data.body,
    icon: '/images/icons/icon-192x192.png', // TODO: 추후 변경
    link: '/', // TODO: 추후 변경
  }

  event.waitUntil(registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  // 알림 클릭
  console.log('[Service Worker] Notification click Received.')
  event.notification.close()
  // 터치하면 리다이렉션
  event.waitUntil(clients.openWindow(event.notification.data.link))
})

self.addEventListener('install', (event) => {
  // 서비스 워커 설치
  console.log('[Service Worker] Install')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // 서비스 워커 활성화
  console.log('[Service Worker] Activate')
})
