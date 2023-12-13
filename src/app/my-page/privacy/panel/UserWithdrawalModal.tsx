'use client'

import CuModal from '@/components/CuModal'

import { useState, Dispatch, SetStateAction } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'
import IToastProps from '@/types/IToastProps'
import LocalStorage from '@/states/localStorage'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  const handlekeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleDelete()
    }
  }

  const handleDelete = async () => {
    if (password === '') {
      setToastProps({
        severity: 'error',
        message: '비밀번호를 입력해주세요',
      })
      openToast()
      return
    }
    try {
      await axiosInstance.delete(`/api/v1/signup/withdrawal`, {
        data: {
          password: password,
        },
      })
      LocalStorage.removeItem('authData')
      useAuthStore.setState({
        isLogin: false,
        accessToken: null,
      })
      alert('계정이 삭제되었습니다')
      handleClose()
      router.push('/')
    } catch (error: any) {
      if (error.response?.status === 403) {
        setToastProps({
          severity: 'error',
          message: '비밀번호가 일치하지 않습니다',
        })
      } else {
        setToastProps({
          severity: 'error',
          message: '계정 삭제에 실패했습니다',
        })
      }
      openToast()
    }
  }

  return (
    <>
      <Button onClick={handleOpen}>계정삭제</Button>
      <CuModal
        open={open}
        onClose={handleClose}
        title={'계정삭제'}
        containedButton={{
          text: '확인',
          onClick: handleDelete,
        }}
        textButton={{
          text: '취소',
          onClick: handleClose,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            placeholder="계정 삭제를 위해 비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            autoComplete="off"
            onKeyDown={handlekeyDown}
          />
          <Typography id="modal-description">
            계정을 삭제하시겠습니까? <br />
            모든 작업물과 데이터가 영구적으로 삭제됩니다
          </Typography>
        </Box>
      </CuModal>
    </>
  )
}

export default UserWithdrawalModal
