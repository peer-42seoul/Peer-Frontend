import { Box, Typography, IconButton } from '@mui/material'
import Image from 'next/image'

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'center',
          height: '100%',
        }}
      >
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
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'center',
          height: '100%',
        }}
      >
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
      </div>
    </Box>
  )
}

export default OauthLoginBox
