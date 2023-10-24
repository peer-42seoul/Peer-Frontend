'use client'

import { useMediaQuery } from '@mui/material'

const useMedia = () => {
  const isPc = useMediaQuery('(min-width:480px)')
  return { isPc }
}

export default useMedia
