'use client'

import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Typography } from '@mui/material'
import axios from 'axios'
import CuModal from '@/components/CuModal'
import CuTextField from '@/components/CuTextField'

interface IChangePassword {
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
}

export default function ModifyInfoModal() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [isPasswordChange, setIsPasswordChange] = useState(false)
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
      setIsPasswordChange(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Button onClick={handleOpen}>개인정보 수정</Button>
      <CuModal
        open={open}
        handleClose={handleClose}
        ariaTitle="유저 개인정보 수정"
        ariaDescription="유저의 개인정보를 수정합니다."
      >
        <Button onClick={handleClose}>완료</Button>
        <Typography>지역</Typography>
        <Button>인증하기</Button>
        <Typography>42계정</Typography>
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
                autoComplete="off"
                error={errors.newPasswordConfirm ? true : false}
                label="새로운 비밀번호 재입력"
              />
            )}
          />
          {errors.newPassword ? (
            <Typography>{errors.newPassword.message}</Typography>
          ) : errors.newPasswordConfirm ? (
            <Typography>{errors.newPasswordConfirm.message}</Typography>
          ) : isPasswordChange ? (
            <Typography style={{ color: 'green' }}>
              비밀번호가 변경되었습니다
            </Typography>
          ) : (
            <Typography>&nbsp;</Typography>
          )}
          <Button type="submit">확인</Button>
        </form>
      </CuModal>
    </>
  )
}
