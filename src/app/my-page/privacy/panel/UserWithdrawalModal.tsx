'use client'

import CuModal from '@/components/CuModal'

import { useState, Dispatch, SetStateAction } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
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
      <Button
        variant={'contained'}
        onClick={handleOpen}
        color="red"
        sx={{
          width: '4rem',
          height: '1.75rem',
          wordBreak: 'keep-all',
        }}
      >
        <Typography variant={'CaptionEmphasis'} color={'text.normal'}>
          계정삭제
        </Typography>
      </Button>
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
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          spacing={2}
        >
          <Typography
            id="modal-description"
            variant="Body2"
            color={'text.normal'}
          >
            계정을 삭제하시겠습니까? 모든 작업물과 데이터가 영구적으로
            삭제됩니다.
          </Typography>
          <TextField
            placeholder="계정 삭제를 위해 비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            autoComplete="off"
            onKeyDown={handlekeyDown}
            fullWidth
          />
        </Stack>
      </CuModal>
    </>
  )
}

export default UserWithdrawalModal
