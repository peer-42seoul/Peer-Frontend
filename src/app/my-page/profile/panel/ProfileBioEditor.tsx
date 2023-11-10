'use client'
import React, { useCallback, useState } from 'react'
import SettingContainer from './SettingContainer'
import {
  AlertColor,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'
import { IProfileCard } from '@/types/IUserProfile'
import { useForm, Controller } from 'react-hook-form'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import CuButton from '@/components/CuButton'
import useAxiosWithAuth from '@/api/config'

interface IFormInput {
  nickname: string
  introduction: string
  profileImage: File[] | null
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
  mutate,
}: {
  data: IProfileCard
  closeModal: () => void
  setToastMessage: (toastProps: IToastProps) => void
  setToastOpen: (isOpen: boolean) => void
  mutate: () => void
}) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [isNicknameUnique, setIsNicknameUnique] = useState<boolean>(true)
  const [nicknameError, setNicknameError] = useState<boolean>(false)
  // const [image, setImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(
    data.profileImageUrl,
  )
  const [imageChanged, setImageChanged] = useState<boolean>(false)

  const defaultValues: IFormInput = {
    nickname: data.nickname,
    introduction: data.introduction,
    profileImage: [] as File[],
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    register,
    // getValues,
    watch,
    setValue,
  } = useForm<IFormInput>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (e.target.files && e.target.files?.length && e.target.files[0]) {
      const reader = new FileReader()
      setValue('profileImage', [e.target.files[0]])
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
        setImageChanged(true)
      }
      if (file) reader.readAsDataURL(file)
    }
  }

  const handleImageDelete = () => {
    setValue('profileImage', null)
    // setImage(null)
    setPreviewImage(null)
    setImageChanged(true)
    console.log('handleImageDelete')
  }

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
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onClick = useCallback(() => {
      setIsLoading(true)
      const checkIsNicknameUnique = async () => {
        axiosWithAuth
          .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/signup/nickname`, {
            nickname,
          })
          .then(() => {
            setIsNicknameUnique(true)
            setToastMessage({
              severity: 'success',
              message: '사용할 수 있는 닉네임 입니다.',
            })
            setToastOpen(true)
            if (nicknameError) setNicknameError(false) // 중복확인 안했을 경우 닉네임 폼 에러 띄우기 위해 true로 되어있었음. 중복확인을 했으므로 false 처리
            setIsLoading(false)
          })
          .catch((error) => {
            console.log(error)
            setToastMessage({
              severity: 'error',
              message: '중복된 닉네임 입니다.',
            })
            setToastOpen(true)
            setIsLoading(false)
            setNicknameError(true)
          })
      }
      if (!isLoading) {
        checkIsNicknameUnique()
      }
      // TODO status code가 200이 아닐 경우 false 처리나 toast 띄우기
    }, [isLoading, nickname, setIsNicknameUnique])

    return (
      <CuButton
        variant="contained"
        disabled={errors.nickname ? isLoading : false}
        action={onClick}
        message="중복 확인"
      />
    )
  }

  const onSubmit = async (formData: IFormInput) => {
    const submitData = new FormData()
    submitData.append('nickname', formData.nickname)
    submitData.append('introduction', formData.introduction)
    submitData.append('profileImage', formData.profileImage![0])
    submitData.append('imageChange', imageChanged.toString().toUpperCase())

    console.log('닉네임 중복확인', isNicknameUnique)
    if (!isNicknameUnique) {
      setToastMessage({
        severity: 'error',
        message: '닉네임 중복확인이 필요합니다.',
      })
      setToastOpen(true)
      setNicknameError(true)
      return
    }

    await axiosWithAuth
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/introduction/edit`,
        submitData,
      )
      .then(() => {
        setToastMessage({
          severity: 'success',
          message: '프로필 변경에 성공하였습니다.',
        })
        setToastOpen(true)
        mutate()
        closeModal()
      })
      .catch(() => {
        setToastMessage({
          severity: 'error',
          message: '프로필 변경에 실패하였습니다.',
        })
        setToastOpen(true)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingContainer
        onNegativeClick={closeModal}
        settingTitle="introduction"
        isSubmitting={isSubmitting}
      >
        <Grid container spacing={2} rowSpacing={1}>
          {/* profile image */}
          <Grid item xs={12}>
            {/* <Controller
              render={({ field }) => ( */}
            <Box>
              <Box
                width={[56, 100]}
                height={[56, 100]}
                sx={{ position: 'relative' }}
              >
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '0',
                    right: '6px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50px',
                    borderColor: 'lightgray',
                    border: '1px',
                    padding: '4px',
                    backgroundColor: 'white',
                    zIndex: '9999',
                  }}
                  onClick={handleImageDelete}
                >
                  <ClearIcon />
                </IconButton>
                <Button
                  component="label"
                  sx={{ position: 'relative', width: '100%', height: '100%' }}
                >
                  <Avatar
                    src={
                      previewImage
                        ? previewImage
                        : // : data.profileImageUrl
                          // ? data.profileImageUrl
                          '/images/profile.jpeg'
                    }
                    alt="profile image"
                    sx={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      height: '100%',
                      width: '100%',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '0',
                      right: '6px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50px',
                      borderColor: 'lightgray',
                      border: '1px',
                      padding: '4px',
                      backgroundColor: 'white',
                    }}
                  >
                    <PhotoCameraOutlinedIcon />
                  </Box>
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
              </Box>
            </Box>

            {/* )}
              name={'profileImageUrl'}
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
