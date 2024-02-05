'use client'

import { useMediaQuery } from '@mui/material'

const useMedia = () => {
  const isPc = useMediaQuery('(min-width:480px)')
  const isTablet = useMediaQuery('(min-width:480px) and (max-width:700px)')

  return { isPc, isTablet }
}

export default useMedia
