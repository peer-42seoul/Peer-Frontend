import { Box } from '@mui/material'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CuPhotoBox from '@/components/CuPhotoBox'

const MainCarousel = () => {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  // }

  const BoxStyle = {
    width: '100%',
    height: '100%',
  }

  return (
    // <Slider {...settings}>
    <Box sx={BoxStyle}>
      <CuPhotoBox
        src={'/images/banners/default-mobile.svg'}
        alt="banner-1"
        priorityOption={true}
        imgStyle={{ borderRadius: '0.75rem' }}
        style={{ width: 300, height: 130 }}
      />
    </Box>
    // </Slider>
  )
}

export default MainCarousel
