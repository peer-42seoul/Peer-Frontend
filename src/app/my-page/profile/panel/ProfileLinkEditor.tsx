import React from 'react'
import { IUserProfileLink, IUserProfileLinkField } from '@/types/IUserProfile'
import { useFieldArray, useForm } from 'react-hook-form'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import useAxiosWithAuth from '@/api/config'
import CuModal from '@/components/CuModal'
import { Stack, Typography } from '@mui/material'
import useMedia from '@/hook/useMedia'
import * as style from './Profile.style'
import useToast from '@/states/useToast'
import ControlledTextfield from '@/components/ControlledTextfield'

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
  const defaultValues: IUserProfileLinkField = {
    linkList: links as Array<{ linkName: string; linkUrl: string }>,
  }
  const { isPc } = useMedia()

  const { openToast, closeToast } = useToast()

  const emptyLinksLength: number = 3 - (links ? links.length : 0)

  for (let i = 0; i < emptyLinksLength; i++)
    defaultValues.linkList.push({
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
  } = useForm<IUserProfileLinkField>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const { fields } = useFieldArray({ control, name: 'linkList' })

  const handleCloseModal = () => {
    reset(defaultValues)
    closeModal()
  }

  // 링크 제목에서 부르는 함수
  const isLinkUrlRequired = (idx: number, linkName: string) => {
    const linkUrl = getValues(`linkList.${idx}.linkUrl`)
    if (linkUrl) {
      return
    } else if (!linkUrl && !linkName) {
      clearErrors(`linkList.${idx}.linkUrl`)
    }
  }

  // 링크 주소에서 부르는 함수
  const isLinkNameRequired = (idx: number, linkUrl: string) => {
    const linkName = getValues(`linkList.${idx}.linkName`)
    if (linkName) {
      return
    } else if (!linkUrl) {
      clearErrors(`linkList.${idx}.linkName`)
    }
  }

  // 링크 주소 유효성 검사
  const isLinkUrlValid = (idx: number) => {
    return (linkUrl: string) => {
      const linkName = getValues(`linkList.${idx}.linkName`)
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
      const linkUrl = getValues(`linkList.${idx}.linkUrl`)
      if (linkName) {
        return true
      } else if (linkUrl && !linkName) {
        return '링크 제목을 입력해주세요.'
      }
    }
  }

  const onSubmit = async (data: IUserProfileLinkField) => {
    const linkList: Array<{ linkName: string; linkUrl: string }> = []

    data.linkList.map((item) => {
      if (item.linkName === '' || item.linkUrl === '') {
        return
      }
      linkList.push({ linkName: item.linkName, linkUrl: item.linkUrl })
    })

    closeToast()
    await axiosWithAuth
      .put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/link`, {
        linkList: linkList,
      })
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
          {fields.map((field, index) => {
            return (
              <Stack direction={'column'} spacing={'1rem'} key={field.id}>
                <CuTextFieldLabel htmlFor={`linkList.${index}.linkName`}>
                  <Typography variant="CaptionEmphasis">
                    {`링크 ${index + 1}`}
                  </Typography>
                </CuTextFieldLabel>
                <Stack direction={'column'} spacing={'0.5rem'}>
                  <ControlledTextfield
                    control={control}
                    name={`${index}.linkName`}
                    rules={{
                      validate: isLinkNameValid(index),
                    }}
                    error={!!errors?.linkList?.[index]?.linkName}
                    helperText={
                      <Typography variant="Caption" color={'error'}>
                        {errors?.linkList?.[index]?.linkName?.message}
                      </Typography>
                    }
                    onBlur={() => isLinkUrlRequired(index, field.linkName)}
                    placeholder="링크 제목을 입력해주세요."
                  />
                  <ControlledTextfield
                    control={control}
                    name={`${index}.linkUrl`}
                    rules={{
                      validate: {
                        pattern: (value) => {
                          const regex =
                            // eslint-disable-next-line no-useless-escape
                            /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/
                          return regex.test(value) || '유효한 url을 입력하세요.'
                        },
                        validate: isLinkUrlValid(index),
                      },
                    }}
                    error={!!errors?.linkList?.[index]?.linkUrl}
                    helperText={
                      <Typography variant="Caption" color={'error'}>
                        {errors?.linkList?.[index]?.linkUrl?.message}
                      </Typography>
                    }
                    onBlur={() => isLinkNameRequired(index, field.linkUrl)}
                    placeholder="링크 주소(URL)를 입력해주세요."
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
