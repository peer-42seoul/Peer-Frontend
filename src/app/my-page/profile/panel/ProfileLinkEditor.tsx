import React from 'react'
import { IUserProfileLink } from '@/types/IUserProfile'
import { Controller, useForm } from 'react-hook-form'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import useAxiosWithAuth from '@/api/config'
import CuModal from '@/components/CuModal'
import { AlertColor, Stack, Typography } from '@mui/material'

interface IToastProps {
  severity?: AlertColor
  message: string
}

const ProfileLinkEditor = ({
  closeModal,
  links,
  setToastMessage,
  setToastOpen,
  mutate,
  open,
}: {
  closeModal: () => void
  links?: Array<IUserProfileLink>
  setToastMessage: (toastProps: IToastProps) => void
  setToastOpen: (open: boolean) => void
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

  const emptyLinksLength: number = 3 - (links ? links.length : 0)

  for (let i = 0; i < emptyLinksLength; i++)
    defaultValues.push({
      id: -1 * (i + 1),
      linkName: '',
      linkUrl: '',
    })

  const {
    handleSubmit,
    // getFieldState,
    // getValues,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Array<IUserProfileLink>>({
    defaultValues: { ...defaultValues },
    mode: 'onChange',
  })

  const onSubmit = async (data: Array<IUserProfileLink>) => {
    const requestBody: {
      linkList: Array<{ linkName: string; linkUrl: string }>
    } = {
      linkList: [] as Array<{ linkName: string; linkUrl: string }>,
    }
    for (let i = 0; i < 3; i++) {
      if (data[i].linkUrl && !data[i].linkName) {
        // setToastMessage({
        //   severity: 'error',
        //   message: `${i + 1}번째 링크의 제목이 없습니다. 확인해주세요!`,
        // })
        // setToastOpen(true)
        setError(`${i}.linkName`, {
          type: 'required',
          message: '아래 링크에 제목이 없습니다.',
        })
        return
      } else if (data[i].linkName && !data[i].linkUrl) {
        // setToastMessage({
        //   severity: 'error',
        //   message: `${data[i].linkName}의 링크 주소가 없습니다. 확인해주세요!`,
        // })
        // setToastOpen(true)
        setError(`${i}.linkUrl`, {
          type: 'required',
          message: '위 링크 제목에 링크가 없습니다.',
        })
        return
      }
      requestBody.linkList.push({
        linkName: data[i].linkName,
        linkUrl: data[i].linkUrl,
      })
    }
    console.log('제출중!', isSubmitting)
    await axiosWithAuth
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/link`,
        requestBody,
      )
      .then(() => {
        setToastMessage({
          severity: 'success',
          message: '링크 변경에 성공하였습니다.',
        })
        setToastOpen(true)
        closeModal()
        mutate()
      })
      .catch(() => {
        setToastMessage({
          severity: 'error',
          message: '링크 변경에 실패하였습니다.',
        })
        setToastOpen(true)
      })
  }

  return (
    <CuModal
      open={open}
      onClose={closeModal}
      title="링크 수정"
      containedButton={{
        text: isSubmitting ? '제출 중' : '완료',
        type: 'submit',
        form: 'profile-link-editor-form',
      }}
      textButton={{
        text: '취소',
        onClick: closeModal,
      }}
      mobileFullSize
    >
      <form onSubmit={handleSubmit(onSubmit)} id={'profile-link-editor-form'}>
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
                        autoComplete="off"
                        error={errors[i]?.linkName ? true : false}
                        fullWidth
                        inputProps={{ maxLength: 20 }}
                        helperText={
                          <Typography variant="Caption" color="red.strong">
                            {errors[i]?.linkName?.message}
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
                    }}
                  />
                  <Controller
                    render={({ field }) => (
                      <CuTextField
                        variant="outlined"
                        id={`${i}.linkUrl`}
                        {...field}
                        autoComplete="off"
                        error={errors[i]?.linkUrl ? true : false}
                        fullWidth
                        helperText={
                          <Typography variant="Caption" color="red.strong">
                            {errors[i]?.linkUrl?.message}
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
