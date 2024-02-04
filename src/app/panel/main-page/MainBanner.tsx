import { Box } from '@mui/material'
import useMedia from '@/hook/useMedia'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const MainBanner = () => {
  const { isPc } = useMedia()
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Slider {...settings}>
      <Box height={isPc ? '10rem' : '100%'} p={0} m={0}>
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
      <Box height={isPc ? '10rem' : '100%'} p={0} m={0}>
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
      <Box height={isPc ? '10rem' : '100%'} p={0} m={0}>
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
    </Slider>
  )
}

export default MainBanner
