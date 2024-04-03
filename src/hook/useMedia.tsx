'use client'

import { useMediaQuery } from '@mui/material'

const useMedia = () => {
  const isPc = useMediaQuery('(min-width:480px)')
  const isTablet = useMediaQuery('(min-width:480px) and (max-width:700px)')
  const isLargeTablet = useMediaQuery('(min-width:480px) and (max-width:997px)') // 팀 페이지 navBar에서 사용
  const isOverTablet = useMediaQuery('(min-width:794px)') // 팀 페이지 dnd에서 사용

  return { isPc, isTablet, isLargeTablet, isOverTablet }
}

export default useMedia
