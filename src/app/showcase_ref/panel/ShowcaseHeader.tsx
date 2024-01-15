import { Stack, Typography } from '@mui/material'

const ShowcaseHeader = () => {
  return (
    <Stack
      position={'fixed'}
      zIndex={5}
      p={2}
      sx={{ backgroundColor: 'background.primary' }}
      width={'100%'}
    >
      <Typography
        sx={{ mx: 10 }}
        variant="h5"
        fontWeight={'bold'}
        textAlign={'center'}
      >
        쇼케이스
      </Typography>
    </Stack>
  )
}

export default ShowcaseHeader
