import { Container, Typography } from '@mui/material'
import Image from 'next/image'

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
      <Image
        src={'/images/dolphin.png'}
        width={300}
        height={200}
        alt="404에러 이미지"
      />
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
