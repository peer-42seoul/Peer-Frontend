'use client'
import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'

interface IProfileCard {
  profileImageURL?: string
  association?: string
  userId: string
  email: string
  username: string
}

const ProfileCard: React.FC<IProfileCard> = ({
  profileImageURL,
  association,
  userId,
  email,
  username,
}) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div>
      {/* image component */}
      <Box
        component="img"
        src={profileImageURL ? profileImageURL : '/images/profile.jpeg'}
        onClick={() => setOpen(true)}
      />
      <div>
        <b>{username}</b>
        {association ? <p>{association} test</p> : <p />}
        <p>
          {userId}({email})
        </p>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} keepMounted>
        <Box
          component="img"
          src={profileImageURL ? profileImageURL : '/images/profile.jpeg'}
          aria-labelledby="유저 이미지"
          aria-describedby="확대된 유저 이미지"
          sx={{
            width: '300px',
            height: '300px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            border: 'none',
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => setOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default ProfileCard
