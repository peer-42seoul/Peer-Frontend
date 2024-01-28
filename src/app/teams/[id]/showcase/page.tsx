'use client'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import CreateShowcasePage from './panel/CreateShowcasePage'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import CuCircularProgress from '@/components/CuCircularProgress'

const ShowcaseGenerationPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
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
      width={'56.75rem'}
      padding={'2rem 0rem'}
      flexDirection={'column'}
      gap={'4rem'}
    >
      <Typography color={'noraml'}>쇼케이스</Typography>
      <Stack
        display={'flex'}
        flexDirection={'row'}
        padding={'1.5rem'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={'1.5rem'}
        alignSelf={'stretch'}
        borderRadius={'1.5rem'}
        sx={{ backgroundColor: 'background.secondary' }}
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
