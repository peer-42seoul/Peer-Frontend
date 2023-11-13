import React from 'react'
import SettingContainer from './SettingContainer'
import { IUserProfileLink } from '@/types/IUserProfile'
import { AlertColor, Box, Grid } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import useAxiosWithAuth from '@/api/config'

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
}: {
  closeModal: () => void
  links?: Array<IUserProfileLink>
  setToastMessage: (toastProps: IToastProps) => void
  setToastOpen: (open: boolean) => void
  mutate: () => void
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
      id: links ? links.length + i + 1 : i,
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
        setToastMessage({
          severity: 'error',
          message: `${i + 1}번째 링크의 제목이 없습니다. 확인해주세요!`,
        })
        setToastOpen(true)
        setError(`${i}.linkName`, { type: 'required' })
        return
      } else if (data[i].linkName && !data[i].linkUrl) {
        setToastMessage({
          severity: 'error',
          message: `${data[i].linkName}의 링크 주소가 없습니다. 확인해주세요!`,
        })
        setError(`${i}.linkUrl`, { type: 'required' })
        setToastOpen(true)
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
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingContainer
          onNegativeClick={closeModal}
          settingTitle="links"
          isSubmitting={isSubmitting}
        >
          <Grid container rowSpacing={2}>
            {defaultValues.map((link, i) => {
              return (
                <Grid item container xs={12} key={link.id} rowSpacing={1}>
                  <Grid item xs={3}>
                    <CuTextFieldLabel htmlFor={`${i}.linkName`}>
                      제목
                    </CuTextFieldLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Controller
                      render={({ field }) => (
                        <CuTextField
                          variant="outlined"
                          id={`${i}.linkName`}
                          field={{ ...field, fullWidth: true }}
                          autoComplete="off"
                          error={errors[i]?.linkName ? true : false}
                          fullWidth
                        />
                      )}
                      name={`${i}.linkName`}
                      control={control}
                    />
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={3}>
                      <CuTextFieldLabel htmlFor={`${i}.linkUrl`}>
                        링크
                      </CuTextFieldLabel>
                    </Grid>
                    <Grid item xs={9}>
                      <Controller
                        render={({ field }) => (
                          <CuTextField
                            variant="outlined"
                            id={`${i}.linkUrl`}
                            field={{ ...field, fullWidth: true }}
                            autoComplete="off"
                            error={errors[i]?.linkUrl ? true : false}
                            fullWidth
                          />
                        )}
                        name={`${i}.linkUrl`}
                        control={control}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </SettingContainer>
      </form>
    </Box>
  )
}

export default ProfileLinkEditor
