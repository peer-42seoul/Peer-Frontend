// 'use client'
import React from 'react'
import SettingContainer from './SettingContainer'
// import useSWR from 'swr'
import { Avatar, Grid, Stack, TextField, Typography } from '@mui/material'
import { IProfileCard } from '@/types/IUserProfile'
import { useForm, Controller } from 'react-hook-form'

interface IFormInput {
  username: string
  introduction: string
}

const ProfileBioEditor = ({
  data,
  closeModal,
}: {
  data: IProfileCard
  closeModal: () => void
}) => {
  // const { data, error, isLoading } = useSWR('http://localhost:4000/profile/1')
  const defaultValues: IFormInput = {
    username: data.username,
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
        <Stack>
          <Avatar
            src={
              data.profileImageURL
                ? data.profileImageURL
                : '/images/profile.jpeg'
            }
          />
        </Stack>
        <Grid container spacing={2}>
          {/* 닉네임 수정 */}
          <Grid item xs={3}>
            <Typography>닉네임</Typography>
          </Grid>
          <Grid item xs={9}>
            <Controller
              render={({ field }) => (
                <TextField label="닉네임" variant="outlined" {...field} />
              )}
              name="username"
              control={control}
            ></Controller>
          </Grid>
          <Grid item xs={3}>
            <Typography>소속</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>
              {data.association ? data.association : '해당 없음'}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>아이디</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{data.email}</Typography>
          </Grid>
          {/* <Grid item xs={3}>
            <Typography>자기 소개</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <Controller
              render={({ field }) => (
                <TextField label="자기 소개" variant="outlined" {...field} />
              )}
              name="introduction"
              control={control}
            ></Controller>
          </Grid>
        </Grid>
      </SettingContainer>
    </form>
  )
}

export default ProfileBioEditor
