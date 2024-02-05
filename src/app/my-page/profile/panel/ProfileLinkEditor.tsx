import React from 'react'
import { IUserProfileLink } from '@/types/IUserProfile'
import { Controller, useForm } from 'react-hook-form'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import useAxiosWithAuth from '@/api/config'
import CuModal from '@/components/CuModal'
import { Stack, Typography } from '@mui/material'
import useMedia from '@/hook/useMedia'
import * as style from './Profile.style'
import useToast from '@/states/useToast'

const ProfileLinkEditor = ({
  closeModal,
  links,
  mutate,
  open,
}: {
  closeModal: () => void
  links?: Array<IUserProfileLink>
  mutate: () => void
  open: boolean
}) => {
  const axiosWithAuth = useAxiosWithAuth()
  const defaultValues: Array<IUserProfileLink> = links
    ? links.map((link) => ({
        id: link.id,
        linkName: link.linkName,
        linkUrl: link.linkUrl,
      }))
    : ([] as Array<IUserProfileLink>)
  const { isPc } = useMedia()

  const { openToast, closeToast } = useToast()

  const emptyLinksLength: number = 3 - (links ? links.length : 0)

  for (let i = 0; i < emptyLinksLength; i++)
    defaultValues.push({
      id: -1 * (i + 1),
      linkName: '',
      linkUrl: '',
    })

  const {
    handleSubmit,
    getValues,
    control,
    // setError,
    clearErrors,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Array<IUserProfileLink>>({
    defaultValues: { ...defaultValues },
    mode: 'onChange',
  })

  const handleCloseModal = () => {
    reset(defaultValues)
    closeModal()
  }

  // 링크 제목에서 부르는 함수
  const isLinkUrlRequired = (idx: number, linkName: string) => {
    const linkUrl = getValues(`${idx}.linkUrl`)
    if (linkUrl) {
      return
    } else if (!linkUrl && !linkName) {
      clearErrors(`${idx}.linkUrl`)
    }
  }

  // 링크 주소에서 부르는 함수
  const isLinkNameRequired = (idx: number, linkUrl: string) => {
    const linkName = getValues(`${idx}.linkName`)
    if (linkName) {
      return
    } else if (!linkUrl) {
      clearErrors(`${idx}.linkName`)
    }
  }

  // 링크 주소 유효성 검사
  const isLinkUrlValid = (idx: number) => {
    return (linkUrl: string) => {
      const linkName = getValues(`${idx}.linkName`)
      if (linkUrl) {
        return true
      } else if (linkName && !linkUrl) {
        return '링크 주소(URL)를 입력해주세요.'
      }
    }
  }

  // 링크 제목 유효성 검사
  const isLinkNameValid = (idx: number) => {
    return (linkName: string) => {
      const linkUrl = getValues(`${idx}.linkUrl`)
      if (linkName) {
        return true
      } else if (linkUrl && !linkName) {
        return '링크 제목을 입력해주세요.'
      }
    }
  }

  const onSubmit = async (data: Array<IUserProfileLink>) => {
    const requestBody: {
      linkList: Array<{ linkName: string; linkUrl: string }>
    } = {
      linkList: [],
    }

    for (let i = 0; i < data.length; i++) {
      requestBody.linkList.push({
        linkName: data[i].linkName ?? '',
        linkUrl: data[i].linkUrl ?? '',
      })
    }

    closeToast()
    await axiosWithAuth
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/link`,
        requestBody,
      )
      .then(() => {
        openToast({
          severity: 'success',
          message: '링크 변경에 성공하였습니다.',
        })
        reset(defaultValues)
        closeModal()
        mutate()
      })
      .catch((e) => {
        if (e.response.status === 500) {
          openToast({
            severity: 'error',
            message: '링크 변경에 실패하였습니다.',
          })
        } else {
          openToast({
            severity: 'error',
            message: e.response.data.message,
          })
        }
      })
  }

  return (
    <CuModal
      open={open}
      onClose={handleCloseModal}
      title="링크 수정"
      containedButton={{
        text: isSubmitting ? '제출 중' : '완료',
        type: 'submit',
        form: 'profile-link-editor-form',
      }}
      textButton={{
        text: '취소',
        onClick: handleCloseModal,
      }}
      mobileFullSize
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        id={'profile-link-editor-form'}
        style={isPc ? style.formPcStyle : style.formMobileStyle}
      >
        <Stack direction={'column'} spacing={'1rem'}>
          {defaultValues.map((link, i) => {
            return (
              <Stack direction={'column'} spacing={'1rem'} key={link.id}>
                <CuTextFieldLabel htmlFor={`${i}.linkName`}>
                  <Typography variant="CaptionEmphasis">
                    {`링크 ${i + 1}`}
                  </Typography>
                </CuTextFieldLabel>
                <Stack direction={'column'} spacing={'0.5rem'}>
                  <Controller
                    render={({ field }) => (
                      <CuTextField
                        variant="outlined"
                        id={`${i}.linkName`}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          isLinkUrlRequired(i, field.value)
                        }}
                        onBlur={() => {
                          field.onBlur()
                          isLinkUrlRequired(i, field.value)
                        }}
                        autoComplete="off"
                        error={errors[i]?.linkName ? true : false}
                        fullWidth
                        inputProps={{ maxLength: 20 }}
                        helperText={
                          <Typography variant="Caption" color="red.strong">
                            {errors[i]?.linkName?.message &&
                              errors[i]?.linkName?.message}
                          </Typography>
                        }
                        placeholder="링크 제목을 입력해주세요."
                      />
                    )}
                    name={`${i}.linkName`}
                    control={control}
                    rules={{
                      maxLength: {
                        value: 20,
                        message:
                          '링크 제목은 최대 20글자까지만 적용 가능합니다.',
                      },
                      validate: {
                        required: isLinkNameValid(i),
                      },
                    }}
                  />
                  <Controller
                    render={({ field }) => (
                      <CuTextField
                        variant="outlined"
                        id={`${i}.linkUrl`}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          isLinkNameRequired(i, field.value)
                        }}
                        onBlur={() => {
                          field.onBlur()
                          isLinkNameRequired(i, field.value)
                        }}
                        autoComplete="off"
                        error={errors[i]?.linkUrl ? true : false}
                        fullWidth
                        helperText={
                          <Typography variant="Caption" color="red.strong">
                            {errors[i]?.linkName?.message &&
                              errors[i]?.linkUrl?.message}
                          </Typography>
                        }
                        inputProps={{ maxLength: 300 }}
                        placeholder="링크 주소(URL)를 입력해주세요."
                      />
                    )}
                    name={`${i}.linkUrl`}
                    control={control}
                    rules={{
                      maxLength: {
                        value: 300,
                        message: '링크는 최대 300글자까지만 적용 가능합니다.',
                      },
                      validate: {
                        required: isLinkUrlValid(i),
                      },
                    }}
                  />
                </Stack>
              </Stack>
            )
          })}
        </Stack>
      </form>
    </CuModal>
  )
}

export default ProfileLinkEditor
