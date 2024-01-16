'use client'
import CuToggle from '@/components/CuToggle'
import PostCard from './PostCard'
import TitleBox from '@/components/TitleBox'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
import { IPagination } from '@/types/IPagination'
import { IMainCard } from '@/types/IPostDetail'
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import * as style from './Profile.style'
import useMedia from '@/hook/useMedia'
import useAxiosWithAuth from '@/api/config'

const MyPortfolio = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  // 무한 스크롤
  const [page, setPage] = useState<number>(1)
  const [postList, setPostList] = useState<Array<IMainCard>>([])
  const [pageLimit, setPageLimit] = useState(1)
  const { isPc } = useMedia()

  const axiosWithAuth = useAxiosWithAuth()

  const { data, isLoading } = useSWR<IPagination<Array<IMainCard>>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=PROJECT&sort=latest&page=${page}&pageSize=5&keyword=&due=1개월&due=12개월 이상&region1=&region2=&place=&status=&tag=`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

  useEffect(() => {
    if (!isLoading && data && !data.last) {
      setPostList((prev) => prev.concat(data.content))
      if (!data.last) {
        setPageLimit((prev) => prev + 1)
      }
    }
  }, [isLoading, data])

  const { target, spinner } = useInfiniteScroll({
    setPage,
    // mutate,
    mutate: () => {},
    pageLimit,
    page,
  })

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
          <Typography variant="CaptionEmphasis" color={'text.assistive'}>
            공개 여부
          </Typography>
        }
        labelPlacement="start"
        sx={{
          margin: 0,
          // transition: 'transform 0.5s ease, borderColor 0.5s ease',
        }}
      />
    )
  }

  return (
    <TitleBox
      title="내 작업물"
      titleEndAdornment={
        <DisclosureToggle
          checked={isVisible}
          handleChange={(e) => setIsVisible(e.target.checked)}
        />
      }
      titleBoxSx={isPc ? style.myPortfolioPcStyle : undefined}
      titleContainerSx={{
        px: isPc ? '0.5rem' : 0,
        width: '100%',
        boxSizing: 'border-box',
      }}
      titleBoxSpacing={isPc ? '0.75rem' : '0.5rem'}
    >
      <Grid container rowSpacing={[2, 3]} columnSpacing={[0, 2]} columns={12}>
        {!isVisible ? (
          <Grid xs={12}>
            <Typography
              variant="Body2"
              color={'text.alternative'}
              //TODO #470 머지 후 centeredPosition style 객체 넣기
            >
              비공개 상태입니다.
            </Typography>
          </Grid>
        ) : (
          <>
            {postList.map((post) => (
              <Grid xs={12} sm={6} md={4} key={post.recruit_id}>
                <PostCard
                  teamLogo={post.user_thumbnail}
                  tagList={post.tagList}
                  image={post.image}
                  teamName={post.user_nickname}
                  postId={post.recruit_id}
                />
              </Grid>
            ))}
            <Grid xs={12} sm={6} md={4}>
              <Box position={'relative'} ref={target} height={1}>
                {spinner && <CircularProgress />}
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </TitleBox>
  )
}

export default MyPortfolio
