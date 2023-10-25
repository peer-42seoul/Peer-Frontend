import { Dispatch, SetStateAction } from 'react'

import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import { IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const PasswordField = ({
  field,
  showPassword,
  setShowPassword,
}: {
  field: any
  showPassword: 'password' | 'text'
  setShowPassword: Dispatch<SetStateAction<'password' | 'text'>>
}) => {
  return (
    <>
      <CuTextFieldLabel htmlFor="password">비밀번호</CuTextFieldLabel>
      <CuTextField
        field={field}
        autoComplete="off"
        error={false}
        type={showPassword}
        placeholder="비밀번호를 입력하세요"
        inputProps={{
          minLength: 8,
          maxLength: 20,
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => {
                setShowPassword(
                  showPassword === 'password' ? 'text' : 'password',
                )
              }}
            >
              {showPassword === 'password' ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </IconButton>
          ),
        }}
      />
    </>
  )
}

export default PasswordField
