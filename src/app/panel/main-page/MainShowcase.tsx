import { Box, Stack, Typography, Button } from '@mui/material'

const MainShowcase = () => {
  return (
    <Box height={'400px'} border="1px solid black">
      <Stack justifyContent={'space-between'} direction="row">
        <Typography variant={'Body2'} color={'text.strong'}>
          쇼케이스
        </Typography>
        <Button variant="text">더보기</Button>
      </Stack>
    </Box>
  )
}

export default MainShowcase
