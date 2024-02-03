import { Box } from '@mui/material'
import useMedia from '@/hook/useMedia'
import Image from 'next/image'

const MainBanner = () => {
  const { isPc } = useMedia()

  return (
    <Box height={isPc ? '12.5rem' : '100%'} p={0} m={0}>
      <Image
        src={
          !isPc
            ? '/images/banners/default-mobile.svg'
            : '/images/banners/default-pc.svg'
        }
        alt={'main-banner'}
        width={0}
        height={0}
        style={{ width: '100%', height: 'auto' }}
      />
    </Box>
  )
}

export default MainBanner
