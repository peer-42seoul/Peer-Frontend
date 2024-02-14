'use client'

import useMedia from '@/hook/useMedia'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { BeforeInstallPromptEvent } from './MainPage'
import IosShareIcon from '@mui/icons-material/IosShare'
import CloseIcon from '@mui/icons-material/Close'

declare global {
  interface Window {
    MSStream: any
  }
}

const PwaInstallBanner = () => {
  const [isShowInstall, setIsShowInstall] = useState(false)
  const { isPc } = useMedia()
  const [isSafari, setIsSafari] = useState(false)
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
          setIsShowInstall(false)
          localStorage.setItem('isShowInstall', 'false')
        } else {
          console.log('User dismissed the install prompt')
        }
      })
    } else {
      console.log('not install')
    }
  }

  useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      localStorage.getItem('isShowInstall') === 'false'
    ) {
      setIsShowInstall(false)
    } else {
      setIsShowInstall(true)
    }

    const isSafariBrowser =
      navigator.userAgent.includes('Safari') &&
      !navigator.userAgent.includes('Chrome')
    setIsSafari(isSafariBrowser)

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsShowInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', () => {
      console.log('installed')
      setIsShowInstall(false)
    })

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
      window.removeEventListener('appinstalled', () => {
        console.log('installed')
        setIsShowInstall(false)
      })
    }
  }, [deferredPrompt, setIsShowInstall])

  if (isSafari)
    return (
      <>
        {isShowInstall && (
          <Box
            position={'sticky'}
            bottom={isPc ? '0' : '76px'}
            width={'100%'}
            sx={{
              backgroundColor: 'primary.main',
              zIndex: 9999,
              paddingBottom: 0.2,
            }}
          >
            <Stack
              margin={1}
              direction={'row'}
              justifyContent={'space-between'}
            >
              <Typography color={'white'} variant="Caption">
                사용하시는 브라우저는 PWA 기능을 사용하기 위해서는{' '}
                <IosShareIcon fontSize="small" />
                [공유하기 버튼]을 눌러서 [홈 화면에 추가]를 해주셔야 합니다.
              </Typography>

              <IconButton
                onClick={() => {
                  setIsShowInstall(false)
                  localStorage.setItem('isShowInstall', 'false')
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
        )}
      </>
    )

  return (
    <>
      {isShowInstall && (
        <Box
          position={'sticky'}
          bottom={isPc ? '0' : '76px'}
          width={'100%'}
          sx={{
            backgroundColor: 'primary.main',
            zIndex: 9999,
            paddingBottom: 0.2,
          }}
        >
          <Stack margin={1}>
            <Typography color={'white'} variant="Caption">
              사용하시는 브라우저는 PWA 기능을 사용할 수 있습니다.{' '}
              {isPc ? '데스크탑' : '모바일'}에 설치하시겠습니까?
            </Typography>
            <Stack direction="row">
              <Button onClick={handleInstall}>
                <Typography color={'white'} variant="Caption">
                  설치
                </Typography>
              </Button>
              <Button onClick={() => setIsShowInstall(false)}>
                <Typography color={'white'} variant="Caption">
                  다음에
                </Typography>
              </Button>
              <Button
                onClick={() => {
                  setIsShowInstall(false)
                  localStorage.setItem('isShowInstall', 'false')
                }}
              >
                <Typography color={'white'} variant="Caption">
                  닫기
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  )
}

export default PwaInstallBanner
