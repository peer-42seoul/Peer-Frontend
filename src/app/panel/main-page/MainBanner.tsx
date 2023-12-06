import { Box } from '@mui/material'
import useMedia from '@/hook/useMedia'

const MainBanner = () => {
  const { isPc } = useMedia()

  return (
    <Box
      height={isPc ? '200px' : '100px'}
      border="1px solid white"
      bgcolor={'white'}
    >
      피어 소개 배너
    </Box>
  )
}

export default MainBanner
