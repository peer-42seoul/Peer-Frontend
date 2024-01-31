'use client'
import CuModal from '@/components/CuModal'
import React, { useState } from 'react'
import { EApiType } from '@/types/EApiType'
import EncryptedSender from '@/components/EncryptedSender'
import FieldWithLabel from './FieldWithLabel'
import { Box, Stack, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as style from './privacy-setting.style'
import useToast from '@/states/useToast'

const PasswordCheck = ({
  setPayload,
}: {
  setPayload: (payload: any) => void
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ password: string }>({ mode: 'onChange' })

  const onSubmit = (data: { password: string }) => {
    setPayload({ password: data.password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="password-check">
      <Stack spacing={'1rem'}>
        <Controller
          render={({ field }) => (
            <FieldWithLabel
              variant="outlined"
              {...field}
              id={'password'}
              title={'현재 비밀번호 확인'}
              placeholder="현재 비밀번호를 입력해주세요."
              inputProps={{
                type: 'password',
                maxLength: 20,
              }}
              autoComplete="current-password"
              error={!!errors.password}
              helperText={
                <Typography
                  variant="Caption"
                  color={'error'}
                  height={'1.125rem'}
                >
                  {errors.password && errors.password.message}
                </Typography>
              }
            />
          )}
          name="password"
          rules={{
            required: true,
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다',
            },
            maxLength: {
              value: 20,
              message: '비밀번호는 20자 이하여야 합니다',
            },
            validate: {
              includeNumber: (value) =>
                /\d/.test(value) || '비밀번호에 숫자가 포함되어야 합니다',
              includeSpecial: (value) =>
                /[!@#$%^&*]/.test(value) ||
                '비밀번호에 특수문자가 포함되어야 합니다',
              includeCapital: (value) =>
                /[A-Z]/.test(value) || '비밀번호에 대문자가 포함되어야 합니다',
              includeSmall: (value) =>
                /[a-z]/.test(value) || '비밀번호에 소문자가 포함되어야 합니다',
            },
          }}
          control={control}
        />
      </Stack>
    </form>
  )
}

const PasswordModify = ({
  setPayload,
  code,
}: {
  setPayload: (payload: any) => void
  code: string
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    // reset,
  } = useForm<{ newPassword: string; confirmPassword: string }>({
    mode: 'onChange',
  })

  const onSubmit = (data: { newPassword: string; confirmPassword: string }) => {
    setPayload({ password: data.newPassword, code })
    // reset()
  }

  const newPassword = watch('newPassword')

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="password-modify">
      <Stack spacing={'1rem'}>
        <Controller
          render={({ field }) => (
            <FieldWithLabel
              variant="outlined"
              {...field}
              id={'newPassword'}
              title={'새 비밀번호 입력'}
              placeholder="최소 8자, 최대 20자, 영문 대소문자, 숫자, 특수문자를 포함해주세요."
              inputProps={{
                type: 'password',
                maxLength: 20,
              }}
              autoComplete="new-password"
              error={!!errors.newPassword}
              helperText={
                <Typography
                  variant="Caption"
                  color={'error'}
                  height={'1.125rem'}
                >
                  {errors.newPassword && errors.newPassword.message}
                </Typography>
              }
            />
          )}
          name="newPassword"
          rules={{
            required: true,
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다',
            },
            maxLength: {
              value: 20,
              message: '비밀번호는 20자 이하여야 합니다',
            },
            validate: {
              includeNumber: (value) =>
                /\d/.test(value) || '비밀번호에 숫자가 포함되어야 합니다',
              includeSpecial: (value) =>
                /[!@#$%^&*]/.test(value) ||
                '비밀번호에 특수문자가 포함되어야 합니다',
              includeCapital: (value) =>
                /[A-Z]/.test(value) || '비밀번호에 대문자가 포함되어야 합니다',
              includeSmall: (value) =>
                /[a-z]/.test(value) || '비밀번호에 소문자가 포함되어야 합니다',
            },
          }}
          control={control}
        />
        <Controller
          render={({ field }) => (
            <FieldWithLabel
              variant="outlined"
              {...field}
              id={'confirmPassword'}
              title={'새 비밀번호 재입력'}
              placeholder="최소 8자, 최대 20자, 영문 대소문자, 숫자, 특수문자를 포함해주세요."
              inputProps={{
                type: 'password',
                maxLength: 20,
              }}
              autoComplete="confirmPassword"
              error={!!errors.confirmPassword}
              helperText={
                <Typography
                  variant="Caption"
                  color={'error'}
                  height={'1.125rem'}
                >
                  {errors.confirmPassword && errors.confirmPassword.message}
                </Typography>
              }
            />
          )}
          name="confirmPassword"
          rules={{
            required: true,
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다',
            },
            maxLength: {
              value: 20,
              message: '비밀번호는 20자 이하여야 합니다',
            },
            validate: {
              includeNumber: (value) =>
                /\d/.test(value) || '비밀번호에 숫자가 포함되어야 합니다',
              includeSpecial: (value) =>
                /[!@#$%^&*]/.test(value) ||
                '비밀번호에 특수문자가 포함되어야 합니다',
              includeCapital: (value) =>
                /[A-Z]/.test(value) || '비밀번호에 대문자가 포함되어야 합니다',
              includeSmall: (value) =>
                /[a-z]/.test(value) || '비밀번호에 소문자가 포함되어야 합니다',
              isSame: (value) =>
                newPassword === value || '비밀번호가 일치하지 않습니다.',
            },
          }}
          control={control}
        />
      </Stack>
    </form>
  )
}

const PasswordChangeModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean
  closeModal: () => void
}) => {
  const [data, setData] = useState<any>(null)
  const [payload, setPayload] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { openToast } = useToast()

  console.log(data, payload)

  const handleCloseModal = () => {
    // 모달이 꺼져도 데이터가 남아있는 문제가 있어서 초기화 후 꺼지도록 처리하였습니다.
    setPayload(null)
    setData(null)
    closeModal()
  }

  const onSuccess = () => {
    openToast({
      severity: 'success',
      message: '비밀번호가 변경되었습니다.',
    })
    handleCloseModal()
  }

  const onError = (message: string) => {
    openToast({
      severity: 'error',
      message,
    })
  }

  return (
    <CuModal
      open={isOpen}
      onClose={handleCloseModal}
      title="비밀번호 변경"
      mobileFullSize
      textButton={{
        text: '취소',
        onClick: handleCloseModal,
        isLoading: isSubmitting,
      }}
      containedButton={{
        text: '변경하기',
        type: 'submit',
        form: data ? 'password-modify' : 'password-check',
        isLoading: isSubmitting,
      }}
    >
      <Stack
        direction={'column'}
        spacing={'1.5rem'}
        height={'100%'}
        sx={{ flexGrow: 1 }}
      >
        <>
          <Stack
            direction={'row'}
            spacing={'0.75rem'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Box
              sx={{ ...style.circleStyle }}
              bgcolor={data ? 'background.tertiary' : 'purple.strong'}
            />
            <Box
              sx={{ ...style.circleStyle }}
              bgcolor={data ? 'purple.strong' : 'background.tertiary'}
            />
          </Stack>
          <Stack
            direction={'column'}
            justifyContent={'center'}
            height={'100%'}
            sx={{ flexGrow: 1 }}
          >
            {data ? (
              <EncryptedSender
                payload={payload}
                setPayload={setPayload}
                apiType={EApiType.PASSWORD_MODIFY}
                setData={setData}
                needToken
                onSuccess={onSuccess}
                onError={onError}
                setIsLoading={setIsSubmitting}
              >
                <PasswordModify setPayload={setPayload} code={data.code} />
              </EncryptedSender>
            ) : (
              <EncryptedSender
                payload={payload}
                setPayload={setPayload}
                apiType={EApiType.PASSWORD_CHECK}
                setData={setData}
                needToken
                onError={onError}
              >
                <PasswordCheck setPayload={setPayload} />
              </EncryptedSender>
            )}
          </Stack>
        </>
      </Stack>
    </CuModal>
  )
}

export default PasswordChangeModal
