import useMedia from '@/hook/useMedia'
import { Box, Button, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { BeforeInstallPromptEvent } from './MainPage'

const PwaInstallBanner = () => {
  const [isShowInstall, setIsShowInstall] = useState(true)
  const { isPc } = useMedia()
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log(choiceResult.outcome)
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
          setIsShowInstall(false)
          localStorage.setItem('isShowInstall', 'false')
        } else {
          console.log('User dismissed the install prompt')
        }
      })
    }
  }

  useEffect(() => {
    if (localStorage.getItem('isShowInstall') === 'false') {
      setIsShowInstall(false)
    }
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
  }, [deferredPrompt, isShowInstall])

  return (
    <>
      {isShowInstall && (
        <Box
          position={'fixed'}
          bottom={0}
          width={'100%'}
          height={'50px'}
          border="1px solid black"
          sx={{ backgroundColor: 'white', zIndex: 9999 }}
        >
          <Stack>
            사용하시는 브라우저는 PWA 기능을 사용할 수 있습니다.{' '}
            {isPc ? '데스크탑' : '모바일'}에 설치하시겠습니까?
            <Stack direction="row">
              <Button onClick={handleInstall}>설치</Button>
              <Button onClick={() => setIsShowInstall(false)}>다음에</Button>
              <Button
                onClick={() => {
                  setIsShowInstall(false)
                  localStorage.setItem('isShowInstall', 'false')
                }}
              >
                닫기
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  )
}

export default PwaInstallBanner
