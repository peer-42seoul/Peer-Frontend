import { Box, Stack, Typography, IconButton } from '@mui/material'
import Image from 'next/image'

const OauthLoginBox = () => {
  const API_URL = 'http://redirect.peer-test.co.kr'

  return (
    <Box
      sx={{
        display: 'flex',
        width: '120px',
        height: '60px',
        justifyContent: 'space-between',
      }}
    >
      <Stack alignItems={'center'} spacing={1}>
        <IconButton
          href={`${API_URL}/oauth2/authorization/ft`}
          sx={{ width: '40px', height: '40px' }}
        >
          <Image
            src="/icons/42-logo.png"
            alt="42-logo"
            width={30}
            height={30}
            style={{
              objectFit: 'fill',
            }}
          />
        </IconButton>
        <Typography fontSize={10}>42서울</Typography>
      </Stack>
      <Stack alignItems={'center'} spacing={1}>
        <IconButton
          href={`${API_URL}/oauth2/authorization/google`}
          sx={{ width: '40px', height: '40px' }}
        >
          <Image
            src="/icons/g-logo.png"
            alt="google-logo"
            width={30}
            height={30}
            style={{
              objectFit: 'fill',
            }}
          />
        </IconButton>
        <Typography fontSize={10}>구글</Typography>
      </Stack>
    </Box>
  )
}

export default OauthLoginBox
