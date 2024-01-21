'use client'

import { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Typography, Stack, SxProps } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import IToastProps from '@/types/IToastProps'
import IChangePassword from '../types/IChangePassword'
import PasswordField from './PasswordField'

const buttonStyleBase: SxProps = {
  py: 0,
  px: '0.5rem',
  borderRadius: '0.25rem',
  width: '4rem',
  height: '1.75rem',
  wordBreak: 'keep-all',
}

export default function UserInfoEdit({
  authenticationFt,
  authenticationGoogle,
  setToastProps,
  openToast,
}: {
  local?: string
  authenticationFt?: string
  authenticationGoogle?: string
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
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const axiosWithAuth = useAxiosWithAuth()

  // const linkFt = async () => {
  //   try {
  //     const response = await axiosWithAuth.get('/oauth2/authorization/ft')

  //     console.log(response)
  //   } catch (error) {
  //     // 오류 처리
  //     console.error('Error:', error)
  //   }
  // }
  // const linkGoogle = async () => {
  //   try {
  //     const response = await axiosWithAuth.get('/oauth2/authorization/google')

  //     console.log(response)
  //   } catch (error) {
  //     // 오류 처리
  //     console.error('Error:', error)
  //   }
  // }

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
      <Stack spacing={2} direction="row" alignItems={'center'}>
        <Typography variant="CaptionEmphasis" color="text.strong">
          42 계정
        </Typography>
        {authenticationFt ? (
          <Typography variant="Body2" color="text.alternative">
            {authenticationFt}
          </Typography>
        ) : (
          <Button
            variant="contained"
            href={`${API_URL}/oauth2/authorization/ft`}
            sx={buttonStyleBase}
          >
            <Typography variant="CaptionEmphasis" color="text.strong">
              인증하기
            </Typography>
          </Button>
        )}
      </Stack>
      <Stack spacing={2} direction="row" alignItems={'center'}>
        <Typography variant="CaptionEmphasis" color="text.strong">
          구글 계정
        </Typography>
        {authenticationGoogle ? (
          <Typography variant="Body2" color="text.alternative">
            {authenticationGoogle}
          </Typography>
        ) : (
          <Button
            variant="contained"
            href={`${API_URL}/oauth2/authorization/google`}
            sx={buttonStyleBase}
          >
            <Typography variant="CaptionEmphasis" color="text.strong">
              인증하기
            </Typography>
          </Button>
        )}
      </Stack>
      {/* 현재 지역인증이 기획에서 빠졌으므로 주석처리 하였습니다 */}
      {/* <Stack spacing={2} direction="row" alignItems={'center'}>
        <Typography variant="CaptionEmphasis" color="text.strong">
          지역
        </Typography>
        {local ? (
          <Typography variant="Body2" color="text.alternative">
            {local}
          </Typography>
        ) : (
          <Button variant="contained">
            <Typography variant="CaptionEmphasis" color="text.strong">
              인증하기
            </Typography>
          </Button>
        )}
      </Stack> */}
      <form onSubmit={handleSubmit(changePassword)}>
        <Stack spacing={1}>
          <Typography variant="CaptionEmphasis" color="text.strong">
            비밀번호
          </Typography>
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
          <Typography color="error" variant="Caption">
            {errors.newPassword?.message ||
              errors.confirmPassword?.message ||
              '\u00A0'}
          </Typography>
        </Stack>
        <Button type="submit">변경하기</Button>
      </form>
    </>
  )
}
