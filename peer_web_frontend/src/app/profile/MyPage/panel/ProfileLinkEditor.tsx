import React from 'react'
import SettingContainer from './SettingContainer'
import { IUserProfileLink } from '@/types/IUserProfile'
import { Box, Grid } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'

// TODO 디자이너와 레이아웃 수정 합의 필요
const ProfileLinkEditor = ({
  closeModal,
  links,
}: {
  closeModal: () => void
  links: Array<IUserProfileLink>
}) => {
  const defaultValues: Array<IUserProfileLink> = links.map((link) => ({
    id: link.id,
    linkName: link.linkName,
    link: link.link,
  }))

  const emptyLinksLength: number = 3 - links.length

  for (let i = 0; i < emptyLinksLength; i++)
    defaultValues.push({
      id: links.length + i + 1,
      linkName: '',
      link: '',
    })

  const onSubmit = (data: Array<IUserProfileLink>) => {
    data.map((link) => {
      if (link.link && !link.linkName) {
        return
      } else if (link.linkName && !link.link) {
        return
      }
    })
    console.log('on positive click', data)
  }

  const {
    handleSubmit,
    getFieldState,
    // getValues,
    control,
    formState: { errors },
  } = useForm<Array<IUserProfileLink>>({
    defaultValues: { ...defaultValues },
    mode: 'onChange',
  })
  // const fieldState = getFieldState('firstName')

  return (
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
                    rules={{ required: getFieldState(`${i}.link`).isDirty }}
                  />
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={3}>
                    <CuTextFieldLabel htmlFor={`${i}.link`}>
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
                              id={`${i}.link`}
                              field={{ ...field, fullWidth: true }}
                              autoComplete="off"
                              error={errors[i]?.link ? true : false}
                              fullWidth
                            />
                          </Box>
                        </Box>
                      )}
                      rules={{
                        required: getFieldState(`${i}.linkName`).isDirty,
                      }}
                      name={`${i}.link`}
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
  )
}

export default ProfileLinkEditor
