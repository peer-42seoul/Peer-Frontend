import useAxiosWithAuth from '@/api/config'
import { Box, Button, Stack, Typography } from '@mui/material'
import { AxiosInstance } from 'axios'
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getMessaging, onMessage, getToken } from 'firebase/messaging'

const PushAlertBanner = () => {
  const axiosInstance: AxiosInstance = useAxiosWithAuth()
  const [isShowPush, setIsShowPush] = useState<boolean>(true)
  const [isScroll, setIsScroll] = useState<number>(0)

  // const urlBase64ToUint8Array = (base64String: string) => {
  //   const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  //   const base64 = (base64String + padding)
  //     .replace(/-/g, '+')
  //     .replace(/_/g, '/')
  //   const rawData = window.atob(base64)
  //   const outputArray = new Uint8Array(rawData.length)

  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i)
  //   }

  //   return outputArray
  // }

  // const displayNotification = () => {
  //   if ('serviceWorker' in navigator && 'PushManager' in window) {
  //     navigator.serviceWorker.ready.then((swReg) => {
  //       swReg.showNotification('Hello world!')
  //     })
  //   }
  // }

  // const createPushSubscription = (swReg: ServiceWorkerRegistration) => {
  //   // 추후 서버 셋팅 한 뒤 사용
  //   const vapidPublicKey = webpush.generateVAPIDKeys().publicKey
  //   const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey)
  //   swReg.pushManager
  //     .subscribe({
  //       userVisibleOnly: true,
  //       applicationServerKey: convertedVapidPublicKey,
  //     })
  //     .then((newSub) => {
  //       let newSubData = newSub.toJSON()
  //       let newSubString = JSON.stringify(newSubData)

  //       return axiosInstance.post(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/push`,
  //         {
  //           subscription: newSubString,
  //         },
  //       )
  //     })
  //     .then((res) => {
  //       console.log(res)
  //       displayNotification()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // const handlePushNotification = () => {
  //   if ('serviceWorker' in navigator && 'PushManager' in window) {
  //     let reg: ServiceWorkerRegistration

  //     navigator.serviceWorker.ready
  //       .then((swReg) => {
  //         reg = swReg
  //         return swReg.pushManager.getSubscription()
  //       })
  //       .then((subscription) => {
  //         if (subscription === null) {
  //           createPushSubscription(reg)
  //         }
  //       })
  //   }
  // }

  const handlePushFCM = () => {
    const firebaseConfig = initializeApp({
      apiKey: 'AIzaSyCVBmOaZ34Loogn8Ig7SFXTfO10IEThLOw',
      authDomain: 'peer-web-application.firebaseapp.com',
      projectId: 'peer-web-application',
      storageBucket: 'peer-web-application.appspot.com',
      messagingSenderId: '620097618965',
      appId: '1:620097618965:web:81ba270413fec5a173ba1c',
      measurementId: 'G-LM629HF4B9',
    })

    const messaging = getMessaging(firebaseConfig)

    getToken(messaging, {
      vapidKey:
        'BErmL1dcTujcaxfe6OhZOmSg7i0IdDmU2kBoQ3S8fj7U2zbrzfj8oPgoid_9Qy8euy58ThxzGIRCx-3h15_WAGg',
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken)
          axiosInstance
            .post(`http://localhost:8082/api/v1/alarm/send-push`, {
              token: currentToken,
              title: '푸시 알림 테스트',
              message: '푸시 알림 테스트 메시지입니다.',
            })
            .then((res) => {
              console.log(res)
            })
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          )
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
      })

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload)
    })
  }

  const handlePush = () => {
    if ('PushManager' in window) {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.')
          handlePushFCM()
          // handlePushNotification()
          setIsShowPush(false)
          localStorage.setItem('isShowPush', 'false')
        } else {
          console.log('Unable to get permission to notify.')
        }
      })
    }
  }

  const handleScroll = () => {
    setIsScroll(window.scrollY)
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem('isShowPush') === 'false') {
      setIsShowPush(false)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {isShowPush && (
        <Box
          position={'fixed'}
          top={isScroll ? 0 : 57}
          width={'100%'}
          border="1px solid black"
          sx={{
            backgroundColor: 'primary.main',
            zIndex: 9999,
          }}
        >
          <Stack margin={1}>
            <Typography>
              사용하시는 브라우저는 알림 기능을 사용할 수 있습니다.
              사용하시겠습니까?
            </Typography>
            <Stack direction="row">
              <Button onClick={handlePush}>
                <Typography>네</Typography>
              </Button>

              <Button onClick={() => setIsShowPush(false)}>
                <Typography>다음에</Typography>
              </Button>

              <Button
                onClick={() => {
                  setIsShowPush(false)
                  localStorage.setItem('isShowPush', 'false')
                }}
              >
                <Typography>아니요</Typography>
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  )
}

export default PushAlertBanner
