import { Stack } from '@mui/material'
import useMedia from '@/hook/useMedia'
import Image from 'next/image'

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
      {/* <map name="main-banner">
        <area
          shape="rect"
          coords={isPc ? '280,100,350,150' : '120,90,170,130'}
          alt="main-banner"
          onKeyUp={() => {}}
        />
      </map> */}
    </Stack>
  )
}

export default MainBanner
