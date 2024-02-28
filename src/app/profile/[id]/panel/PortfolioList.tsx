'use client'
import React, { useEffect, useState } from 'react'
import TitleBox from '@/components/TitleBox'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
import useSWR from 'swr'
import { Box, CircularProgress, Typography } from '@mui/material'
import PostCard from '@/app/my-page/profile/panel/PostCard'
import { IMyPortfolio } from '@/app/my-page/profile/panel/MyPortfolio'
import { getUniqueArray } from '@/utils/getUniqueArray'
import axios from 'axios'

const PortfolioList = ({ userId }: { userId: string }) => {
  const [page, setPage] = useState<number>(1)
  const [postList, setPostList] = useState<Array<IMyPortfolio>>([])
  const [pageLimit, setPageLimit] = useState(1)

  const { data, isLoading } = useSWR<Array<IMyPortfolio>>(
    `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/otherPortfolio/list?userId=${userId}&page=${page}`,
    (url: string) => axios.get(url).then((res) => res.data),
  )

  const { target } = useInfiniteScroll({
    setPage,
    mutate: () => {},
    pageLimit,
    page,
  })

  useEffect(() => {
    if (data) {
      setPostList((prev) => getUniqueArray(prev.concat(data), 'redirectionIds'))

      if (data.length && !data[data.length - 1]?.isEnd) {
        setPageLimit((prev) => prev + 1)
      }
    }
  }, [data])

  return (
    <TitleBox
      title="작업물"
      titleContainerSx={{
        px: [0, '0.5rem'],
        width: '100%',
        boxSizing: 'border-box',
      }}
      titleBoxSpacing={['0.5rem', '0.75rem']}
    >
      {postList.length === 0 ? (
        <Typography variant="Caption" color={'text.alternative'} p={1}>
          작업물이 존재하지않습니다.
        </Typography>
      ) : (
        <Grid
          container
          rowSpacing={['1rem', '1.5rem']}
          columnSpacing={[0, '1rem']}
          columns={12}
        >
          {postList.map((post) => (
            <Grid xs={12} sm={6} lg={4} key={post.redirectionIds[0]}>
              <PostCard
                teamLogo={post.teamLogo}
                tagList={post.tagList}
                image={post.recruitImage}
                teamName={post.teamName}
                postId={post.teamId}
                redirectionIds={post.redirectionIds}
              />
            </Grid>
          ))}
          <Grid xs={12} sm={6}>
            <Box position={'relative'} ref={target} height={1}>
              {isLoading && <CircularProgress />}
            </Box>
          </Grid>
        </Grid>
      )}
    </TitleBox>
  )
}

export default PortfolioList
