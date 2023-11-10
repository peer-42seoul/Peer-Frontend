import MainCard from '@/app/panel/MainCard'
import { ProjectType } from '@/app/panel/MainPage'
import { ITag } from '@/types/IPostDetail'
import { Box, CircularProgress, Grid } from '@mui/material'
import React from 'react'

interface IMainCard {
  title: string
  image: string
  user_id: string
  user_nickname: string
  user_thumbnail: string
  status: string
  tagList: ITag[]
  favorite?: boolean
  recruit_id: number
  type: ProjectType
}

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
