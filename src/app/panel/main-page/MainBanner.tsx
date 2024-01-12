import { Box } from '@mui/material'
import useMedia from '@/hook/useMedia'

const MainBanner = () => {
  const { isPc } = useMedia()

  return (
    <Box
      height={isPc ? '12.5rem' : '100px'}
      borderRadius={'0.75rem'}
      bgcolor={'white'}
    >
      피어 소개 배너
    </Box>
  )
}

export default MainBanner
