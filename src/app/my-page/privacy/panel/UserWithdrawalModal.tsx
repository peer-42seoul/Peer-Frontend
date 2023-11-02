'use client'

import CuModal from '@/components/CuModal'

import { useState, Dispatch, SetStateAction } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import IToastProps from '@/types/IToastProps'

const UserWithdrawalModal = ({
  setToastProps,
  openToast,
}: {
  setToastProps: Dispatch<SetStateAction<IToastProps>>
  openToast: () => void
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true) // 다른 버튼이나 요소를 얘를 활용해서 모달 핸들링 가능
  const handleClose = () => setOpen(false)
  const [password, setPassword] = useState('')
  const axiosInstance = useAxiosWithAuth()

  const handleDelete = async () => {
    try {
      await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/membership/withdrawal`,
        {
          password: password,
        },
      )
      alert('계정이 삭제되었습니다')
      handleClose()
    } catch (error: any) {
      if (error.response?.status === 400) {
        setToastProps({
          severity: 'error',
          message: error.response.data.message,
        })
        openToast()
      }
    }
  }

  return (
    <>
      <Button onClick={handleOpen}>계정삭제</Button>
      <CuModal
        open={open}
        handleClose={handleClose}
        ariaTitle="modal-title"
        ariaDescription="modal-description"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography id="modal-title">계정삭제</Typography>
          <TextField
            placeholder="계정 삭제를 위해 비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Typography id="modal-description">
            계정을 삭제하시겠습니까? <br />
            모든 작업물과 데이터가 영구적으로 삭제됩니다
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleDelete}>확인</Button>
          </Box>
        </Box>
      </CuModal>
    </>
  )
}

export default UserWithdrawalModal
