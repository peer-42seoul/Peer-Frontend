'use client'
import { Button, Skeleton, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'

const ImageButton = ({
  imageUrl,
  alt,
  text,
  action,
}: {
  imageUrl: string
  alt: string
  text: string
  action: () => void
}) => {
  console.log(imageUrl, alt)
  return (
    <Button onClick={action}>
      <Stack>
        {/* <Image src={imageUrl} alt={alt} width={100} height={100} /> 이미지가 없어서 우선 스켈레톤으로 적용 해두었습니다.*/}
        <Skeleton variant="rectangular" width={100} height={100} />
        <Typography>{text}</Typography>
      </Stack>
    </Button>
  )
}

const DisplaySetting = () => {
  // const [themeType, setThemeType] = useState<'light' | 'dark' | 'system'>(
  //   'light',
  // )

  // useEffect(() => {
  //   console.log('API call!')
  // }, [themeType])
  const apiCall = (themeType: string) => {
    console.log('API Call!', themeType)
  }

  return (
    <Box>
      <Typography>화면 스타일</Typography>
      <ImageButton
        imageUrl="https://picsum.photos/200"
        alt="라이트 모드 이미지"
        text="라이트 모드"
        action={() => apiCall('light')}
      />
      <ImageButton
        imageUrl="https://picsum.photos/200"
        alt="다크 모드 이미지"
        text="다크 모드"
        action={() => apiCall('dark')}
      />
      <ImageButton
        imageUrl="https://picsum.photos/200"
        alt="기기 설정 이미지"
        text="기기 설정"
        action={() => apiCall('system')}
      />
    </Box>
  )
}

export default DisplaySetting
