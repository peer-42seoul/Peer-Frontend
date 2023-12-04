'use client'
import React, { useCallback, useRef, useState } from 'react'
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
import useModal from '@/hook/useModal'
import CuModal from '@/components/CuModal'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

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
  const [previewImage, setPreviewImage] = useState<string | null>(
    data.profileImageUrl,
  )
  const [imageChanged, setImageChanged] = useState<boolean>(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const [cropper, setCropper] = useState<Cropper | null>(null)
  const [selectedFile, setSelectedFile] = useState<File[] | null>(null)

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
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<IFormInput>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const {
    isOpen,
    openModal: openCropModal,
    closeModal: closeCropModal,
  } = useModal()

  const squareBoxStyle = {
    width: '100%',
    height: 0,
    paddingBottom: '100%',
    position: 'relative',
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (e.target.files && e.target.files?.length && e.target.files[0]) {
      const reader = new FileReader()
      setSelectedFile([e.target.files[0]])
      reader.onload = () => {
        // 크로퍼 설정
        const imageElement: any = imageRef.current
        imageElement.src = reader.result

        // 크로퍼가 있으면 크로퍼 삭제
        if (cropper) {
          cropper.destroy()
        }
        openCropModal()

        const newCropper = new Cropper(imageElement, {
          aspectRatio: 1,
          viewMode: 1,
          dragMode: 'move',
          autoCropArea: 1,
          cropBoxResizable: false,
          modal: true,
          // ... other options
        })

        setCropper(newCropper)
      }
      if (file) reader.readAsDataURL(file)
    }
  }

  const handleCrop = () => {
    if (cropper && selectedFile) {
      // Get the cropped data as a Blob
      cropper
        .getCroppedCanvas({ width: 128, height: 128 })
        .toBlob((blob: Blob | null) => {
          if (blob) {
            // Create a FormData object and append the original file
            const image = selectedFile
            if (image) {
              const newImage = new File([blob], image[0].name, {
                type: `image/${image[0].type.split('/')[1]}`,
              })

              setValue('profileImage', [newImage])

              const reader = new FileReader()
              reader.onload = (e) => {
                setPreviewImage(e.target?.result as string)
                setImageChanged(true)
              }
              reader.readAsDataURL(newImage)
            }

            // Close the modal after cropping
            closeCropModal()
          }
        })
    }
  }

  const handleCancelCrop = () => {
    closeCropModal()
    setSelectedFile(null)
  }

  const handleImageDelete = () => {
    setValue('profileImage', null)
    // setImage(null)
    setPreviewImage(null)
    setImageChanged(true)
    console.log('handleImageDelete')
  }

  const nickname = watch('nickname')

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
            if (errors.nickname?.type === 'notUnique') {
              clearErrors('nickname')
            }
            setToastOpen(true)
            setIsLoading(false)
          })
          .catch((error) => {
            setIsNicknameUnique(false)
            console.log(error)
            setToastMessage({
              severity: 'error',
              message: '중복된 닉네임 입니다.',
            })
            setToastOpen(true)
            setError('nickname', {
              type: 'notUnique',
              message: '새로운 닉네임을 입력해주세요.',
            })
            setIsLoading(false)
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
        disabled={
          data.nickname === nickname ||
          isNicknameUnique ||
          (errors.nickname && errors.nickname?.type !== 'notUnique')
            ? true
            : isLoading
        }
        action={onClick}
        message="중복 확인"
      />
    )
  }

  const onSubmit = async (formData: IFormInput) => {
    const submitData = new FormData()
    submitData.append('nickname', formData.nickname)
    submitData.append('introduction', formData.introduction)
    if (formData.profileImage?.length) {
      submitData.append(
        'profileImage',
        formData.profileImage![0],
        formData.profileImage[0]?.name,
      )
    }
    submitData.append('imageChange', imageChanged.toString().toUpperCase())

    console.log('닉네임 중복확인', isNicknameUnique)
    if (!isNicknameUnique) {
      // setToastMessage({
      //   severity: 'error',
      //   message: '닉네임 중복확인이 필요합니다.',
      // })
      // setToastOpen(true)
      // setNicknameError(true)
      setError('nickname', {
        type: 'notUnique',
        message: '닉네임 중복확인이 필요합니다.',
      })
      return
    }

    await axiosWithAuth
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/introduction/edit`,
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
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
                    src={previewImage ? previewImage : '/images/profile.jpeg'}
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
                    accept={'image/jpeg, image/jpg, image/png'}
                    style={{ display: 'none' }}
                    {...register('profileImage')}
                    id="profileImage"
                    name="profileImage"
                    onChange={handleImageChange}
                  />
                </Button>
              </Box>
            </Box>
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
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      if (isNicknameUnique) setIsNicknameUnique(false)
                      if (errors?.nickname?.type === 'notUnique')
                        clearErrors('nickname')
                    }}
                    helperText={errors.nickname?.message}
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
                rules={{
                  required: '닉네임은 필수로 기입해야 합니다.',
                  maxLength: {
                    value: 7,
                    message: '닉네임은 최대 7글자까지만 적용 가능합니다.',
                  },
                  minLength: {
                    value: 2,
                    message: '닉네임은 최소 두 글자 이상 작성해야 합니다.',
                  },
                }}
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
                    {...field}
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
                rules={{
                  maxLength: {
                    value: 150,
                    message: '자기소개는 최대 150자까지만 입력 가능합니다.',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <CuModal
          open={isOpen}
          handleClose={closeCropModal}
          keepMounted
          ariaDescription=""
          ariaTitle=""
        >
          <Box>
            <Box sx={squareBoxStyle}>
              <img
                ref={imageRef}
                alt="Preview"
                style={{
                  borderRadius: '50%',
                  width: '100%',
                  height: '100%',
                  display: 'none',
                }}
              />
            </Box>

            <CuButton
              variant="contained"
              action={handleCancelCrop}
              message="취소"
            ></CuButton>
            <CuButton
              variant="contained"
              action={handleCrop}
              message="완료"
            ></CuButton>
          </Box>
        </CuModal>
      </SettingContainer>
    </form>
  )
}

export default ProfileBioEditor
