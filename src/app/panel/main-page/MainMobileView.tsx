import {
  cardStyle,
  containerStyle,
  floatButtonStyle,
} from '@/app/panel/main-page/Mainpage.style'
import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
import MainBanner from '@/app/panel/main-page/MainBanner'
import SelectType from '@/app/panel/main-page/SelectType'
import SearchOptionPanel from '@/app/panel/main-page/MainPanel'
import SelectSort from '@/app/panel/main-page/SelectSort'
import NoDataDolphin from '@/components/NoDataDolphin'
import { IPost } from '@/types/IPostDetail'
import MainCard from '@/app/panel/main-page/MainCard'
import FloatEditButton from '@/app/panel/main-page/FloatEditButton'
import { IPagination } from '@/types/IPagination'
import useMainOptions from '@/hook/main-page/useMainOptions'
import useMainCards from '@/hook/main-page/useMainCards'
import useMainOptionsStore from '@/states/main-page/useMainOptionsStore'

const MainMobileView = ({ initData }: { initData: IPagination<IPost[]> }) => {
  const { handleSort, handleType, handleChangePage, queryKeyword } =
    useMainOptions()
  const { data, noContent } = useMainCards(initData)
  const { page, type, sort } = useMainOptionsStore()

  return (
    <Container sx={{ ...containerStyle, paddingBottom: '2rem' }}>
      {queryKeyword === '' ? (
        <>
          <Box width={'100%'}>
            <MainBanner />
          </Box>
          <Box marginY={'0.5rem'}>
            <SelectType type={type} setType={handleType} />
          </Box>
          <SearchOptionPanel type={type} sort={sort} handleSort={handleSort} />
        </>
      ) : (
        <Stack
          direction="row"
          alignItems={'center'}
          justifyContent={'space-between'}
          my={'0.75rem'}
        >
          <Stack direction="row" gap={'0.25rem'}>
            <Typography variant={'Body1Emphasis'}>{queryKeyword}</Typography>
            <Typography variant={'Body1'}>검색 결과</Typography>
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
          <Stack alignItems={'center'}>
            <Stack gap={2} width={'100%'}>
              {data?.content?.map((project: IPost) => (
                <Box key={project.recruit_id}>
                  <MainCard {...project} type={type} sx={cardStyle} />
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
  )
}

export default MainMobileView
