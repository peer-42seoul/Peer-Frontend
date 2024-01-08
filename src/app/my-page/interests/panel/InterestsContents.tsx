import MainCard from '@/app/panel/main-page/MainCard'
import { ProjectType } from '@/app/panel/MainPage'
import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import { IMainCard } from '@/types/IPostDetail'
import { Box, CircularProgress, Stack } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

const InterestsContents = ({
  postList,
  target,
  type,
  spinner,
  removeAll,
  isDeleting,
}: {
  postList: Array<IMainCard>
  target: React.MutableRefObject<null>
  type: ProjectType
  spinner: boolean
  removeAll: () => void
  isDeleting: boolean
}) => {
  const { isPc } = useMedia()

  return (
    <Grid
      container
      rowSpacing={isPc ? 3 : 2}
      columnSpacing={isPc ? 2 : 0}
      alignItems="center"
      justifyContent={isPc ? 'flex-start' : 'space-evenly'}
      direction="row"
      columns={12}
      py={isPc ? 3 : 0}
      px={isPc ? 2 : 0}
      sx={{
        backgroundColor: isPc ? 'background.secondary' : 'transparent',
        borderRadius: '1rem',
      }}
    >
      <Grid xs={12}>
        <Stack
          direction={'row'}
          justifyContent={'flex-end'}
          sx={{ paddingRight: '0.5rem' }}
        >
          <CuButton
            variant="text"
            message="관심 모두 해제"
            action={removeAll}
            disabled={isDeleting}
            TypographyProps={{
              variant: 'CaptionEmphasis',
              color: 'text.alternative',
            }}
            style={{ height: '2rem' }}
          />
        </Stack>
      </Grid>
      {postList.map((item) => (
        <Grid key={item.recruit_id} xs={11} sm={6} md={4}>
          <MainCard {...item} type={type as ProjectType} />
        </Grid>
      ))}
      <Grid xs={10} sm={4}>
        <Box ref={target}>{spinner && <CircularProgress />}</Box>
      </Grid>
    </Grid>
  )
}

export default InterestsContents
