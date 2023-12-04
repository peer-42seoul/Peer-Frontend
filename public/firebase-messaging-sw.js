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
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/images/icons/icon-72x72.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
