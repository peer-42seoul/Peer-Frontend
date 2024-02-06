import { Box } from '@mui/material'
import useMedia from '@/hook/useMedia'
import { useRouter } from 'next/navigation'

const MainBanner = () => {
  const { isPc } = useMedia()
  const router = useRouter()
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
            ? '/images/banners/about-mobile.svg'
            : '/images/banners/about-pc.svg'
        }
        alt={'main-banner'}
        width={'100%'}
        height={'100%'}
        style={{ cursor: 'pointer' }}
        onClick={() => router.push('/about')}
        onMouseUp={() => {}}
      />
    </Box>
  )
}

export default MainBanner
