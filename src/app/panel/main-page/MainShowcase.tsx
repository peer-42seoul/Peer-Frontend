'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import { ICardData } from '@/app/showcase/panel/types'
import CuCircularProgress from '@/components/CuCircularProgress'
import NoDataDolphin from '@/components/NoDataDolphin'
import { IPagination } from '@/types/IPagination'
import { Box, Stack, Typography, Button, Card, Avatar } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import useSWR from 'swr'

const MainShowcase = () => {
  const router = useRouter()
  const { data, isLoading, error } = useSWR<IPagination<ICardData[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase?page=1&pageSize=10`,
    defaultGetFetcher,
  )

  // console.log(data)

  const handleClick = useCallback(() => {
    if (data?.content.length === 0) return
    const id = data?.content[0].id
    if (!id) return
    router.push(`/showcase/detail/${data?.content[0].id}`)
  }, [data?.content])

  return (
    <Box>
      <Stack
        justifyContent={'space-between'}
        direction="row"
        alignItems={'center'}
        mb={'0.25rem'}
      >
        <Typography variant="Body1">쇼케이스</Typography>
        <Button onClick={handleClick} variant="text">
          <Typography variant={'Caption'} color={'text.alternative'}>
            모두보기
          </Typography>
        </Button>
      </Stack>

      {isLoading && <CuCircularProgress color="primary" />}

      {error && <NoDataDolphin message="문제가 있어요 😰" />}

      {data?.content.length === 0 && (
        <NoDataDolphin message="아직 비어있어요 😰" />
      )}

      {data && data.content[0] && (
        <Stack alignItems={'center'} position={'relative'}>
          <Image
            width={300}
            height={350}
            src={
              data?.content[0].image
                ? data?.content[0].image
                : '/icons/ios/256.png'
            }
            alt="main-showcase-image"
            style={{ borderRadius: '0.75rem' }}
          />
          <Card
            sx={{
              position: 'absolute',
              width: '19rem',
              height: '10rem',
              bottom: '0',
              backgroundColor: 'background.tertiary',
              opacity: '0.9',
              borderRadius: '0.75rem',
            }}
          >
            <Stack m={'1rem'}>
              <Stack direction={'row'} spacing={'0.5rem'}>
                <Avatar
                  src={data.content[0].teamLogo!}
                  sx={{ width: '1.5rem', height: '1.5rem' }}
                />
                <Typography color={'text.alternative'} width={'11rem'}>
                  {data.content[0].name}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              whiteSpace={'normal'}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
              m={'1rem'}
            >
              <Typography
                color={'text'}
                sx={{
                  wordBreak: 'break-word',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {data.content[0].description}
              </Typography>
            </Stack>
          </Card>
        </Stack>
      )}
    </Box>
  )
}

export default MainShowcase
