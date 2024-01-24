'use client'
import React, { useEffect, useState } from 'react'
import TitleBox from '@/components/TitleBox'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
import { IPagination } from '@/types/IPagination'
import { IMainCard } from '@/types/IPostDetail'
import useAxiosWithAuth from '@/api/config'
import useSWR from 'swr'
import { Box, CircularProgress, Typography } from '@mui/material'

const PortfolioList = ({ userId }: { userId: string }) => {
  const [page, setPage] = useState<number>(1)
  const [postList, setPostList] = useState<Array<IMainCard>>([])
  const [pageLimit, setPageLimit] = useState(1)

  const axiosWithAuth = useAxiosWithAuth()

  const { data, isLoading } = useSWR<IPagination<Array<IMainCard>>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/otherPortfolio/list?userId=${userId}&page=${page}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

  const { target } = useInfiniteScroll({
    setPage,
    mutate: () => {},
    pageLimit,
    page,
  })

  useEffect(() => {
    if (!isLoading && data && !data.last) {
      setPostList((prev) => prev.concat(data.content))
      if (!data.last) {
        setPageLimit((prev) => prev + 1)
      }
    }
  }, [isLoading, data])

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
        <Typography>작업물이 존재하지않습니다.</Typography>
      ) : (
        <Grid
          container
          rowSpacing={['1rem', '1.5rem']}
          columnSpacing={[0, '1rem']}
          columns={12}
        >
          {postList.length === 0 && (
            <Typography>작업물이 존재하지 않습니다.</Typography>
          )}
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
