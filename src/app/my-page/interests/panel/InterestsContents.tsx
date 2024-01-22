import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import { Box, CircularProgress, Stack } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { centeredPosition } from '@/constant/centerdPosition.style'
import { IDefaultPostCard, IShowcasePostCard } from '../page'
import { ProjectType } from '@/types/IPostDetail'
import MainCard from '@/app/panel/main-page/MainCard'

const InterestsContents = ({
  postList,
  // showcaseList,
  target,
  spinner,
  removeAll,
  isDeleting,
  type,
  setPostList,
}: {
  postList: Array<IDefaultPostCard>
  showcaseList: Array<IShowcasePostCard>
  target: React.MutableRefObject<null>
  spinner: boolean
  removeAll: () => void
  isDeleting: boolean
  type?: string
  setPostList: React.Dispatch<React.SetStateAction<IDefaultPostCard[]>>
  setShowcaseList: React.Dispatch<React.SetStateAction<IShowcasePostCard[]>>
}) => {
  const { isPc } = useMedia()

  const handleUnfavorite = (recruit_id: number) => () => {
    setPostList((prev) => prev.filter((post) => post.recruit_id !== recruit_id))
  }

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
      {type === 'SHOWCASE' ? (
        <Box></Box>
      ) : (
        postList.map((post) => {
          return (
            <Grid key={post.recruit_id} xs={12} sm={6} md={4} lg={3}>
              <MainCard
                key={post.recruit_id}
                title={post.title}
                image={post.image}
                user_id={`${post.userId}`}
                user_nickname={post.userNickname}
                user_thumbnail={post.userImage}
                status={post.status}
                tagList={post.skillList}
                recruit_id={post.recruit_id}
                favorite={post.isFavorite}
                type={type as ProjectType}
                onFavorite={handleUnfavorite(post.recruit_id)}
              />
            </Grid>
          )
        })
      )}
      <Grid xs={10} sm={4}>
        <Box ref={target} position={'relative'}>
          {spinner && <CircularProgress sx={centeredPosition} />}
        </Box>
      </Grid>
    </Grid>
  )
}

export default InterestsContents
