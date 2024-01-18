import MainCard from '@/app/panel/main-page/MainCard'
import { IMainCard, ProjectType } from '@/types/IPostDetail'
import { Box, CircularProgress, Grid } from '@mui/material'
import React from 'react'

const InterestsContents = ({
  postList,
  target,
  type,
  spinner,
}: {
  postList: Array<IMainCard>
  target: React.MutableRefObject<null>
  type: ProjectType
  spinner: boolean
}) => {
  return (
    <div>
      <Grid
        container
        spacing={[0, 2]}
        alignItems="center"
        justifyContent={['space-evenly', 'flex-start']}
        sx={{ width: '100%' }}
        direction="row"
      >
        {postList.map((item) => (
          <Grid item key={item.recruit_id} xs={10} sm={4}>
            <MainCard {...item} type={type as ProjectType} />
          </Grid>
        ))}
        <Grid item xs={10} sm={4}>
          <Box ref={target}>{spinner && <CircularProgress />}</Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default InterestsContents
