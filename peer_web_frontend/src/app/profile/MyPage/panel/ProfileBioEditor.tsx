'use client'
import React, { useCallback, useState } from 'react'
import SettingContainer from './SettingContainer'
import {
  AlertColor,
  Avatar,
  Button,
  Grid,
  InputAdornment,
  Typography,
} from '@mui/material'
import { IProfileCard } from '@/types/IUserProfile'
import { useForm, Controller } from 'react-hook-form'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
// import { ChildProcessWithoutNullStreams } from 'child_process'
// import { File } from 'buffer'
// import axios from 'axios'

interface IFormInput {
  nickname: string
  introduction: string
  profileImage: File[]
}

interface IToastProps {
  severity?: AlertColor
  message: string
}

const ProfileBioEditor = ({
  data,
  closeModal,
  setToastMessage,
  setToastOpen,
}: {
  data: IProfileCard
  closeModal: () => void
  setToastMessage: (toastProps: IToastProps) => void
  setToastOpen: (isOpen: boolean) => void
}) => {
  const [isNicknameUnique, setIsNicknameUnique] = useState<boolean>(true)
  const [nicknameError, setNicknameError] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files && e.target.files[0]
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      setImage(e.target.files[0])
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(e.target.files && e.target.files[0])
    }
  }

  const defaultValues: IFormInput = {
    nickname: data.nickname,
    introduction: data.introduction,
    profileImage: [] as File[],
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    // getValues,
    watch,
  } = useForm<IFormInput>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const nickname = watch('nickname')

  // const profileImage = watch('profileImage')
  // useEffect(() => {
  //   if (profileImage) {
  //     const file = profileImage[0]
  //     setImage(URL.createObjectURL(file))
  //   }
  // }, [profileImage])

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
      setToastMessage({
        severity: 'success',
        message: '사용할 수 있는 닉네임 입니다.',
      })
      setToastOpen(true)
      if (nicknameError) setNicknameError(false) // 닉네임 폼 에러 띄우기 위함
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

  const onSubmit = (formData: IFormInput) => {
    const submitData: {
      profileImage: File | null
      nickname: string
      imageChanged: boolean
      introduction: string
    } = {
      ...formData,
      imageChanged: false,
      profileImage: image,
    }
    console.log('닉네임 중복확인', isNicknameUnique)
    if (!isNicknameUnique) {
      setToastMessage({
        severity: 'error',
        message: '닉네임 중복확인이 필요합니다.',
      })
      setToastOpen(true)
      setNicknameError(true)
    }
    if (submitData.profileImage) {
      submitData.imageChanged = true
    }
    console.log('on positive click', submitData)
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
            {/* <Controller
              render={({ field }) => ( */}
            <Button component="label">
              <Avatar
                src={
                  previewImage
                    ? previewImage
                    : data.profileImageURL
                    ? data.profileImageURL
                    : '/images/profile.jpeg'
                }
                alt="profile image"
              />
              <input
                type="file"
                accept={'image/*'}
                style={{ display: 'none' }}
                {...register('profileImage')}
                id="profileImage"
                name="profileImage"
                onChange={handleImageChange}
              />
            </Button>
            {/* )}
              name={'profileImageURL'}
              control={control}
            /> */}
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
                        if (nicknameError) setNicknameError(false)
                      },
                    }}
                    fullWidth={true}
                    error={(errors.nickname ? true : false) || nicknameError}
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
