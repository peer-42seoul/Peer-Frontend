import React, { useState } from 'react'

import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { ControllerRenderProps, UseFormSetValue } from 'react-hook-form'
import { ISignUpInputs } from '@/types/ISignUpInputs'
import CheckIcon from '@mui/icons-material/Check'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const PasswordField = ({
  field,
  setValue,
}: {
  field: ControllerRenderProps<ISignUpInputs, 'password'>
  setValue: UseFormSetValue<ISignUpInputs>
}) => {
  const [showPassword, setShowPassword] = useState<'password' | 'text'>(
    'password',
  )

  const deletePassword = () => {
    setValue('password', '')
  }

  const isLengthValid = field.value.length >= 8
  const isNumberValid = /\d/.test(field.value)
  const isSpecialValid = /[!@#$%^&*]/.test(field.value)
  const isAlphabetValid = /[A-Z]/.test(field.value) && /[a-z]/.test(field.value)

  return (
    <>
      <CuTextFieldLabel htmlFor="password">비밀번호</CuTextFieldLabel>
      <CuTextField
        {...field}
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
            <>
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
              <IconButton onClick={deletePassword} size="small">
                <HighlightOffIcon />
              </IconButton>
            </>
          ),
        }}
      />
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Typography
          color={isAlphabetValid ? 'primary' : ''}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CheckIcon sx={{ fontSize: '16px', marginRight: '4px' }} />
          대소문자
        </Typography>
        <Typography
          color={isLengthValid ? 'primary' : ''}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CheckIcon sx={{ fontSize: '16px', marginRight: '4px' }} />
          최소 8자
        </Typography>
        <Typography
          color={isNumberValid ? 'primary' : ''}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CheckIcon sx={{ fontSize: '16px', marginRight: '4px' }} />
          숫자
        </Typography>
        <Typography
          color={isSpecialValid ? 'primary' : ''}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CheckIcon sx={{ fontSize: '16px', marginRight: '4px' }} />
          특수문자
        </Typography>
      </Box>
    </>
  )
}

export default PasswordField
