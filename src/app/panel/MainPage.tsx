'use client'

import {
  Container,
  Box,
  Grid,
  Stack,
  Typography,
  Pagination,
} from '@mui/material'
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
import { IFavorite, IPost, ProjectType } from '@/types/IPostDetail'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'
import { AxiosInstance } from 'axios'
import { IPagination } from '@/types/IPagination'
import PwaInstallBanner from './PwaInstallBanner'
import PushAlertBanner from './PushAlertBanner'
import MainBanner from '@/app/panel/main-page/MainBanner'
import Tutorial from '@/components/Tutorial'
import { MainPageTutorial } from '@/components/tutorialContent/MainPageTutorial'
import NoDataDolphin from '@/components/NoDataDolphin'
import {
  cardStyle,
  containerStyle,
  floatButtonStyle,
  sideMenuStyle,
} from '@/app/panel/main-page/Mainpage.style'
import SearchOptionPanel from '@/app/panel/main-page/MainPanel'
import SelectSort from '@/app/panel/main-page/SelectSort'
import useMedia from '@/hook/useMedia'

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

const MainPage = ({ initData }: { initData: IPagination<IPost[]> }) => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword') ?? ''
  const searchType =
    searchParams.get('type') === 'PROJECT' ? 'PROJECT' : 'STUDY'
  const router = useRouter()
  const [page, setPage] = useState<number>(1)
  const [type, setType] = useState<ProjectType>(searchType) //'STUDY'
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [sort, setSort] = useState<ProjectSort | undefined>(undefined) //'latest'
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

  const { isLogin } = useAuthStore()
  const axiosInstance: AxiosInstance = useAxiosWithAuth()
  const [init, setInit] = useState<boolean>(true)
  const { isTablet } = useMedia()

  useEffect(() => {
    if (keyword !== '') {
      setType(searchType)
      setInit(false)
    }
  }, [keyword, searchType])

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
    page == 1 && !sort && detailOption.isInit && keyword == '' && init

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

  const { data, isLoading, error } = useSWR<IPagination<IPost[]>>(
    `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/recruit` + option,
    isLogin
      ? (url: string) =>
          axiosInstance.get(url).then((res) => {
            return res.data
          })
      : defaultGetFetcher,
    {
      fallbackData: initData,
      keepPreviousData: true,
    },
  )

  const handleType = useCallback(
    (value: ProjectType) => {
      setInit(false)
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
      router.replace(`?type=${value}`)
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

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage)
  }

  const noContent = !isLoading
    ? error
      ? '에러 발생'
      : data?.content?.length == 0
        ? '데이터가 없습니다'
        : null
    : null

  return (
    <>
      <PushAlertBanner />
      {/* mobile view */}
      <div className="mobile-layout">
        <Container sx={{ ...containerStyle, paddingBottom: '2rem' }}>
          {keyword === '' ? (
            <>
              <Box width={'100%'}>
                <MainBanner />
              </Box>
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
              <Stack direction="row" gap={'0.25rem'}>
                <Typography variant={'Body1Emphasis'}>{keyword}</Typography>
                <Typography variant={'Body1'}>검색 결과</Typography>
              </Stack>
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
                  {data?.content?.map((project: IPost) => (
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
              <Stack alignItems={'center'} mt={'1rem'}>
                <Pagination
                  count={data?.totalPages}
                  page={page}
                  onChange={handleChangePage}
                  siblingCount={0}
                />
              </Stack>
            </>
          )}
          <Box sx={floatButtonStyle}>
            <FloatEditButton />
          </Box>
        </Container>
      </div>

      {/* pc view */}
      <div className="pc-layout">
        <Container sx={containerStyle}>
          <Stack direction={'row'} spacing={4}>
            <Stack flex={1} gap={'0.5rem'}>
              {keyword === '' ? (
                <>
                  <Box width={'100%'}>
                    <MainBanner />
                  </Box>
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
                  <Stack direction="row" gap={'0.25rem'}>
                    <Typography variant={'Body1Emphasis'}>{keyword}</Typography>
                    <Typography variant={'Body1'}>검색 결과 </Typography>
                  </Stack>
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
                    {data?.content?.map((project: IPost) => (
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
                </>
              )}
              <Stack alignItems={'center'} mt={'1rem'}>
                <Pagination
                  count={data?.totalPages}
                  page={page}
                  onChange={handleChangePage}
                />
              </Stack>
            </Stack>
            {!isTablet && (
              <Stack sx={sideMenuStyle}>
                <MainProfile />
                <MainShowcase />
                <MainCarousel />
              </Stack>
            )}
          </Stack>
        </Container>
      </div>
      <PwaInstallBanner />
    </>
  )
}

export default MainPage
