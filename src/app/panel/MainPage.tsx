'use client'

import { Container, Box, Grid, Stack, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import FloatEditButton from './main-page/FloatEditButton'
import MainCard from './main-page/MainCard'
import SelectType from './main-page/SelectType'
import { defaultGetFetcher } from '@/api/fetchers'
import useSWR from 'swr'
import MainProfile from './main-page/MainProfile'
import MainShowcase from './main-page/MainShowcase'
import MainCarousel from './main-page/MainCarousel'
import { useRouter, useSearchParams } from 'next/navigation'
import { useInfiniteScrollHook } from '@/hook/useInfiniteScroll'
import { IFavorite, IPost, ProjectType } from '@/types/IPostDetail'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'
import { AxiosInstance } from 'axios'
import { IPagination } from '@/types/IPagination'
import PwaInstallBanner from './PwaInstallBanner'
import PushAlertBanner from './PushAlertBanner'
import MainBanner from '@/app/panel/main-page/MainBanner'
import io from 'socket.io-client'
import { getCookie } from 'cookies-next'
import useSocket from '@/states/useSocket'
import Tutorial from '@/components/Tutorial'
import { MainPageTutorial } from '@/components/tutorialContent/MainPageTutorial'
import useHeaderStore from '@/states/useHeaderStore'
import NoDataDolphin from '@/components/NoDataDolphin'
import {
  cardStyle,
  containerStyle,
  floatButtonStyle,
  sideMenuStyle,
} from '@/app/panel/main-page/Mainpage.style'
import SearchOptionPanel, {
  InfinityScrollPanel,
} from '@/app/panel/main-page/MainPanel'
import SelectSort from '@/app/panel/main-page/SelectSort'

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>

  prompt(): Promise<void>
}

export type ProjectSort = 'latest' | 'hit'

export interface IDetailOption {
  isInit?: boolean
  due1: number
  due2: number
  region1: string
  region2: string
  place: string
  status: string
  tag: string
}

export const socket = getCookie('accessToken')
  ? io(`${process.env.NEXT_PUBLIC_SOCKET}`, {
      transports: ['socket.io', 'polling'],
      query: {
        token: getCookie('accessToken'),
      },
    })
  : null

const MainPage = ({ initData }: { initData: IPagination<IPost[]> }) => {
  const router = useRouter()
  const [page, setPage] = useState<number>(1)
  const [type, setType] = useState<ProjectType | undefined>(undefined) //'STUDY'
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [sort, setSort] = useState<ProjectSort | undefined>(undefined) //'latest'
  const { setSocket } = useSocket()
  const [detailOption, setDetailOption] = useState<IDetailOption>({
    isInit: true,
    due1: 0,
    due2: 100,
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
  const [prevScrollHeight, setPrevScrollHeight] = useState<number | undefined>(
    undefined,
  )
  const { headerTitle, setHeaderTitle } = useHeaderStore()
  const [init, setInit] = useState<boolean>(true)

  useEffect(() => {
    if (keyword !== '') {
      setHeaderTitle(keyword + ' 검색 결과')
      setInit(false)
    } else setHeaderTitle('')
  }, [keyword])

  /* page가 1이면 서버가 가져온 데이터(initData)로 렌더링 */

  const dueObject: { [key: number]: string } = {
    0: '1주일',
    20: '1개월',
    40: '3개월',
    60: '6개월',
    80: '9개월',
    100: '12개월 이상',
  }
  const pageSize = 6
  const option = `?type=${type ?? 'STUDY'}&sort=${
    sort ?? 'latest'
  }&page=${page}&pageSize=${pageSize}&keyword=${keyword}&due=${
    dueObject[detailOption.due1]
  }&due=${dueObject[detailOption.due2]}&region1=${
    detailOption.region1
  }&region2=${detailOption.region2}&place=${detailOption.place}&status=${
    detailOption.status
  }&tag=${detailOption.tag}`

  const isInit =
    page == 1 && !type && !sort && detailOption.isInit && keyword == '' && init

  const { data: favoriteData } = useSWR<IFavorite[]>(
    isInit && isLogin
      ? `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/recruit/favorites` + option
      : null,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
  )

  const getFavoriteData = (recruit_id: number) => {
    const res = favoriteData?.find((data) => data?.recruit_id === recruit_id)
    return res?.favorite
  }

  const {
    data: newData,
    isLoading,
    error,
  } = useSWR<IPagination<IPost[]>>(
    isInit
      ? null
      : `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/recruit` + option,
    isLogin
      ? (url: string) =>
          axiosInstance.get(url).then((res) => {
            return res.data
          })
      : defaultGetFetcher,
  )

  const [content, setContent] = useState<IPost[]>(
    initData?.content.map((v) => ({
      ...v,
      favorite: getFavoriteData(v.recruit_id),
    })) ?? [],
  )

  useEffect(() => {
    if (socket && isLogin) {
      socket.on('connect', () => {
        console.log('socket connected')
      })
      socket.on('disconnect', () => {
        console.log('socket disconnected')
      })
      socket.on('connect_error', (err) => {
        console.log(err)
      })
      socket.on('reconnect', (attemptNumber) => {
        console.log('reconnect', attemptNumber)
      })
      socket.on('reconnect_attempt', (attemptNumber) => {
        console.log('reconnect_attempt', attemptNumber)
      })
      setSocket(socket)
    }
  }, [])

  useEffect(() => {
    if (!newData || !newData?.content) return
    //page가 1일 경우 == initData가 설정되어있을경우, 무한스크롤시 page는 무조건 2부터 시작함.
    //따라서 page가 1일 경우에는 옵션이 달라진 것임. 고로 무조건 새로운 데이터로 setContent를 해준다.
    if (page == 1) {
      setContent(newData.content)
      return
    }
    //여기서부터는 무한스크롤 영역. 길이가 0이면 더해주지 않는다.
    if (newData?.content.length == 0) return
    //이전 데이터와 새로운 데이터를 더해준다
    setContent([...content, ...newData.content])
    //이전 스크롤 높이로 설정
    setPrevScrollHeight(target.current?.scrollHeight)
    if (target.current && prevScrollHeight)
      scrollTo(target.current.scrollHeight - prevScrollHeight)
  }, [newData])

  const { target, spinner, scrollTo } = useInfiniteScrollHook(
    setPage,
    isLoading,
    (newData?.last || initData?.last) ?? true, //isEnd
    page,
  )

  const handleType = useCallback(
    (value: ProjectType) => {
      setType(value)
      //type이 변경될 경우 초기화
      setPage(1)
      setDetailOption({
        due1: 0,
        due2: 100,
        region1: '',
        region2: '',
        place: '',
        status: '',
        tag: '',
      })
      setSort('latest')
      router.push('/')
    },
    [router],
  )

  const handleSort = useCallback((value: ProjectSort) => {
    setSort(value)
    setPage(1)
  }, [])

  const handleOption = useCallback((value: IDetailOption) => {
    setDetailOption(value)
    setPage(1)
  }, [])

  const noContent = error
    ? '에러 발생'
    : content?.length == 0
      ? '데이터가 없습니다'
      : null

  return (
    <>
      <PushAlertBanner />
      {/* mobile view */}
      <div className="mobile-layout">
        <Container sx={containerStyle}>
          {keyword === '' ? (
            <>
              <MainBanner />

              <Box marginY={'0.5rem'}>
                <SelectType type={type} setType={handleType} />
              </Box>

              <SearchOptionPanel
                handleOption={handleOption}
                type={type}
                openOption={openOption}
                setOpenOption={setOpenOption}
                sort={sort}
                handleSort={handleSort}
              />
            </>
          ) : (
            <Stack
              direction="row"
              alignItems={'center'}
              justifyContent={'space-between'}
              my={'0.75rem'}
            >
              <Typography variant={'Body1'}>{headerTitle}</Typography>
              <SelectSort sort={sort} setSort={handleSort} />
            </Stack>
          )}
          {/*card list 영역*/}
          {noContent ? (
            <Stack
              width={'100%'}
              height={'100%'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <NoDataDolphin
                message={noContent}
                backgroundColor={'background.primary'}
              />
            </Stack>
          ) : (
            <>
              <Stack alignItems={'center'}>
                <Stack gap={2} width={'100%'}>
                  {content?.map((project: IPost) => (
                    <Box key={project.recruit_id}>
                      <MainCard
                        {...project}
                        type={type}
                        favorite={
                          isInit
                            ? getFavoriteData(project.recruit_id)
                            : project.favorite
                        }
                        sx={cardStyle}
                      />
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </>
          )}
          <Box sx={floatButtonStyle}>
            <FloatEditButton />
          </Box>
          {/* 무한 스크롤 */}
          <InfinityScrollPanel target={target} spinner={spinner} />
        </Container>
      </div>

      {/* pc view */}
      <div className="pc-layout">
        <Container sx={containerStyle}>
          <Stack direction={'row'} spacing={4}>
            <Stack flex={1} gap={'0.5rem'}>
              {keyword === '' ? (
                <>
                  <MainBanner />

                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <SelectType type={type} setType={handleType} />
                    <Tutorial
                      title={'프로젝트 검색'}
                      content={<MainPageTutorial />}
                    />
                  </Stack>
                  <SearchOptionPanel
                    handleOption={handleOption}
                    type={type}
                    openOption={openOption}
                    setOpenOption={setOpenOption}
                    sort={sort}
                    handleSort={handleSort}
                    isPc
                  />
                </>
              ) : (
                <Stack
                  direction="row"
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  mb={'0.75rem'}
                >
                  <Typography variant={'Body1'}>{headerTitle}</Typography>
                  <SelectSort sort={sort} setSort={handleSort} />
                </Stack>
              )}
              {/*card list 영역*/}
              {noContent ? (
                <Stack
                  width={'100%'}
                  height={'100%'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <NoDataDolphin
                    message={noContent}
                    backgroundColor={'background.primary'}
                  />
                </Stack>
              ) : (
                <>
                  <Grid container spacing={'1rem'}>
                    {content?.map((project: IPost) => (
                      <Grid item key={project.recruit_id} sm={12} md={6} lg={4}>
                        <MainCard
                          {...project}
                          type={type}
                          favorite={
                            isInit
                              ? getFavoriteData(project.recruit_id)
                              : project.favorite
                          }
                          sx={cardStyle}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  {/* 무한 스크롤 */}
                  <InfinityScrollPanel target={target} spinner={spinner} />
                </>
              )}
            </Stack>
            <Stack sx={sideMenuStyle}>
              <MainProfile />
              <MainShowcase />
              <MainCarousel />
            </Stack>
          </Stack>
        </Container>
      </div>
      <PwaInstallBanner />
    </>
  )
}

export default MainPage
