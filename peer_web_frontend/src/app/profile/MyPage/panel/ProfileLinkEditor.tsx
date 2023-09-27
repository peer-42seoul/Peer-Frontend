import React from 'react'
import SettingContainer from './SettingContainer'
import { IUserProfileLink } from '@/types/IUserProfile'
import { Box, InputLabel, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

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
  console.log(defaultValues)
  const onSubmit = (data: Array<IUserProfileLink>) =>
    console.log('on positive click', data)

  const { handleSubmit, control } = useForm<Array<IUserProfileLink>>({
    defaultValues: defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingContainer onNegativeClick={closeModal} settingTitle="links">
        {defaultValues.map((link, i) => {
          return (
            <Box key={link.id}>
              <InputLabel htmlFor={`link-${i}-name-field`}>제목</InputLabel>
              <Controller
                render={({ field }) => (
                  <TextField
                    label=""
                    variant="outlined"
                    id={`link-${i}-name-field`}
                    {...field}
                  />
                )}
                name={`${i}.linkName`}
                control={control}
              />
            </Box>
          )
        })}
      </SettingContainer>
    </form>
  )
}

export default ProfileLinkEditor
