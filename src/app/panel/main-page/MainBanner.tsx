import useMedia from '@/hook/useMedia'
import { useRouter } from 'next/navigation'
import CuPhotoBox from '@/components/CuPhotoBox'

const MainBanner = () => {
  const { isPc } = useMedia()
  const router = useRouter()

  return (
    <CuPhotoBox
      onClick={() => router.push('/about')}
      style={{
        width: '100%',
        height: isPc ? '12.5rem' : '100px',
        cursor: 'pointer',
        fill: 'none',
      }}
      objectStyle="contain"
      src={
        !isPc
          ? '/images/banners/about-mobile.svg'
          : '/images/banners/about-pc.svg'
      }
      alt="main-banner"
      priorityOption={true}
    />
    // </Box>
  )
}

export default MainBanner
