import React from 'react'
import {
  Button,
  TextField,
  Typography,
  Container,
  Stack,
} from '@mui/material'

const sheetSytle = {
  width: 'auto',
  height: 'auto',
  backgroundColor: 'background.secondary',
  padding: '2rem',
}

const LoginForm = () => {
  return (
    <Container sx={sheetSytle}>
      <Stack gap={'1rem'}>
        <Typography variant="h3" align="center">
          관리자 로그인
        </Typography>
        <Stack direction={'row'} justifyContent={'center'} columnGap={'0.5rem'}>
          <Stack>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              gap={'0.5rem'}
            >
              <Typography variant="h6">ID</Typography>
              <TextField />
            </Stack>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              gap={'0.5rem'}
            >
              <Typography variant="h6">PW</Typography>
              <TextField />
            </Stack>
          </Stack>
          <Button variant="outlined">로그인</Button>
        </Stack>
      </Stack>
    </Container>
  )
}
export default LoginForm
