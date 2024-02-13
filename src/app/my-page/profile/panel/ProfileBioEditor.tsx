'use client'
import React, { useCallback, useRef, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  Typography,
  Stack,
  useTheme,
  alpha,
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
import useMedia from '@/hook/useMedia'
import * as style from './Profile.style'
import useToast from '@/states/useToast'
import useNicknameStore from '@/states/useNicknameStore'

interface IFormInput {
  nickname: string
  introduction: string
  profileImage: File[] | null
}

const ProfileBioEditor = ({
  data,
  closeModal,
  mutate,
  open,
}: {
  data: IProfileCard
  closeModal: () => void
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
  const { isPc } = useMedia()

  const { setNickname } = useNicknameStore()

  const { openToast, closeToast } = useToast()

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
    reset,
  } = useForm<IFormInput>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const handleCloseModal = () => {
    reset(defaultValues)
    closeModal()
  }

  const {
    isOpen,
    openModal: openCropModal,
    closeModal: closeCropModal,
  } = useModal()

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

  const isValidNickname = (value: string) => {
    if (value.includes('\n\t\f\v')) return '공백 문자는 띄어쓰기만 허용됩니다.'
    else return true
  }

  const NicknameCheckButton = ({
    nickname,
    setIsNicknameUnique,
  }: {
    nickname: string
    setIsNicknameUnique: (isNicknameUnique: boolean) => void
  }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onClick = useCallback(() => {
      closeToast()
      setIsLoading(true)
      const checkIsNicknameUnique = async () => {
        axiosWithAuth
          .post(`${process.env.NEXT_PUBLIC_CSR_API}/api/v1/signup/nickname`, {
            nickname,
          })
          .then(() => {
            setIsNicknameUnique(true)
            openToast({
              severity: 'success',
              message: '사용할 수 있는 닉네임 입니다.',
            })
            if (errors.nickname?.type === 'notUnique') {
              clearErrors('nickname')
            }
            setIsLoading(false)
          })
          .catch((error) => {
            setIsNicknameUnique(false)
            console.log(error)
            if (error?.response.data?.messages) {
              openToast({
                severity: 'error',
                message: String(error.response.data.messages[0]).split(': ')[1],
              })
              setError('nickname', {
                type: 'notUnique',
                message: String(error.response.data.messages[0]).split(': ')[1],
              })
            } else {
              openToast({
                severity: 'error',
                message: '중복된 닉네임 입니다.',
              })
              setError('nickname', {
                type: 'notUnique',
                message: '중복된 닉네임 입니다. 다른 닉네임을 입력해주세요.',
              })
            }
            setIsLoading(false)
          })
      }
      if (!isLoading) {
        checkIsNicknameUnique()
      }
      // TODO status code가 200이 아닐 경우 false 처리나 toast 띄우기
    }, [isLoading, nickname, setIsNicknameUnique])

    const isDisabled = () => {
      return data.nickname === nickname ||
        isNicknameUnique ||
        (errors.nickname && errors.nickname?.type !== 'notUnique')
        ? true
        : isLoading
    }

    return (
      <Button
        variant="text"
        disabled={isDisabled()}
        onClick={onClick}
        sx={{ marginRight: '0.75rem' }}
      >
        <Typography
          variant="CaptionEmphasis"
          color={isDisabled() ? 'text.assistive' : 'text.normal'}
        >
          중복 확인
        </Typography>
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

    if (!isNicknameUnique && nickname !== data.nickname) {
      setError('nickname', {
        type: 'notUnique',
        message: '닉네임 중복확인이 필요합니다.',
      })
      return
    }
    closeToast()
    await axiosWithAuth
      .put(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/profile/introduction/edit`,
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(() => {
        openToast({
          severity: 'success',
          message: '프로필 변경에 성공하였습니다.',
        })
        mutate()
        setNickname(formData.nickname)
        closeModal()
      })
      .catch((e) => {
        if (e.response.status === 500) {
          openToast({
            severity: 'error',
            message: '프로필 변경에 실패하였습니다.',
          })
        } else {
          openToast({
            severity: 'error',
            message: e.response.data.message,
          })
        }
      })
  }

  const theme = useTheme()
  return (
    <CuModal
      open={open}
      onClose={handleCloseModal}
      title={'소개 수정'}
      containedButton={{
        text: isSubmitting ? '제출 중' : '완료',
        type: 'submit',
        form: 'profile-bio-editor-form',
      }}
      textButton={{
        text: '취소',
        onClick: handleCloseModal,
      }}
      mobileFullSize
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        id={'profile-bio-editor-form'}
        style={isPc ? style.formPcStyle : style.formMobileStyle}
      >
        <Stack
          direction={'column'}
          spacing={'1rem'}
          justifyContent={'flex-start'}
        >
          {/* profile image */}
          <Stack spacing={'0.25rem'} direction={'column'}>
            <CuTextFieldLabel htmlFor="profileImage">
              <Typography variant="CaptionEmphasis">프로필 사진</Typography>
            </CuTextFieldLabel>
            <Button
              component={previewImage ? 'button' : 'label'}
              sx={style.profileImageInputStyle}
              onClick={previewImage ? handleImageDelete : undefined}
              disableRipple
            >
              {previewImage && (
                <TrashIcon
                  sx={{
                    ...style.trashIconStyle,
                    bgcolor: alpha(theme.palette.background.tertiary, 0.8),
                  }}
                />
              )}
              <Avatar
                src={previewImage ? previewImage : ''}
                alt="profile image"
                sx={style.avatarStyle}
              >
                <PlusIcon sx={style.plusIconStyle} />
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
                    FormHelperTextProps={{ sx: { height: '0.25rem' } }}
                    fullWidth={true}
                    error={errors.nickname ? true : false}
                    autoComplete="off"
                    placeholder="닉네임은 두 글자 이상이어야 합니다."
                    inputProps={{ minLength: 2, maxLength: 30 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography
                            variant="Caption"
                            color={'text.alternative'}
                            sx={{ marginRight: '0.5rem' }}
                          >
                            {field.value.length}/30
                          </Typography>
                          <NicknameCheckButton
                            nickname={nickname}
                            setIsNicknameUnique={setIsNicknameUnique}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ height: '2.75rem' }}
                  />
                </Box>
              )}
              name="nickname"
              control={control}
              rules={{
                required: '닉네임은 필수로 기입해야 합니다.',
                maxLength: {
                  value: 30,
                  message: '닉네임은 최대 30글자까지만 적용 가능합니다.',
                },
                minLength: {
                  value: 2,
                  message: '닉네임은 최소 두 글자 이상 작성해야 합니다.',
                },
                validate: {
                  isValidNickname,
                  pattern: (value) =>
                    /^([가-힣a-zA-Z0-9]+)$/.test(value) ||
                    value === '' ||
                    '닉네임은 한글, 영문, 숫자만 입력 가능합니다.',
                },
              }}
            />
            {/* 소개 수정 */}
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
                      <Typography
                        variant="Caption"
                        color={'red.strong'}
                        sx={{ height: '0.75rem' }}
                      >
                        {errors.introduction && errors.introduction.message}
                      </Typography>
                    }
                  />
                  <Typography
                    variant="Caption"
                    sx={style.introductionMaxLengthStyle}
                    color={'text.alternative'}
                  >
                    {field.value.length}/150
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
          <Box sx={style.squareBoxStyle}>
            <img ref={imageRef} alt="Preview" style={style.cropBoxStyle} />
          </Box>
        </CuModal>
      </form>
    </CuModal>
  )
}

export default ProfileBioEditor
