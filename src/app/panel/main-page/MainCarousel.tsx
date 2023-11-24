import { Box } from '@mui/material'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
      <Box height={'100px'} border="1px solid black">
        배너 1
      </Box>
      <Box height={'100px'} border="1px solid black">
        배너 2
      </Box>
      <Box height={'100px'} border="1px solid black">
        배너 3
      </Box>
    </Slider>
  )
}

export default MainCarousel
