import { FormEvent, useCallback, useState } from 'react'
import { Box, InputBase } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import useModal from '@/hook/useModal'
import useToast from '@/hook/useToast'
import { IMessageListData, IMessageTarget } from '@/types/IMessage'
import CuTextModal from '@/components/CuTextModal'
import CuToast from '@/components/CuToast'
import * as style from './NewMessageForm.style'

interface INewMessageFormProps {
  userInfo?: IMessageTarget
  setMessageData: (newMessageData: IMessageListData[]) => void
  handleClose: () => void
}

interface IMessageData {
  targetId: number
  content: string
}

const NewMessageForm = ({
  userInfo,
  setMessageData,
  handleClose,
}: INewMessageFormProps) => {
  const [content, setContent] = useState('')
  const axiosInstance = useAxiosWithAuth()
  const { isOpen: modalOpen, openModal, closeModal } = useModal()
  const {
    isOpen: toastOpen,
    openToast,
    closeToast,
    setToastMessage,
    toastMessage,
  } = useToast()

  const setToast = useCallback(
    (message: string) => {
      setToastMessage(message)
      openToast()
    },
    [openToast, setToastMessage],
  )

  const messageSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    // TODO : state 대신 formdata 사용할 수 있도록 수정
    e.preventDefault()
    if (!content) {
      setToast('내용을 입력하세요.')
      return
    }
    if (!userInfo) {
      setToast('받는 이를 선택하세요.')
      return
    }
    // confirm modal
    openModal()
  }

  const sendMessage = useCallback(
    async (targetId?: number, content?: string) => {
      try {
        if (!targetId || !content) throw new Error()
        const reqBody: IMessageData = {
          targetId: targetId,
          content: content,
        }
        const response = await axiosInstance.post(
          '/api/v1/message/new-message',
          reqBody,
        )
        setContent('')
        setMessageData(response.data)
        handleClose()
      } catch (error) {
        setToast('쪽지 전송에 실패했어요. 다시 시도해주세요.')
      }
    },
    [],
  )

  return (
    <>
      <form onSubmit={messageSubmitHandler} id={'new-message-form'}>
        <Box sx={style.form}>
          <InputBase
            fullWidth
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={style.input}
          />
        </Box>
      </form>
      <CuTextModal
        open={modalOpen}
        title={'쪽지 보내기'}
        onClose={closeModal}
        containedButton={{
          text: '보내기',
          onClick: () => {
            sendMessage(userInfo?.targetId, content)
          },
        }}
        textButton={{
          text: '취소',
          onClick: () => {
            closeModal()
          },
        }}
        content={`${userInfo?.targetNickname}에게 쪽지를 보내시겠습니까?`}
      />
      <CuToast open={toastOpen} onClose={closeToast} severity={'error'}>
        {toastMessage}
      </CuToast>
    </>
  )
}

export default NewMessageForm
