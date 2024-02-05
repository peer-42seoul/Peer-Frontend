import { Box } from '@mui/material'
import useMedia from '@/hook/useMedia'

const MainBanner = () => {
  const { isPc } = useMedia()
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   // autoplay: true,
  //   // autoplaySpeed: 3000,
  //   pauseOnHover: true,
  // }

  return (
    <Box height={isPc ? '12.5rem' : '100px'} p={0} m={0}>
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
