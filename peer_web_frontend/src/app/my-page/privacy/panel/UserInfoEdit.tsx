'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Typography, Container } from '@mui/material'
import axios from 'axios'
import CuTextField from '@/components/CuTextField'

interface IChangePassword {
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
}

export default function UserInfoEdit({
  local,
  authentication,
}: {
  local?: string
  authentication?: string
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<IChangePassword>({ mode: 'onChange' })

  const changePassword: SubmitHandler<IChangePassword> = async (data) => {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
    try {
      await axios.post(`${API_URL}api/v1/info`, data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        component="main"
      >
        <Typography>지역</Typography>
        {local ? <Typography>{local}</Typography> : null}
        <Button>인증하기</Button>
        <Typography>42계정</Typography>
        {authentication ? <Typography>{authentication}</Typography> : null}
        <Button>인증하기</Button>
        <form onSubmit={handleSubmit(changePassword)}>
          <Typography>비밀번호</Typography>
          <Controller
            name="currentPassword"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <CuTextField
                field={field}
                type="password"
                autoComplete="off"
                error={errors.currentPassword ? true : false}
                label="현재 비밀번호"
              />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*<>])[A-Za-z\d~!@#$%^&*<>]{8,}$/i,
                message: '8자 이상의 영문, 숫자, 특수문자 조합이어야 합니다',
              },
            }}
            render={({ field }) => (
              <CuTextField
                field={field}
                type="password"
                autoComplete="off"
                error={errors.newPassword ? true : false}
                label="새로운 비밀번호"
              />
            )}
          />
          <Controller
            name="newPasswordConfirm"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*<>])[A-Za-z\d~!@#$%^&*<>]{8,}$/i,
                message: '8자 이상의 영문, 숫자, 특수문자 조합이어야 합니다',
              },
              validate: (value) =>
                value !== getValues('newPassword') &&
                '비밀번호가 일치하지 않습니다',
            }}
            render={({ field }) => (
              <CuTextField
                field={field}
                type="password"
                autoComplete="off"
                error={errors.newPasswordConfirm ? true : false}
                label="새로운 비밀번호 재입력"
              />
            )}
          />
          {errors.newPassword ? (
            <Typography color="error">
              {errors.newPassword.message
                ? errors.newPassword.message
                : '비밀번호를 입력해주세요'}
            </Typography>
          ) : errors.newPasswordConfirm ? (
            <Typography color="error">
              {errors.newPasswordConfirm.message}
            </Typography>
          ) : (
            <Typography>&nbsp;</Typography>
          )}
          <Button type="submit">변경하기</Button>
        </form>
      </Container>
    </>
  )
}
