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

  useEffect(() => {
    if (localStorage && localStorage.getItem('isShowInstall') === 'false') {
      setIsShowInstall(false)
    }

    const requestPermission = async () => {
      const permission = await window.Notification.requestPermission()
      if (permission !== 'granted') {
        console.log('Permission denied')
      } else {
        console.log('Permission granted')
      }
    }

    if (window.Notification) {
      requestPermission()
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('sw.js')
        .then((reg) => {
          reg.pushManager.subscribe().then((sub) => {
            console.log('endpoint:', sub.endpoint)
          })
        })
        .catch((err) => {
          console.log('Service worker failed', err.message)
        })
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
              <Button
                onClick={() => {
                  if (!deferredPrompt) return
                  // @ts-ignore
                  deferredPrompt.prompt()
                }}
              >
                설치
              </Button>
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
