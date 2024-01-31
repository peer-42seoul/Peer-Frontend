import { Box } from '@mui/material'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

const MainCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Slider {...settings}>
      <Box height={'7.5rem'} bgcolor={'white'}>
        <Image
          src={'/images/banners/default-banner-1.png'}
          alt="banner-1"
          width={310}
          height={130}
        />
      </Box>
      <Box height={'7.5rem'} border="1px solid black" bgcolor={'white'}>
        <Image
          src={'/images/banners/default-banner-2.png'}
          alt="banner-1"
          width={310}
          height={130}
        />
      </Box>
      <Box height={'7.5rem'} border="1px solid black" bgcolor={'white'}>
        <Image
          src={'/images/banners/default-banner-3.png'}
          alt="banner-1"
          width={310}
          height={130}
        />
      </Box>
    </Slider>
  )
}

export default MainCarousel
