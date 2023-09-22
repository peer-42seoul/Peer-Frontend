// 'use client'
import React from 'react'
import { Button, Typography } from '@mui/material'

const ProfileSectionEditLink = ({
  sectionTitle,
  setModalType,
}: {
  sectionTitle: string
  setModalType: (type: string) => void
}) => {
  const handleEditClick = () => {
    setModalType(sectionTitle)
  }
  return (
    <Button variant="text" onClick={handleEditClick}>
      <Typography>수정</Typography>
    </Button>
  )
}

export default ProfileSectionEditLink
