import CuButton from '@/components/CuButton'
import { Box, Stack } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { IDefaultPostCard, IShowcasePostCard } from '../page'
import { ITag, ProjectType } from '@/types/IPostDetail'
import MainCard from '@/app/panel/main-page/MainCard'
import useAxiosWithAuth from '@/api/config'
import CuCircularProgress from '@/components/CuCircularProgress'

const InterestsContents = ({
  postList,
  showcaseList,
  target,
  spinner,
  removeAll,
  isDeleting,
  type,
  setPostList,
  setShowcaseList,
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
  const axiosInstance = useAxiosWithAuth()

  const handleDefaultUnfavorite = (recruit_id: number) => () => {
    axiosInstance
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/favorite/${recruit_id}`,
      )
      .then(() => {
        setPostList((prev) =>
          prev.filter((post) => post.recruit_id !== recruit_id),
        )
      })
  }

  const handleShowcaseUnfavorite = (id: number) => () => {
    axiosInstance
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/favorite/${id}`)
      .then(() => {
        setShowcaseList((prev) => prev.filter((post) => post.showcaseId !== id))
      })
  }

  return (
    <Grid
      container
      rowSpacing={[2, 3]}
      columnSpacing={[0, 2]}
      alignItems="center"
      justifyContent={['center', 'flex-start']}
      direction="row"
      columns={12}
      py={[0, 3]}
      px={[0, 2]}
      sx={{
        backgroundColor: ['transparent', 'background.secondary'],
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
      {type === 'SHOWCASE'
        ? showcaseList.map((post) => {
            return (
              <Grid key={post.showcaseId} xs={12} sm={6} md={4} lg={3}>
                <MainCard
                  key={post.showcaseId}
                  title={post.content}
                  image={post.image}
                  user_id={`${post.showcaseId}`}
                  user_nickname={post.teamName}
                  user_thumbnail={post.teamLogo}
                  status={''}
                  tagList={post.tags as ITag[]}
                  recruit_id={post.showcaseId}
                  favorite={true}
                  type={type as ProjectType}
                  onFavorite={handleShowcaseUnfavorite(post.showcaseId)}
                  href={`/showcase/${post.showcaseId}`}
                  sx={{ maxWidth: undefined }}
                />
              </Grid>
            )
          })
        : postList.map((post) => {
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
                  onFavorite={handleDefaultUnfavorite(post.recruit_id)}
                  sx={{ maxWidth: undefined }}
                />
              </Grid>
            )
          })}
      <Grid xs={12} sm={6} md={4} lg={3}>
        <Box ref={target}>
          {spinner && <CuCircularProgress color="primary" />}
        </Box>
      </Grid>
    </Grid>
  )
}

export default InterestsContents
