'use client'
import CuToggle from '@/components/CuToggle'
import PostCard from './PostCard'
import TitleBox from '@/components/TitleBox'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
import { Box, FormControlLabel, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import * as style from './Profile.style'
import useAxiosWithAuth from '@/api/config'
import useToast from '@/states/useToast'
import CuCircularProgress from '@/components/CuCircularProgress'
import { getUniqueArray } from '@/utils/getUniqueArray'
import { ISkill } from '@/types/IUserProfile'

interface IMyPortfolio {
  teamId: number // 팀 Id
  tagList: ISkill[] // 지정된 태그 리스트
  teamName: string
  teamLogo: string
  recruitImage: string // 대표 이미지용
  redirectionIds: [number | null, number | null, number | null] // 0이면 null로 처리한다, 이유는 공개 여부로 지정한다, [0] : recruitId, [1] : showcaseId, [2] : peerLogId
  isEnd: boolean // 추가 요청 가능 여부를 전달한다.
}

const MyPortfolio = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  // 무한 스크롤
  const [page, setPage] = useState<number>(1)
  const [postList, setPostList] = useState<Array<IMyPortfolio>>([])
  const [pageLimit, setPageLimit] = useState(1)

  // 토스트
  const { openToast, closeToast } = useToast()

  const axiosWithAuth = useAxiosWithAuth()

  const { data, isLoading } = useSWR<Array<IMyPortfolio>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myPortfolio/list?page=${page}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

  useEffect(() => {
    if (data) {
      // COMMENT : 임시 해결책. useSWR 도큐먼트 뒤적거리기
      setPostList((prev) => getUniqueArray(prev.concat(data), 'teamId'))
      console.log(data)
      if (data.length && !data[data.length - 1]?.isEnd) {
        setPageLimit((prev) => prev + 1)
      }
    }
  }, [data])

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
          <Grid xs={12} sm={6} lg={4} key={post.teamId}>
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
