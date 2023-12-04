import { Avatar, Box, Card, Stack } from '@mui/material'

const PhoneFrame = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Card
      sx={{
        borderRadius: 10,
        p: 1,
        backgroundColor: 'gray',
        width: '300px',
        height: '600px',
      }}
    >
      <Card sx={{ borderRadius: 10, backgroundColor: 'pink', height: '100%' }}>
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
          <Avatar
            src={imageUrl}
            sx={{ width: '300px', height: '300px' }}
            variant="rounded"
          />
        </Stack>
      </Card>
    </Card>
  )
}

export default PhoneFrame
