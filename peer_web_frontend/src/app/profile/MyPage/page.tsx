'use client'
import { Box, Typography } from '@mui/material'
import React from 'react'
import ProfileCard from './panel/ProfileCard'
import ProfileSection from './panel/ProfileSection'
import { IUserProfile } from '@/types/IUserProfile'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
import ProfileLinksSection from './panel/ProfileLinksSection'

const MyProfile = () => {
  const username = 'hyna'
  const userid = '1'

  const { data, isLoading } = useSWR<IUserProfile>(
    `http://localhost:4000/profile/${userid}`,
    defaultGetFetcher,
  )

  return (
    <Box>
      <Typography>프로필</Typography>
      <ProfileSection sectionTitle="introduction">
        {/* 프로필 이미지, 유저 이름, 소속(42?), 아이디, 이메일 표시 컴포넌트 */}
        <ProfileCard
          data={
            data
              ? {
                  profileImageURL: data.profileImageUrl,
                  username: username,
                  association: data.association,
                  introduction: data.introduction,
                  email: data.email,
                }
              : null
          }
          isLoading={isLoading}
        />
        {/* <Box>biography</Box> */}
      </ProfileSection>
      {/* profile home */}
      <ProfileSection sectionTitle="achievements">achievements</ProfileSection>
      <ProfileSection sectionTitle="skills">skills</ProfileSection>
      <ProfileSection sectionTitle="links">
        <ProfileLinksSection linkList={data?.linkList} isLoading={isLoading} />
      </ProfileSection>
    </Box>
  )
}

export default MyProfile
