'use client'
import React, { useCallback, useState } from 'react'
import SettingContainer from './SettingContainer'
import { Avatar, Button, Grid, InputAdornment, Typography } from '@mui/material'
import { IProfileCard } from '@/types/IUserProfile'
import { useForm, Controller } from 'react-hook-form'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
// import axios from 'axios'

interface IFormInput {
  nickname: string
  introduction: string
}

const ProfileBioEditor = ({
  data,
  closeModal,
  setToastMessage,
  setToastOpen,
}: {
  data: IProfileCard
  closeModal: () => void
  setToastMessage: (message: string) => void
  setToastOpen: (isOpen: boolean) => void
}) => {
  const [isNicknameUnique, setIsNicknameUnique] = useState<boolean>(false)

  const defaultValues: IFormInput = {
    nickname: data.nickname,
    introduction: data.introduction,
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    // getValues,
    watch,
  } = useForm<IFormInput>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const nickname = watch('nickname')

  // useEffect(() => {
  //   if (!isNicknameUnique) return
  //   setIsNicknameUnique(false)
  // }, [nickname])

  const NicknameCheckButton = ({
    nickname,
    setIsNicknameUnique,
  }: {
    nickname: string
    setIsNicknameUnique: (isNicknameUnique: boolean) => void
  }) => {
    const onClick = useCallback(() => {
      console.log('닉네임 중복확인 api', nickname)
      setIsNicknameUnique(true)
      // TODO status code가 200이 아닐 경우 false 처리나 toast 띄우기
    }, [nickname, setIsNicknameUnique])

    return (
      <Button
        variant="contained"
        disabled={errors.nickname ? true : false}
        onClick={onClick}
      >
        중복 확인
      </Button>
    )
  }

  const onSubmit = (data: IFormInput) => {
    console.log('닉네임 중복확인', isNicknameUnique)
    if (!isNicknameUnique) return
    console.log('on positive click', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingContainer
        onNegativeClick={closeModal}
        // onPositiveClick={onSubmit}
        settingTitle="introduction"
      >
        <Grid container spacing={2} rowSpacing={1}>
          {/* profile image */}
          <Grid item xs={12}>
            <Avatar
              src={
                data.profileImageURL
                  ? data.profileImageURL
                  : '/images/profile.jpeg'
              }
              alt="profile image"
            />
          </Grid>
          {/* nickname, association, email, introduction */}
          <Grid item container spacing={2} justifyContent={'flex-start'}>
            {/* 닉네임 수정 */}
            <Grid item xs={3}>
              <CuTextFieldLabel htmlFor="nickname">닉네임</CuTextFieldLabel>
            </Grid>
            <Grid item xs={9}>
              <Controller
                render={({ field }) => (
                  <CuTextField
                    id="nickname"
                    variant="outlined"
                    field={{
                      ...field,
                      onChange: (e: any[]) => {
                        field.onChange(e)
                        if (isNicknameUnique) setIsNicknameUnique(false)
                      },
                    }}
                    fullWidth={true}
                    error={errors.nickname ? true : false}
                    autoComplete="off"
                    placeholder="닉네임은 두 글자 이상이어야 합니다."
                    inputProps={{ minLength: 2, maxLength: 7 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <NicknameCheckButton
                            nickname={nickname}
                            setIsNicknameUnique={setIsNicknameUnique}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                name="nickname"
                control={control}
                rules={{ required: true, maxLength: 7, minLength: 2 }}
              />
            </Grid>
            {/* association */}
            <Grid item xs={3}>
              <Typography>소속</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {data.association ? data.association : '해당 없음'}
              </Typography>
            </Grid>
            {/* email */}
            <Grid item xs={3}>
              <Typography>아이디</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{data.email}</Typography>
            </Grid>
            {/* introduction message */}
            <Grid item xs={12} style={{ display: 'none' }}>
              <CuTextFieldLabel htmlFor="introduction">
                자기 소개
              </CuTextFieldLabel>
            </Grid>
            <Grid item xs={12}>
              <Controller
                render={({ field }) => (
                  <CuTextField
                    label=""
                    variant="outlined"
                    id="introduction"
                    field={field}
                    autoComplete="off"
                    fullWidth
                    inputProps={{ maxLength: 150 }}
                    multiline
                    maxRows={4}
                    minRows={4}
                  />
                )}
                name="introduction"
                control={control}
                rules={{ maxLength: 150 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </SettingContainer>
    </form>
  )
}

export default ProfileBioEditor
