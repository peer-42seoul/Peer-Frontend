'use client'
import CuToggle from '@/components/CuToggle'
import PostCard from './PostCard'
import TitleBox from '@/components/TitleBox'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
import { IPagination } from '@/types/IPagination'
import { IMainCard } from '@/types/IPostDetail'
import { Box, FormControlLabel, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import * as style from './Profile.style'
import useAxiosWithAuth from '@/api/config'
import useToast from '@/states/useToast'
import CuCircularProgress from '@/components/CuCircularProgress'
import { getUniqueArray } from '@/utils/getUniqueArray'

const MyPortfolio = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  // 무한 스크롤
  const [page, setPage] = useState<number>(1)
  const [postList, setPostList] = useState<Array<IMainCard>>([])
  const [pageLimit, setPageLimit] = useState(1)

  // 토스트
  const { openToast, closeToast } = useToast()

  const axiosWithAuth = useAxiosWithAuth()

  const { data, isLoading } = useSWR<IPagination<Array<IMainCard>>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=PROJECT&sort=latest&page=${page}&pageSize=5`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

  useEffect(() => {
    if (data?.content) {
      // COMMENT : 임시 해결책. useSWR 도큐먼트 뒤적거리기
      setPostList((prev) =>
        getUniqueArray(prev.concat(data.content), 'recruit_id'),
      )
      if (!data.last) {
        setPageLimit((prev) => prev + 1)
      }
    }
  }, [data?.content, data?.last])

  const { target } = useInfiniteScroll({
    setPage,
    mutate: () => {},
    pageLimit,
    page,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    closeToast()
    setIsVisible(event.target.checked)
    if (event.target.checked) {
      openToast({
        severity: 'success',
        message: '내 작업물이 다른 사람들에게 공개되었습니다.',
      })
    } else {
      openToast({
        severity: 'success',
        message: '내 작업물이 다른 사람들에게 비공개되었습니다.',
      })
    }
  }

  const DisclosureToggle = ({
    checked,
    handleChange,
  }: {
    checked: boolean
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  }) => {
    return (
      <FormControlLabel
        control={<CuToggle checked={checked} onChange={handleChange} />}
        label={
          <Typography
            variant="CaptionEmphasis"
            color={'text.assistive'}
            sx={{
              marginRight: '0.5rem',
            }}
          >
            공개 여부
          </Typography>
        }
        labelPlacement="start"
        sx={{ margin: 0 }}
      />
    )
  }

  return (
    <TitleBox
      title="내 작업물"
      titleEndAdornment={
        <DisclosureToggle checked={isVisible} handleChange={handleChange} />
      }
      titleBoxSx={style.myPortfolioStyle}
      titleContainerSx={{
        px: [0, '0.5rem'],
        width: '100%',
        boxSizing: 'border-box',
      }}
      titleBoxSpacing={['0.5rem', '0.75rem']}
    >
      <Grid
        container
        rowSpacing={['1rem', '1.5rem']}
        columnSpacing={[0, '1rem']}
        columns={12}
      >
        {postList.map((post) => (
          <Grid xs={12} sm={6} lg={4} key={post.recruit_id}>
            <PostCard
              teamLogo={post.user_thumbnail}
              tagList={post.tagList}
              image={post.image}
              teamName={post.user_nickname}
              postId={post.recruit_id}
            />
          </Grid>
        ))}
        <Grid xs={12} sm={6} lg={4}>
          <Box ref={target} height={1}>
            {isLoading && <CuCircularProgress color="primary" />}
          </Box>
        </Grid>
      </Grid>
    </TitleBox>
  )
}

export default MyPortfolio
