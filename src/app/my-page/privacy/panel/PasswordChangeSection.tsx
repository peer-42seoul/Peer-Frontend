'use client'
import React from 'react'
import * as style from './privacy-setting.style'
import { Button, Stack, Typography } from '@mui/material'
import useModal from '@/hook/useModal'
import PasswordChangeModal from './PasswordChangeModal'

const PasswordChangeSection = () => {
  const { openModal, isOpen, closeModal } = useModal()

  return (
    <>
      <Stack spacing={2} direction="row" alignItems={'center'}>
        <Typography variant="CaptionEmphasis" color="text.strong">
          비밀번호
        </Typography>
        <Button
          variant="contained"
          sx={style.buttonStyleBase}
          onClick={openModal}
        >
          <Typography variant="CaptionEmphasis" color="text.strong">
            변경하기
          </Typography>
        </Button>
      </Stack>
      <PasswordChangeModal isOpen={isOpen} closeModal={closeModal} />
    </>
  )
}

export default PasswordChangeSection
