import React from 'react'
import SettingContainer from './SettingContainer'
import { IUserProfileLink } from '@/types/IUserProfile'
import { AlertColor, Box, Grid } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'

interface IToastProps {
  severity?: AlertColor
  message: string
}

const ProfileLinkEditor = ({
  closeModal,
  links,
  setToastMessage,
  setToastOpen,
}: {
  closeModal: () => void
  links?: Array<IUserProfileLink>
  setToastMessage: (toastProps: IToastProps) => void
  setToastOpen: (open: boolean) => void
}) => {
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

  const onSubmit = (data: Array<IUserProfileLink>) => {
    for (let i = 0; i < 3; i++) {
      if (data[i].linkUrl && !data[i].linkName) {
        setToastMessage({
          severity: 'error',
          message: `${i + 1}번째 링크의 제목이 없습니다. 확인해주세요!`,
        })
        setToastOpen(true)
        return
      } else if (data[i].linkName && !data[i].linkUrl) {
        setToastMessage({
          severity: 'error',
          message: `${data[i].linkName}의 링크 주소가 없습니다. 확인해주세요!`,
        })
        setToastOpen(true)
        return
      }
    }

    console.log('on positive click', data)
  }

  const {
    handleSubmit,
    // getFieldState,
    // getValues,
    control,
    formState: { errors },
  } = useForm<Array<IUserProfileLink>>({
    defaultValues: { ...defaultValues },
    mode: 'onChange',
  })

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingContainer onNegativeClick={closeModal} settingTitle="links">
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
                          <Box>
                            <Box>
                              <CuTextField
                                variant="outlined"
                                id={`${i}.linkUrl`}
                                field={{ ...field, fullWidth: true }}
                                autoComplete="off"
                                error={errors[i]?.linkUrl ? true : false}
                                fullWidth
                              />
                            </Box>
                          </Box>
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
