'use client'

import {
  Container,
  Box,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material'
import { useEffect, useState } from 'react'
import EditButton from './EditButton'
import MainCard from './MainCard'
import SearchOption from './SearchOption'
import SelectSort from './SelectSort'
import SelectType from './SelectType'
import { defaultGetFetcher } from '@/api/fetchers'
import useSWR from 'swr'
import MainProfile from './MainProfile'
import MainShowcase from './MainShowcase'
import MainCarousel from './MainCarousel'
import { useSearchParams } from 'next/navigation'
import { useInfiniteScrollHook } from '@/hook/useInfiniteScroll'
import { IPost } from '@/types/IPostDetail'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'
import { AxiosInstance } from 'axios'
import { IPagination } from '@/types/IPagination'
import useMedia from '@/hook/useMedia'
import webpush from 'web-push'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export type ProjectSort = 'latest' | 'hit'
export type ProjectType = 'STUDY' | 'PROJECT'
export interface IDetailOption {
  isInit?: boolean
  due: string
  region1: string
  region2: string
  place: string
  status: string
  tag: string
}

const MainPage = ({ initData }: { initData: IPagination<IPost[]> }) => {
  const { isPc } = useMedia()
  const [isShowInstall, setIsShowInstall] = useState<boolean>(true)
  const [isShowPush, setIsShowPush] = useState<boolean>(true)
  const [content, setContent] = useState<IPost[]>(initData?.content)
  const [page, setPage] = useState<number>(1)
  const [type, setType] = useState<ProjectType | undefined>(undefined) //'STUDY'
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [sort, setSort] = useState<ProjectSort | undefined>(undefined) //'latest'
  /* 추후 디자인 추가되면 schedule 추가하기 */
  const [detailOption, setDetailOption] = useState<IDetailOption>({
    isInit: true,
    due: '',
    region1: '',
    region2: '',
    place: '',
    status: '',
    tag: '',
  })
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword') ?? ''
  const { isLogin } = useAuthStore()
  const axiosInstance: AxiosInstance = useAxiosWithAuth()
  const pageSize = 3
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  /* page가 1이면 서버가 가져온 데이터(initData)로 렌더링 */

  const {
    data: newData,
    isLoading,
    isValidating,
    error,
  } = useSWR<IPagination<IPost[]>>(
    page == 1 && !type && !sort && detailOption.isInit && keyword == ''
      ? null
      : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=${
          type ?? 'STUDY'
        }&sort=${
          sort ?? 'latest'
        }&page=${page}&pageSize=${pageSize}&keyword=${keyword}&due=${
          detailOption.due
        }&region1=${detailOption.region1}&region2=${
          detailOption.region2
        }&place=${detailOption.place}&status=${detailOption.status}&tag=${
          detailOption.tag
        }`,
    isLogin
      ? (url: string) => axiosInstance.get(url).then((res) => res.data)
      : defaultGetFetcher,
  )

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
    if (localStorage && localStorage.getItem('isShowInstall') === 'false') {
      setIsShowInstall(false)
    }

    if (localStorage && localStorage.getItem('isShowPush') === 'false') {
      setIsShowPush(false)
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

    // 테스트 용
    window.addEventListener('push', (event) => {
      const options = {
        body: 'This is a test message!',
        icon: 'images/icon.png',
        badge: 'images/badge.png',
      }
      navigator.serviceWorker.ready.then((swReg) => {
        swReg.showNotification('Test Push', options)
      })
    })
  }, [deferredPrompt, isShowInstall, isShowPush])

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
    // 테스트용
    swReg.pushManager
      .subscribe({
        userVisibleOnly: true,
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

    // 추후 서버 셋팅 한 뒤 사용
    // const vapidPublicKey = webpush.generateVAPIDKeys().publicKey
    // const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey)
    // swReg.pushManager
    //   .subscribe({
    //     userVisibleOnly: true,
    //     applicationServerKey: convertedVapidPublicKey,
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
    //   .catch((err) => {
    //     console.log(err)
    //   })
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
    if (!newData || !newData?.content) return
    //newData가 있어야 업데이트
    if (page == 1) return setContent(newData.content)
    setContent([...content, ...newData.content])
  }, [newData])

  const { target, spinner } = useInfiniteScrollHook(
    setPage,
    isLoading,
    (newData?.last || initData?.last) ?? true, //isEnd
    page,
  )

  const handleType = (value: ProjectType) => {
    setType(value)
    setPage(1) //옵션이 변경되었으므로 page를 1로 초기화
  }

  const handleSort = (value: ProjectSort) => {
    setSort(value)
    setPage(1)
  }

  const handleOption = (value: IDetailOption) => {
    setDetailOption(value)
    setPage(1)
  }

  return (
    <>
      {isShowInstall ? (
        <Box height={'50px'} border="1px solid black">
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
      ) : null}
      {isShowPush ? (
        <Box height={'50px'} border="1px solid black">
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
      ) : null}
      {/* mobile view */}
      <Container className="mobile-layout">
        <Box sx={{ backgroundColor: 'white' }} border="1px solid black">
          <SelectType type={type} setType={handleType} />
          <Grid container p={2}>
            <SearchOption
              openOption={openOption}
              setOpenOption={setOpenOption}
              setDetailOption={handleOption}
            />
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems={'center'}
                justifyContent={'flex-end'}
              >
                <SelectSort sort={sort} setSort={handleSort} />
              </Stack>
            </Grid>
          </Grid>
          {isValidating ? (
            <Typography>로딩중...</Typography>
          ) : error ? (
            <Typography>에러 발생</Typography>
          ) : content?.length == 0 ? (
            <Typography>데이터가 없습니다</Typography>
          ) : (
            <>
              <Stack alignItems={'center'} gap={2}>
                {content?.map((project: IPost, index: number) => (
                  <Box key={index}>
                    <MainCard {...project} type={type} />
                  </Box>
                ))}
              </Stack>
              <Box
                sx={{
                  position: 'fixed',
                  right: 20,
                  bottom: 80,
                }}
              >
                <EditButton />
              </Box>
              {spinner && <CircularProgress />}
              <Box
                sx={{
                  bottom: 0,
                  height: '1vh',
                  backgroundColor: 'primary.main',
                }}
                ref={target}
              />
            </>
          )}
        </Box>
      </Container>
      {/* pc view */}
      <Container
        sx={{ backgroundColor: 'white', border: '1px solid black' }}
        className="pc-layout"
      >
        <Stack direction={'row'} border="1px solid black">
          <Stack flex={1}>
            <Box height={'200px'} border="1px solid black">
              피어 소개 배너
            </Box>
            <SelectType type={type} setType={handleType} pc />
            <Grid container p={2}>
              <SearchOption
                openOption={openOption}
                setOpenOption={setOpenOption}
                setDetailOption={handleOption}
              />
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Typography>모집글</Typography>
                  <SelectSort sort={sort} setSort={handleSort} />
                </Stack>
              </Grid>
            </Grid>
            {isValidating ? (
              <Typography>로딩중...</Typography>
            ) : error ? (
              <Typography>에러 발생</Typography>
            ) : content?.length == 0 ? (
              <Typography>데이터가 없습니다</Typography>
            ) : (
              <>
                <Grid container spacing={2}>
                  {content?.map((project: IPost, index: number) => (
                    <Grid item key={index} sm={12} md={4}>
                      <MainCard {...project} type={type} />
                    </Grid>
                  ))}
                </Grid>
                {spinner && <CircularProgress />}
                <Box
                  sx={{
                    bottom: 0,
                    height: '1vh',
                    backgroundColor: 'primary.main',
                  }}
                  ref={target}
                />
              </>
            )}
          </Stack>
          <Stack width={'250px'} height={'100%'}>
            <MainProfile />
            <MainShowcase />
            <MainCarousel />
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

export default MainPage
