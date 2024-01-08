import MainCard from '@/app/panel/main-page/MainCard'
import { ProjectType } from '@/app/panel/MainPage'
import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import { IMainCard } from '@/types/IPostDetail'
import { Box, CircularProgress, Grid, Stack } from '@mui/material'
import React from 'react'

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
      rowSpacing={[2, 3]}
      columnSpacing={[0, 2]}
      alignItems="center"
      justifyContent={['space-evenly', 'flex-start']}
      style={{ width: '100%', boxSizing: 'border-box' }}
      direction="row"
    >
      <Grid item xs={12} style={{ padding: 0 }}>
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
      {postList.map((item, i) => (
        <Grid
          item
          key={item.recruit_id}
          xs={10}
          sm={4}
          style={{ paddingLeft: isPc && i % 3 === 0 ? 0 : undefined }}
        >
          <MainCard {...item} type={type as ProjectType} />
        </Grid>
      ))}
      <Grid item xs={10} sm={4}>
        <Box ref={target}>{spinner && <CircularProgress />}</Box>
      </Grid>
    </Grid>
  )
}

export default InterestsContents
