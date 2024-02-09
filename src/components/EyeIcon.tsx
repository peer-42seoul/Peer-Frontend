'use client'

import { Dispatch, SetStateAction } from 'react'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const EyeIcon = ({
  showPassword,
  setShowPassword,
}: {
  showPassword: 'password' | 'text'
  setShowPassword: Dispatch<SetStateAction<'password' | 'text'>>
}) => {
  return (
    <>
      <IconButton
        onClick={() => {
          setShowPassword(showPassword === 'password' ? 'text' : 'password')
        }}
      >
        {showPassword === 'password' ? (
          <VisibilityIcon sx={{ color: 'text.alternative'}} />
        ) : (
          <VisibilityOffIcon sx={{ color: 'text.alternative' }} />
        )}
      </IconButton>
    </>
  )
}

export default EyeIcon
