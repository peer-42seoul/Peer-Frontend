'use client'
import HomeIcon from '@mui/icons-material/Home'
import useMedia from '@/hook/useMedia'
import { useRouter } from 'next/navigation'
import React from 'react'
import CuButton from '@/components/CuButton'

const MyPage = () => {
  const router = useRouter()
  const { isPc } = useMedia()

  const buttonLabel = { display: 'flex', justifyContent: 'flex-start' }

  if (isPc) {
    router.push('/profile/MyPage')
    return <div></div>
  }
  return (
    <div>
      <CuButton
        variant="text"
        action={() => router.push('/my-page/profile')}
        message="프로필"
        startIcon={<HomeIcon />}
        fullWidth
        style={buttonLabel}
      />
      <CuButton
        variant="text"
        action={() => router.push('/my-page/interests')}
        fullWidth
        message="관심 리스트"
        startIcon={<HomeIcon />}
        style={buttonLabel}
      />
      <CuButton
        variant="text"
        action={() => router.push('/my-page/message')}
        message="쪽지"
        startIcon={<HomeIcon />}
        fullWidth
        style={buttonLabel}
      />
      <CuButton
        variant="text"
        action={() => router.push('/my-page/')}
        message="개인정보"
        startIcon={<HomeIcon />}
        fullWidth
        style={buttonLabel}
      />
      <CuButton
        variant="text"
        action={() => router.push('/my-page')}
        message="홈페이지 설정"
        startIcon={<HomeIcon />}
        fullWidth
        style={buttonLabel}
      />
    </div>
  )
}

export default MyPage
