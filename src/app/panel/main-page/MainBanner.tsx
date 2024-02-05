'use client'

import { Stack } from '@mui/material'
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
    // autoplay: true,
    // autoplaySpeed: 3000,
    pauseOnHover: true,
  }

  return (
    <Slider {...settings}>
      <Stack m={0} p={0}>
        <Image
          src={
            !isPc
              ? '/images/banners/default-mobile.svg'
              : '/images/banners/default-pc.svg'
          }
          alt={'main-banner'}
          width={isPc ? 850 : 350}
          height={isPc ? 250 : 150}
        />
      </Stack>

      <Stack m={0} p={0}>
        <Image
          src={
            !isPc
              ? '/images/banners/about-mobile.svg'
              : '/images/banners/about-pc.svg'
          }
          useMap="#about-banner"
          alt={'about-banner'}
          width={isPc ? 850 : 350}
          height={isPc ? 250 : 150}
        />
        <map name="about-banner">
          <area
            shape="rect"
            coords={isPc ? '280,100,350,150' : '120,90,170,130'}
            alt="about-banner"
            onClick={() => router.push('/about')}
            onKeyUp={() => {}}
          />
        </map>
      </Stack>
    </Slider>
  )
}

export default MainBanner
