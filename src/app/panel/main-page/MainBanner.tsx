'use client'

import { Box } from '@mui/material'
import useMedia from '@/hook/useMedia'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRouter } from 'next/navigation'

const MainBanner = () => {
  const router = useRouter()
  const { isPc } = useMedia()
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  }

  return (
    <Slider {...settings}>
      <Box height={isPc ? '12rem' : '100%'} p={0} m={0}>
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
              ? '/images/banners/about-mobile.svg'
              : '/images/banners/about-pc.svg'
          }
          alt={'about-banner'}
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
          onClick={() => router.push('/about')}
        />
      </Box>
    </Slider>
  )
}

export default MainBanner
