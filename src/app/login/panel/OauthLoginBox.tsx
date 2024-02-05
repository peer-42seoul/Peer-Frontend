import { Box, Stack, Typography, IconButton } from '@mui/material'
import Image from 'next/image'

const Icons = { width: '40px', height: '40px', backgroundColor: '#EFEFEF' }

const OauthLoginBox = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

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
        <IconButton href={`${API_URL}/oauth2/authorization/ft`} sx={Icons}>
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
        <Typography variant="Caption">42서울</Typography>
      </Stack>
      <Stack alignItems={'center'} spacing={1}>
        <IconButton href={`${API_URL}/oauth2/authorization/google`} sx={Icons}>
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
        <Typography variant="Caption">구글</Typography>
      </Stack>
    </Box>
  )
}

export default OauthLoginBox
