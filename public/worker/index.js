importScripts(
  'https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js',
)

const firebaseConfig = {
  apiKey: 'AIzaSyCVBmOaZ34Loogn8Ig7SFXTfO10IEThLOw',
  authDomain: 'peer-web-application.firebaseapp.com',
  projectId: 'peer-web-application',
  storageBucket: 'peer-web-application.appspot.com',
  messagingSenderId: '620097618965',
  appId: '1:620097618965:web:81ba270413fec5a173ba1c',
  measurementId: 'G-LM629HF4B9',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  )
  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/images/icons/icon-192x192.png',
    link: '/', // 추후 변경
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('push', (event) => {
  // 알림 푸시
  console.log('[Service Worker] Push Received.')
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)
  const data = event.data.json().notification

  const title = data.title
  const options = {
    body: data.body,
    icon: '/images/icons/icon-192x192.png',
    link: '/', // 추후 변경
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
