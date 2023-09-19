'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, Typography } from '@mui/material'

const ProfileSectionEditLink = ({
  sectionTittle,
}: {
  sectionTittle: string
}) => {
  const route = useRouter()
  const handleEditClick = () => {
    if (window.innerWidth <= 480) {
      route.push(`my-profile-setting?type=${sectionTittle}`)
    } else {
      console.log('Your on PC')
    }
  }
  return (
    <Button variant="text" onClick={handleEditClick}>
      <Typography>수정</Typography>
    </Button>
  )
}

export default ProfileSectionEditLink
