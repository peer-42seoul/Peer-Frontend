'use client'
import React from 'react'
import SettingContainer from './SettingContainer'
import { Avatar, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { IProfileCard } from '@/types/IUserProfile'
import { useForm, Controller } from 'react-hook-form'

interface IFormInput {
  nickname: string
  introduction: string
}

const ProfileBioEditor = ({
  data,
  closeModal,
}: {
  data: IProfileCard
  closeModal: () => void
}) => {
  const defaultValues: IFormInput = {
    nickname: data.nickname,
    introduction: data.introduction,
  }

  const { handleSubmit, control } = useForm<IFormInput>({
    defaultValues: defaultValues,
  })

  const onSubmit = (data: IFormInput) => console.log('on positive click', data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingContainer
        onNegativeClick={closeModal}
        // onPositiveClick={onSubmit}
        settingTitle="introduction"
      >
        <Grid container spacing={2}>
          {/* profile image */}
          <Grid item xs={12}>
            <Avatar
              src={
                data.profileImageURL
                  ? data.profileImageURL
                  : '/images/profile.jpeg'
              }
              alt="profile image"
            />
          </Grid>
          {/* below profile image, nickname, association, email, introduction */}
          <Grid item container spacing={2} justifyContent={'flex-start'}>
            {/* 닉네임 수정 */}
            <Grid item xs={3}>
              <InputLabel htmlFor="nickname-field">닉네임</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <Controller
                render={({ field }) => (
                  <TextField
                    id="nickname-field"
                    variant="outlined"
                    {...field}
                    fullWidth
                  />
                )}
                name="nickname"
                control={control}
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
            <Grid item xs={12}>
              <InputLabel htmlFor="introduction-message-field">
                자기 소개
              </InputLabel>
            </Grid>
            <Grid item xs={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    label=""
                    variant="outlined"
                    id="introduction-message-field"
                    {...field}
                    sx={{ width: '100%' }}
                  />
                )}
                name="introduction"
                control={control}
              />
            </Grid>
          </Grid>
        </Grid>
      </SettingContainer>
    </form>
  )
}

export default ProfileBioEditor
