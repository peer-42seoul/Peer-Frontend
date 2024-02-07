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
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  const BoxStyle = {
    width: '100%',
    height: '100%',
  }

  const imageProps = {
    width: 310,
    height: 130,
    style: {
      borderRadius: '0.75rem',
      height: '7.5rem',
    },
  }

  return (
    <Slider {...settings}>
      <Box sx={BoxStyle}>
        <Image
          src={'/images/banners/default-mobile.svg'}
          alt="banner-1"
          {...imageProps}
        />
      </Box>
    </Slider>
  )
}

export default MainCarousel
