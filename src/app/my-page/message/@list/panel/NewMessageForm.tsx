import { FormEvent, useCallback, useState } from 'react'
import { Box, TextField } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import useModal from '@/hook/useModal'
import { IMessageListData, IMessageTarget } from '@/types/IMessage'
import CuTextModal from '@/components/CuTextModal'
import useToast from '@/states/useToast'
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
  const { openToast } = useToast()
  const [isMessageSending, setIsMessageSending] = useState(false)

  const messageSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!content) {
      openToast({
        severity: 'error',
        message: '내용을 입력해주세요.',
      })
      return
    }
    if (!userInfo) {
      openToast({
        severity: 'error',
        message: '쪽지를 보낼 상대를 선택해주세요.',
      })
      return
    }
    // confirm modal
    openModal()
  }

  const sendMessage = useCallback(
    async (targetId?: number, content?: string) => {
      try {
        setIsMessageSending(true)
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
        closeModal() // close confirm modal
        handleClose()
      } catch (error) {
        closeModal() // close confirm modal
        openToast({
          severity: 'error',
          message: '쪽지 보내기에 실패했습니다. 다시 시도해주세요.',
        })
      } finally {
        setIsMessageSending(false)
      }
    },
    [],
  )

  return (
    <>
      <form onSubmit={messageSubmitHandler} id={'new-message-form'}>
        <Box sx={style.form}>
          <TextField
            multiline
            fullWidth
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={style.input}
            inputProps={{
              minLength: 2,
              maxLength: 300,
            }}
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
          isLoading: isMessageSending,
        }}
        textButton={{
          text: '취소',
          onClick: () => {
            closeModal()
          },
        }}
        content={`${userInfo?.targetNickname}에게 쪽지를 보내시겠습니까?`}
      />
    </>
  )
}

export default NewMessageForm
