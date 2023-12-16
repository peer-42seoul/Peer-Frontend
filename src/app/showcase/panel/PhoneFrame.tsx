import { Box, Card, Stack } from '@mui/material'

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
        <Stack>
          {imageUrl ? (
            <Box
              component="img"
              src={imageUrl}
              sx={{
                width: '22.5rem',
                height: '50rem',
              }}
              // variant="rounded"
            />
          ) : (
            <Box
              component="img"
              src="/images/icons/icon-512x512.png"
              sx={{
                width: '22.5rem',
                height: '50rem',
              }}
              // variant="rounded"
            />
          )}
        </Stack>
      </Card>
    </Card>
  )
}

export default PhoneFrame
