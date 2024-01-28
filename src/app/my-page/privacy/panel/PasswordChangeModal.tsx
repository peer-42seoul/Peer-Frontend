'use client'
import CuModal from '@/components/CuModal'
import React, { useState } from 'react'
import { EApiType } from '@/types/EApiType'
import EncryptedSender from '@/components/EncryptedSender'
import FieldWithLabel from './FieldWithLabel'
import { Stack, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

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
              autoComplete="password"
              error={!!errors.password}
              helperText={
                <Typography variant="Caption" color={'error'}>
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

const PasswordChangeModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean
  closeModal: () => void
}) => {
  const [data, setData] = useState<any>(null)
  const [payload, setPayload] = useState<any>(null)

  return (
    <CuModal
      open={isOpen}
      onClose={closeModal}
      title="비밀번호 변경"
      textButton={{
        text: '취소',
        onClick: closeModal,
      }}
      containedButton={{
        text: '변경하기',
        type: 'submit',
        form: 'password-check',
      }}
    >
      <EncryptedSender
        payload={payload}
        setPayload={setPayload}
        apiType={EApiType.PASSWORD_CHECK}
        setData={setData}
        needToken
      >
        <PasswordCheck setPayload={setPayload} />
      </EncryptedSender>
    </CuModal>
  )
}

export default PasswordChangeModal
