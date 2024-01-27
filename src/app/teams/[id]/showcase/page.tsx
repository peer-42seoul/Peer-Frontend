'use client'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import CreateShowcasePage from './panel/CreateShowcasePage'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import CuCircularProgress from '@/components/CuCircularProgress'
import useMedia from '@/hook/useMedia'
import * as style from './panel/IntersectionSection.style'

const ShowcaseGenerationPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { isPc } = useMedia()
  const axiosWithAuth = useAxiosWithAuth()

  const { data, isLoading, error } = useSWR<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/page/${id}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
    { shouldRetryOnError: false },
  )

  if (isLoading) return <CuCircularProgress color={'secondary'} />
  if (error)
    return <Typography color={'error'}>에러가 발생했습니다.</Typography>

  return (
    <Stack
      display={'flex'}
      width={'100%'}
      height={'auto'}
      padding={'2rem 0 2rem 0'}
      flexDirection={'column'}
      gap={'0.5rem'}
    >
      <Typography color={'text.strong'} variant="Body2">
        쇼케이스
      </Typography>
      <Stack
        display={'flex'}
        flexDirection={'row'}
        padding={'1.5rem'}
        justifyContent={'center'}
        alignItems={'center'}
        borderRadius={'1rem'}
        boxSizing={'border-box'}
        sx={style.contentBox(isPc)}
      >
        <CreateShowcasePage
          isPublished={data.isPublished}
          isPublic={data.isPublic}
          showcaseId={data.showcaseId}
          teamId={Number(id)}
        />
      </Stack>
    </Stack>
  )
}

export default ShowcaseGenerationPage
