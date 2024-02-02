import { Box } from '@mui/material'
import useMedia from '@/hook/useMedia'

const MainBanner = () => {
  const { isPc } = useMedia()

  return (
    <Box
      height={isPc ? '12.5rem' : '100px'}
      // borderRadius={'0.75rem'}
      // bgcolor={'white'}
      p={0}
      m={0}
    >
      <img
        src={
          !isPc
            ? '/images/banners/default-mobile.svg'
            : '/images/banners/default-pc.svg'
        }
        alt={'main-banner'}
        width={'100%'}
        height={'100%'}
      />
    </Box>
  )
}

export default MainBanner
