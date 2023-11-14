'use client'

import { useState } from 'react'
import CuTextField from '@/components/CuTextField'
import { ControllerRenderProps } from 'react-hook-form'
import EyeIcon from '@/components/EyeIcon'
import IChangePassword from '../types/IChangePassword'
import { IconButton } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const PasswordField = ({
  field,
  autoComplete,
  placeholder,
  error,
}: {
  field: ControllerRenderProps<IChangePassword, any>
  autoComplete: string
  placeholder: string
  error: boolean
}) => {
  const [showPassword, setShowPassword] = useState<'password' | 'text'>(
    'password',
  )
  const deletePassword = () => {
    field.onChange('')
  }

  return (
    <CuTextField
      {...field}
      type={showPassword}
      autoComplete={autoComplete}
      placeholder={placeholder}
      error={error}
      InputProps={{
        endAdornment: (
          <>
            <EyeIcon
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <IconButton onClick={deletePassword} size="small">
              <HighlightOffIcon />
            </IconButton>
          </>
        ),
      }}
    />
  )
}

export default PasswordField
