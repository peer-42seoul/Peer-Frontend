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

const ProfileBioEditor = (props: IProfileCard) => {
  // const { data, error, isLoading } = useSWR('http://localhost:4000/profile/1')
  const defaultValues: IFormInput = {
    username: props.username,
    introduction: props.introduction,
  }

  const { handleSubmit, control } = useForm<IFormInput>({
    defaultValues: defaultValues,
  })

  const onSubmit = (data: IFormInput) => console.log('on positive click', data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingContainer
        onNegativeClick={() => console.log('on negative click')}
        // onPositiveClick={onSubmit}
        settingTitle="introduction"
      >
        <Stack>
          <Avatar
            src={
              props.profileImageURL
                ? props.profileImageURL
                : '/images/profile.jpeg'
            }
          />
        </Stack>
        <Grid container columns={2}>
          {/* 닉네임 수정 */}
          <Grid item>
            <Typography>닉네임</Typography>
          </Grid>
          <Grid item>
            <Controller
              render={({ field }) => (
                <TextField label="닉네임" variant="outlined" {...field} />
              )}
              name="username"
              control={control}
            ></Controller>
          </Grid>
          <Grid item>
            <Typography>소속</Typography>
          </Grid>
          <Grid item>
            <Typography>
              {props.association ? props.association : '해당 없음'}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>자기 소개</Typography>
          </Grid>
          <Grid item>
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
