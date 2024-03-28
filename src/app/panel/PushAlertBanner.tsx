'use client'

import useAxiosWithAuth from '@/api/config'
import { Box, Button, Stack, Typography } from '@mui/material'
import { AxiosInstance } from 'axios'
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getMessaging, onMessage, getToken } from 'firebase/messaging'
import { EDeviceType } from '@/types/DeviceTypes'
import useToast from '@/states/useToast'
import useMedia from '@/hook/useMedia'

const PushAlertBanner = () => {
  const { isPc } = useMedia()
  const axiosInstance: AxiosInstance = useAxiosWithAuth()
  const [isShowPush, setIsShowPush] = useState<boolean>(false)
  const [userAgent, setUserAgent] = useState<EDeviceType>(EDeviceType.OTHER)
  const { openToast } = useToast()

  const handlePushFCM = () => {
    const firebaseConfig = initializeApp({
      apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_APIKEY}`,
      authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN}`,
      projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECTID}`,
      storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET}`,
      messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID}`,
      appId: `${process.env.NEXT_PUBLIC_FIREBASE_APPID}`,
      measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID}`,
    })

    const messaging = getMessaging(firebaseConfig)

    getToken(messaging, {
      vapidKey: `${process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY}`,
    })
      .then((currentToken: any) => {
        if (currentToken) {
          axiosInstance
            .put(
              `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/noti-pwa/spring/subscription`,
              {
                firebaseToken: currentToken,
                deviceInfo: userAgent,
              },
            )
            .then(() => {
              console.log('푸시 알림 전송 성공')
              // 배너 아예 안보이기
              setIsShowPush(false)
              localStorage.setItem('isShowPush', 'false')
              openToast({
                message: '푸시 알림을 성공적으로 설정했습니다.',
                severity: 'success',
              })
            })
            .catch(() => {
              console.log('푸시 알림 전송 실패')
              openToast({
                message:
                  '푸시 알림을 사용할 수 없습니다. 잠시후 다시 시도해주세요.',
                severity: 'error',
              })
              // 배너 일시적으로 가리기
              setIsShowPush(false)
            })
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          )
        }
      })
      .catch((e: any) => {
        console.log('An error occurred while retrieving token.')
        console.error(e)
        // 배너 일시적으로 가리기
        setIsShowPush(false)
        openToast({
          message: '푸시 알림을 사용할 수 없습니다. 잠시후 다시 시도해주세요.',
          severity: 'error',
        })
      })

    onMessage(messaging, () => {
      console.log('Message received.')
    })
  }

  const handlePush = () => {
    if ('PushManager' in window) {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.')
          handlePushFCM()
        } else {
          console.log('Unable to get permission to notify.')
        }
      })
    }
  }

  // 유저의 기기 정보를 가져오는 부분: 알림 부분 참고
  useEffect(() => {
    if (navigator.userAgent.match(/(iPhone|iPod)/)) {
      setUserAgent(EDeviceType.IPHONE)
    } else if (navigator.userAgent.match(/android|Android/)) {
      setUserAgent(EDeviceType.ANDROID)
    } else if (navigator.userAgent.match(/mac|Mac/)) {
      setUserAgent(EDeviceType.MACOS)
    } else if (navigator.userAgent.match(/windows|Windows/)) {
      setUserAgent(EDeviceType.WINDOWS)
    } else {
      setUserAgent(EDeviceType.OTHER)
    }
  }, [])

  // PWA 알림 배너 노출 여부를 지정
  useEffect(() => {
    if (localStorage && localStorage.getItem('isShowPush') === 'false') {
      setIsShowPush(false)
    } else {
      setIsShowPush(true)
    }
  }, [setIsShowPush])

  return (
    <>
      {isShowPush && (
        <Box
          position={'sticky'}
          top={56}
          width={'100%'}
          sx={{
            backgroundColor: 'primary.main',
            zIndex: 3000,
          }}
        >
          <Stack padding={'0.5rem'} spacing={'1rem'}>
            <Typography color={'white'} variant="Body1">
              사용하시는 브라우저는 알림 기능을 사용할 수 있습니다.
              사용하시겠습니까?
            </Typography>
            <Stack
              direction="row"
              alignItems={'center'}
              display={'flex'}
              flexDirection={isPc ? 'row' : 'row-reverse'}
            >
              <Button
                onClick={handlePush}
                variant={'contained'}
                color="secondary"
              >
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
