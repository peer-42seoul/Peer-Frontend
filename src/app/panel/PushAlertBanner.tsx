'use client'

import useAxiosWithAuth from '@/api/config'
import { Box, Button, Stack, Typography } from '@mui/material'
import { AxiosInstance } from 'axios'
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getMessaging, onMessage, getToken } from 'firebase/messaging'

const PushAlertBanner = () => {
  const axiosInstance: AxiosInstance = useAxiosWithAuth()
  const [isShowPush, setIsShowPush] = useState<boolean>(false)
  const [isScroll, setIsScroll] = useState<number>(1)

  const handlePushFCM = () => {
    const firebaseConfig = initializeApp({
      apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
      projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
      storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
      messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
      appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
      measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`,
    })

    const messaging = getMessaging(firebaseConfig)

    getToken(messaging, {
      vapidKey: `${process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY}`,
    })
      .then((currentToken: any) => {
        if (currentToken) {
          axiosInstance
            .post(
              `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_CSR_API}:8082/alarm/send-push`,
              {
                token: currentToken,
                title: '푸시 알림 테스트',
                message: '푸시 알림 테스트 메시지입니다.',
              },
            )
            .then((res) => {
              console.log(res)
            })
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          )
        }
      })
      .catch((err: any) => {
        console.log('An error occurred while retrieving token. ', err)
      })

    onMessage(messaging, (payload: any) => {
      console.log('Message received. ', payload)
    })
  }

  const handlePush = () => {
    if ('PushManager' in window) {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.')
          handlePushFCM()
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
    } else {
      setIsShowPush(true)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [setIsShowPush])

  return (
    <>
      {isShowPush && (
        <Box
          position={'sticky'}
          top={isScroll ? 0 : 57}
          width={'100%'}
          sx={{
            backgroundColor: 'primary.main',
            zIndex: 3000,
          }}
        >
          <Stack margin={1}>
            <Typography color={'white'} variant="Caption">
              사용하시는 브라우저는 알림 기능을 사용할 수 있습니다.
              사용하시겠습니까?
            </Typography>
            <Stack direction="row">
              <Button onClick={handlePush}>
                <Typography color={'white'} variant="Caption">
                  네
                </Typography>
              </Button>
              <Button onClick={() => setIsShowPush(false)}>
                <Typography color={'white'} variant="Caption">
                  다음에
                </Typography>
              </Button>
              <Button
                onClick={() => {
                  setIsShowPush(false)
                  localStorage.setItem('isShowPush', 'false')
                }}
              >
                <Typography color={'white'} variant="Caption">
                  아니요
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  )
}

export default PushAlertBanner
