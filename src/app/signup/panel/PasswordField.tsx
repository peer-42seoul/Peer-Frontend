import React, { useState } from 'react'

import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import EyeIcon from '@/components/EyeIcon'
import { Control, ControllerRenderProps, useFormState } from 'react-hook-form'
import { ISignUpInputs } from '@/types/ISignUpInputs'
import CheckIcon from '@mui/icons-material/Check'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { TextField } from '@mui/material'

const PasswordField = ({
  field,
  control,
}: {
  control: Control<ISignUpInputs, any>
  field: ControllerRenderProps<ISignUpInputs, 'password'>
}) => {
  const [showPassword, setShowPassword] = useState<'password' | 'text'>(
    'password',
  )

  const { errors } = useFormState({ control })

  const deletePassword = () => {
    field.onChange('')
  }

  const [showValidating, setShowValidating] = useState<boolean>(false)
  const isLengthValid = field.value.length >= 8
  const isNumberValid = /\d/.test(field.value)
  const isSpecialValid = /[!@#$%^&*]/.test(field.value)
  const isAlphabetValid = /[A-Z]/.test(field.value) && /[a-z]/.test(field.value)

  return (
    <>
      <CuTextFieldLabel htmlFor="password">
        <Typography variant="Caption">비밀번호</Typography>
      </CuTextFieldLabel>
      <TextField
        {...field}
        autoComplete="new-password"
        error={errors.password !== undefined}
        placeholder="비밀번호를 입력하세요."
        inputProps={{
          minLength: 8,
          maxLength: 20,
          pattern: '[A-Za-z0-9!@#$%^&*]*',
          type: showPassword,
        }}
        sx={{ width: '100%' }}
        onFocus={() => {
          setShowValidating(true)
        }}
        InputProps={{
          endAdornment: (
            <>
              <EyeIcon
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <IconButton onClick={deletePassword} size="small">
                <HighlightOffIcon sx={{ color: 'text.alternative' }} />
              </IconButton>
            </>
          ),
        }}
      />
      <Box
        sx={{
          display: showValidating ? 'flex' : 'none',
          gap: '10px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Typography
          variant="Caption"
          color={isAlphabetValid ? 'primary' : 'text.assistive'}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CheckIcon sx={{ fontSize: '16px', marginRight: '4px' }} />
          대소문자
        </Typography>
        <Typography
          variant="Caption"
          color={isLengthValid ? 'primary' : 'text.assistive'}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CheckIcon sx={{ fontSize: '16px', marginRight: '4px' }} />
          최소 8자
        </Typography>
        <Typography
          variant="Caption"
          color={isNumberValid ? 'primary' : 'text.assistive'}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CheckIcon sx={{ fontSize: '16px', marginRight: '4px' }} />
          숫자
        </Typography>
        <Typography
          variant="Caption"
          color={isSpecialValid ? 'primary' : 'text.assistive'}
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
