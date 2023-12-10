import { Avatar, Box, Card, Stack } from '@mui/material'

const PhoneFrame = ({ imageUrl }: { imageUrl: string | undefined }) => {
  return (
    <Card
      sx={{
        borderRadius: 10,
        p: 1,
        backgroundColor: 'gray',
        width: '70%',
        height: '100%',
      }}
    >
      <Card sx={{ borderRadius: 10, height: '100%', backgroundColor: 'white' }}>
        <Stack direction={'row'} justifyContent={'center'}>
          <Box
            sx={{
              backgroundColor: 'black',
              width: '100px',
              height: '40px',
              position: 'absolute',
              zIndex: 10,
              borderRadius: 10,
              marginTop: '10px',
            }}
          />
        </Stack>
        <Stack>
          {imageUrl ? (
            <Avatar
              src={imageUrl}
              sx={{
                width: '22.5rem',
                height: '50rem',
              }}
              variant="rounded"
            />
          ) : (
            <Avatar
              src="/images/icons/icon-512x512.png"
              sx={{
                width: '22.5rem',
                height: '50rem',
              }}
              variant="rounded"
            />
          )}
        </Stack>
      </Card>
    </Card>
  )
}

export default PhoneFrame
