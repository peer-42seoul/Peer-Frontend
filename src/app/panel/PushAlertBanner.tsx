import useAxiosWithAuth from '@/api/config'
import { Box, Button, Stack } from '@mui/material'
import { AxiosInstance } from 'axios'
import { use, useEffect, useState } from 'react'
import webpush from 'web-push'

const PushAlertBanner = () => {
  const axiosInstance: AxiosInstance = useAxiosWithAuth()
  const [isShowPush, setIsShowPush] = useState<boolean>(true)

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }

    return outputArray
  }

  const displayNotification = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then((swReg) => {
        swReg.showNotification('Hello world!')
      })
    }
  }

  const createPushSubscription = (swReg: ServiceWorkerRegistration) => {
    // // 테스트용
    // swReg.pushManager
    //   .subscribe({
    //     userVisibleOnly: true,
    //   })
    //   .then((newSub) => {
    //     let newSubData = newSub.toJSON()
    //     let newSubString = JSON.stringify(newSubData)

    //     return axiosInstance.post(
    //       `${process.env.NEXT_PUBLIC_API_URL}/api/v1/push`,
    //       {
    //         subscription: newSubString,
    //       },
    //     )
    //   })
    //   .then((res) => {
    //     console.log(res)
    //     displayNotification()
    //   })

    // 추후 서버 셋팅 한 뒤 사용
    const vapidPublicKey = webpush.generateVAPIDKeys().publicKey
    const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey)
    swReg.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidPublicKey,
      })
      .then((newSub) => {
        let newSubData = newSub.toJSON()
        let newSubString = JSON.stringify(newSubData)

        return axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/push`,
          {
            subscription: newSubString,
          },
        )
      })
      .then((res) => {
        console.log(res)
        displayNotification()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handlePushNotification = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      let reg: ServiceWorkerRegistration

      navigator.serviceWorker.ready
        .then((swReg) => {
          reg = swReg
          return swReg.pushManager.getSubscription()
        })
        .then((subscription) => {
          if (subscription === null) {
            createPushSubscription(reg)
          }
        })
    }
  }

  const handlePush = () => {
    if ('PushManager' in window) {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.')
          handlePushNotification()
          setIsShowPush(false)
          localStorage.setItem('isShowPush', 'false')
        } else {
          console.log('Unable to get permission to notify.')
        }
      })
    }
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem('isShowPush') === 'false') {
      setIsShowPush(false)
    }
  }, [])

  return (
    <>
      {isShowPush && (
        <Box
          position={'fixed'}
          top={57}
          width={'100%'}
          height={'50px'}
          border="1px solid black"
          sx={{ backgroundColor: 'white', zIndex: 9999 }}
        >
          <Stack>
            사용하시는 브라우저는 알림 기능을 사용할 수 있습니다.
            사용하시겠습니까?
            <Stack direction="row">
              <Button onClick={handlePush}>네</Button>
              <Button onClick={() => setIsShowPush(false)}>다음에</Button>
              <Button
                onClick={() => {
                  setIsShowPush(false)
                  localStorage.setItem('isShowPush', 'false')
                }}
              >
                아니요
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  )
}

export default PushAlertBanner
