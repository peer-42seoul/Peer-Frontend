'use client'

import { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Typography, Container, Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import IToastProps from '@/types/IToastProps'
import IChangePassword from '../types/IChangePassword'

import PasswordField from './PasswordField'

export default function UserInfoEdit({
  local,
  authentication,
  setToastProps,
  openToast,
}: {
  local?: string
  authentication?: string
  setToastProps: Dispatch<SetStateAction<IToastProps>>
  openToast: () => void
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IChangePassword>({
    defaultValues: {
      presentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const axiosWithAuth = useAxiosWithAuth()
  const changePassword: SubmitHandler<IChangePassword> = async (data) => {
    try {
      await axiosWithAuth.put(`/api/v1/info/password`, data)
      setToastProps({
        severity: 'success',
        message: '비밀번호가 변경되었습니다',
      })
      reset()
    } catch (error: any) {
      if (
        error.response?.status === 404 || // 사용자를 찾을 수 없음
        error.response?.status === 400 || // 변경할 비밀번호와 확인 비밀번호가 일치하지 않음
        error.response?.status === 403 // 현재 비밀번호가 올바르지 않음
      ) {
        setToastProps({
          severity: 'error',
          message: error.response.data.message,
        })
      } else {
        setToastProps({
          severity: 'error',
          message: '비밀번호 변경에 실패했습니다',
        })
      }
      console.log(error)
    }
    openToast()
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
          <Stack spacing={1}>
            <Typography>비밀번호</Typography>
            <Controller
              name="presentPassword"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <PasswordField
                  field={field}
                  autoComplete="off"
                  placeholder="현재 비밀번호"
                  error={errors.presentPassword ? true : false}
                />
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: {
                  minLength: (value) =>
                    value.length >= 8 || '비밀번호는 8자 이상이어야 합니다',
                  maxLength: (value) =>
                    value.length <= 20 || '비밀번호는 20자 이하여야 합니다',
                  includeNumber: (value) =>
                    /\d/.test(value) || '비밀번호에 숫자가 포함되어야 합니다',
                  includeSpecial: (value) =>
                    /[!@#$%^&*]/.test(value) ||
                    '비밀번호에 특수문자가 포함되어야 합니다',
                  includeCapital: (value) =>
                    /[A-Z]/.test(value) ||
                    '비밀번호에 대문자가 포함되어야 합니다',
                  includeSmall: (value) =>
                    /[a-z]/.test(value) ||
                    '비밀번호에 소문자가 포함되어야 합니다',
                },
              }}
              render={({ field }) => (
                <PasswordField
                  field={field}
                  autoComplete="off"
                  placeholder="새로운 비밀번호"
                  error={errors.newPassword ? true : false}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: (value) =>
                  value === getValues('newPassword') ||
                  '비밀번호가 일치하지 않습니다',
              }}
              render={({ field }) => (
                <PasswordField
                  field={field}
                  autoComplete="off"
                  placeholder="새로운 비밀번호 확인"
                  error={errors.confirmPassword ? true : false}
                />
              )}
            />
            {errors.newPassword ? (
              <Typography color="error">
                {errors.newPassword.message
                  ? errors.newPassword.message
                  : '비밀번호를 입력해주세요'}
              </Typography>
            ) : errors.confirmPassword ? (
              <Typography color="error">
                {errors.confirmPassword.message}
              </Typography>
            ) : (
              <Typography>&nbsp;</Typography>
            )}
          </Stack>
          <Button type="submit">변경하기</Button>
        </form>
      </Container>
    </>
  )
}
