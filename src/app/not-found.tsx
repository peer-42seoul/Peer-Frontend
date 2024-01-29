'use client'

import { Container, Typography } from '@mui/material'
import Lottie from 'react-lottie-player'
import dolphin from '../../public/404-dolphin.lottie.json'

export default function Custom404() {
  return (
    <Container
      sx={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Lottie loop animationData={dolphin} play />
      <Typography
        color={'secondary'}
        fontWeight={'600'}
        variant="h1"
        fontSize={'1.5rem'}
      >
        404Error - 페이지를 찾을 수 없습니다.
      </Typography>
    </Container>
  )
}
