import { Box, Card, Stack } from '@mui/material'
import Image from 'next/image'

const PhoneFrame = ({ imageUrl }: { imageUrl: string | undefined }) => {
  return (
    <Card
      sx={{
        borderRadius: '3rem',
        p: 1,
        backgroundColor: 'gray',
        width: '70%',
        height: '100%',
      }}
    >
      <Card
        sx={{ borderRadius: '3rem', height: '100%', backgroundColor: 'white' }}
      >
        <Stack direction={'row'} justifyContent={'center'}>
          <Box
            sx={{
              backgroundColor: 'black',
              width: '6.25rem',
              height: '2.5rem',
              position: 'absolute',
              zIndex: 10,
              borderRadius: '3rem',
              marginTop: '0.625rem',
            }}
          />
        </Stack>
        <Stack alignItems={'center'} justifyContent={'center'}>
          {imageUrl != undefined ? (
            <Box
              component="img"
              src={imageUrl}
              sx={{
                width: '22.5rem',
                height: '50rem',
              }}
            />
          ) : (
            <Box
              display={'flex'}
              sx={{
                width: '22.5rem',
                height: '40rem',
              }}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Image
                src={'/icons/ios/1024.png'}
                alt="logo"
                width={200}
                height={200}
              />
            </Box>
          )}
        </Stack>
      </Card>
    </Card>
  )
}

export default PhoneFrame
