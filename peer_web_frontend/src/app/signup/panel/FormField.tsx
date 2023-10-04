'use client'
import { Controller } from 'react-hook-form'
import { InputLabel, TextField, Typography, Button } from '@mui/material'

interface IFormField {
  label: string
  name: string
  control: any
  error: any
}

const FormField = ({ label, name, control, error }: IFormField) => {
  const rules =
    label === '비밀번호'
      ? {
          required: `${label}을 입력해주세요`,
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
            message: '8자 이상의 영문, 숫자 조합이어야 합니다',
          },
        }
      : { required: `${label}을 입력해주세요` }

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <InputLabel>{label}</InputLabel>
            <TextField {...field} type="text" />
            {label === '이메일' && <Button>이메일 인증</Button>}
          </>
        )}
      />
      {(error && <Typography>{error.message}</Typography>) || (
        <Typography>&nbsp;</Typography>
      )}
    </>
  )
}

export default FormField
