import {
  cardStyle,
  containerStyle,
  sideMenuStyle,
} from '@/app/panel/main-page/Mainpage.style'
import {
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import MainBanner from '@/app/panel/main-page/MainBanner'
import SelectType from '@/app/panel/main-page/SelectType'
import Tutorial from '@/components/Tutorial'
import { MainPageTutorial } from '@/components/tutorialContent/MainPageTutorial'
import SearchOptionPanel from '@/app/panel/main-page/MainPanel'
import SelectSort from '@/app/panel/main-page/SelectSort'
import NoDataDolphin from '@/components/NoDataDolphin'
import { IPost } from '@/types/IPostDetail'
import MainCard from '@/app/panel/main-page/MainCard'
import MainProfile from '@/app/panel/main-page/MainProfile'
import MainShowcase from '@/app/panel/main-page/MainShowcase'
import MainCarousel from '@/app/panel/main-page/MainCarousel'
import { IPagination } from '@/types/IPagination'
import useMainOptions from '@/hook/main-page/useMainOptions'
import useMainCards from '@/hook/main-page/useMainCards'
import useMainOptionsStore from '@/states/main-page/useMainOptionsStore'
import useFavoriteList from '@/hook/main-page/useFavoriteList'

const MainPcView = ({ initData }: { initData: IPagination<IPost[]> }) => {
  const { isInit, handleSort, handleType, handleChangePage, queryKeyword } =
    useMainOptions()
  const { data, noContent } = useMainCards(initData)
  const { page, type, sort } = useMainOptionsStore()
  const { getFavoriteData } = useFavoriteList()

  return (
    <Container sx={containerStyle}>
      <Stack direction={'row'} spacing={4}>
        <Stack flex={1} gap={'0.5rem'}>
          {queryKeyword === '' ? (
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
                type={type}
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
                <Typography variant={'Body1Emphasis'}>
                  {queryKeyword}
                </Typography>
                <Typography variant={'Body1'}>검색 결과 </Typography>
              </Stack>
              <SelectSort />
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
        </Stack>
        <Stack sx={sideMenuStyle} className={'side-layout'}>
          <MainProfile />
          <MainShowcase />
          <MainCarousel />
        </Stack>
      </Stack>
      <Stack alignItems={'center'} my={'1rem'}>
        <Pagination
          count={data?.totalPages}
          page={page}
          onChange={handleChangePage}
        />
      </Stack>
    </Container>
  )
}

export default MainPcView
