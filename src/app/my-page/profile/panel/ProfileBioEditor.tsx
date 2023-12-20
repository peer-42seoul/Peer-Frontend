'use client'
import React, { useCallback, useRef, useState } from 'react'
import {
  AlertColor,
  Avatar,
  Box,
  Button,
  InputAdornment,
  Typography,
  Stack,
  alpha,
  useTheme,
} from '@mui/material'
import { IProfileCard } from '@/types/IUserProfile'
import { useForm, Controller } from 'react-hook-form'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import useAxiosWithAuth from '@/api/config'
import useModal from '@/hook/useModal'
import CuModal from '@/components/CuModal'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { PlusIcon } from '@/icons'
import TrashIcon from '@/icons/TrashIcon'

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
  open,
}: {
  data: IProfileCard
  closeModal: () => void
  setToastMessage: (toastProps: IToastProps) => void
  setToastOpen: (isOpen: boolean) => void
  mutate: () => void
  open: boolean
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
          cropBoxMovable: false,
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
    setPreviewImage(null)
    setImageChanged(true)
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
              message:
                '사용할 수 업는 닉네임 입니다. 다른 닉네임을 입력해주세요.',
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
      <Button
        variant="text"
        disabled={
          data.nickname === nickname ||
          isNicknameUnique ||
          (errors.nickname && errors.nickname?.type !== 'notUnique')
            ? true
            : isLoading
        }
        onClick={onClick}
        sx={{ marginRight: '0.75rem' }}
      >
        <Typography variant="CaptionEmphasis">중복 확인</Typography>
      </Button>
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

  function getStringByteSize(str: string) {
    const encoder = new TextEncoder()
    const encoded = encoder.encode(str)
    return encoded.length
  }
  const theme = useTheme()
  return (
    <CuModal
      open={open}
      onClose={closeModal}
      title={'소개 수정'}
      containedButton={{
        text: isSubmitting ? '제출 중' : '완료',
        type: 'submit',
        form: 'profile-bio-editor-form',
      }}
      textButton={{
        text: '취소',
        onClick: closeModal,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} id={'profile-bio-editor-form'}>
        <Stack direction={'column'} spacing={'1rem'}>
          {/* profile image */}
          <Stack spacing={'0.25rem'} direction={'column'}>
            <CuTextFieldLabel htmlFor="profileImage">
              <Typography variant="CaptionEmphasis">프로필 사진</Typography>
            </CuTextFieldLabel>
            <Button
              component={previewImage ? 'button' : 'label'}
              sx={{
                position: 'relative',
                width: '4rem',
                height: '4rem',
                borderRadius: '500px',
              }}
              onClick={previewImage ? handleImageDelete : undefined}
              disableRipple
            >
              {previewImage && (
                <TrashIcon
                  sx={{
                    color: 'text.normal',
                    opacity: 0,
                    height: '1.25rem',
                    width: '1.25rem',
                    padding: '22px',
                    border: '1px solid',
                    borderColor: 'line.alternative',
                    bgcolor: alpha(theme.palette.background.tertiary, 0.8),
                    borderRadius: '500px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 200,
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                />
              )}
              <Avatar
                src={previewImage ? previewImage : ''}
                alt="profile image"
                sx={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  height: '100%',
                  width: '100%',
                  bgcolor: 'background.tertiary',
                  border: '1px solid',
                  borderColor: 'line.alternative',
                }}
              >
                <PlusIcon
                  sx={{
                    color: 'text.normal',
                    height: '1.5rem',
                    width: '1.5rem',
                  }}
                />
              </Avatar>

              {!previewImage && (
                <input
                  type="file"
                  accept={'image/jpeg, image/jpg, image/png'}
                  style={{ display: 'none' }}
                  {...register('profileImage')}
                  id="profileImage"
                  name="profileImage"
                  onChange={handleImageChange}
                />
              )}
            </Button>
          </Stack>
          {/* nickname, introduction */}

          {/* 닉네임 수정 */}
          <Stack spacing={'0.25rem'} direction={'column'}>
            <CuTextFieldLabel htmlFor="nickname">
              <Typography variant="CaptionEmphasis">닉네임</Typography>
            </CuTextFieldLabel>
            <Controller
              render={({ field }) => (
                <Box sx={{ height: '3.25rem', marginBottom: '0.25rem' }}>
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
                    helperText={
                      <Typography variant="Caption" color={'red.strong'}>
                        {errors.nickname?.message}
                      </Typography>
                    }
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
                </Box>
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
            {/* </Stack> */}
            {/* introduction message */}
            {/* <Stack spacing={'0.25rem'} direction={'column'}> */}
            <CuTextFieldLabel htmlFor="introduction">
              <Typography variant="CaptionEmphasis">소개</Typography>
            </CuTextFieldLabel>
            <Controller
              render={({ field }) => (
                <Box sx={{ position: 'relative' }} height={'auto'}>
                  <CuTextField
                    label=""
                    variant="outlined"
                    id="introduction"
                    {...field}
                    autoComplete="off"
                    fullWidth
                    inputProps={{ maxLength: 150 }}
                    multiline
                    maxRows={12}
                    minRows={12}
                    error={errors.introduction ? true : false}
                    helperText={
                      <Box sx={{ height: '0.75rem' }}>
                        <Typography variant="Caption" color={'red.strong'}>
                          {/* {errors.introduction
                              ? errors.introduction.message // NOTE: 테스트용으로 helperText를 사용했습니다. 버그 수정 시 원상복구 요망 
                              : field.value.length} */}
                          {getStringByteSize(field.value)}
                        </Typography>
                      </Box>
                    }
                  />
                  <Typography
                    variant="Caption"
                    sx={{
                      position: 'absolute',
                      bottom: '2rem',
                      right: '1.5rem',
                    }}
                    color={'text.assistive'}
                  >
                    {field.value.length}/150 {}
                  </Typography>
                </Box>
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
          </Stack>
        </Stack>

        {/* crop modal */}
        <CuModal
          open={isOpen}
          onClose={closeCropModal}
          keepMounted
          title={'프로필 이미지 편집'} // NOTE: 통일성을 위해 임의로 설정한 제목입니다.
          containedButton={{
            text: '완료',
            onClick: handleCrop,
          }}
          textButton={{
            text: '취소',
            onClick: handleCancelCrop,
          }}
        >
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
        </CuModal>
      </form>
    </CuModal>
  )
}

export default ProfileBioEditor
