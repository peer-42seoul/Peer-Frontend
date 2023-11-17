import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { isAxiosError } from 'axios'
import { Stack, TextField } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import { IMessage, IMessageTargetUser } from '@/types/IMessage'

type TMessageSendView = 'PC_VIEW' | 'MOBILE_VIEW'
interface IMessageFormProps {
  view: TMessageSendView
  targetId: number
  updateTarget?: Dispatch<SetStateAction<IMessageTargetUser | undefined>>
  addNewMessage: (newMessage: IMessage) => void
  handleClose?: () => void // MOBILE_VIEW에서 모달을 닫기 위함
  disabled?: boolean // PC_VIEW에서 채팅방이 삭제되었을 때 메시지 전송을 막기 위함
}

const MessageForm = ({
  view,
  targetId,
  updateTarget,
  addNewMessage,
  handleClose,
  disabled,
}: IMessageFormProps) => {
  const [content, setContent] = useState('')
  const axiosWithAuth = useAxiosWithAuth()
  const messageSubmit = useCallback(async () => {
    try {
      if (!content) {
        alert('내용을 입력하세요.')
        return
      }
      const messageData = {
        targetId: targetId,
        content,
      }
      const response = await axiosWithAuth.post(
        `/api/v1/message/back-message`,
        messageData,
      )
      if (response.status === 201) {
        addNewMessage(response.data)
        setContent('')
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 410) {
        // 채팅방이 삭제되었을 때
        updateTarget &&
          updateTarget((prev) => {
            if (prev) {
              return {
                ...prev,
                isDeleted: true,
              }
            }
            return prev
          })
      }
      alert('메시지 전송에 실패하였습니다.')
    } finally {
      handleClose && handleClose()
    }
  }, [content])

  return (
    <>
      {view === 'PC_VIEW' ? (
        <Stack direction={'row'}>
          <TextField
            sx={{ width: '100%' }}
            value={content}
            placeholder="내용을 입력하세요"
            variant="outlined"
            onChange={(e) => setContent(e.target.value)}
            disabled={disabled}
          />
          <CuButton
            variant="text"
            action={() => messageSubmit()}
            message="전송"
          />
        </Stack>
      ) : (
        <Stack>
          <TextField
            sx={{ width: '100%' }}
            value={content}
            placeholder="내용을 입력하세요"
            variant="outlined"
            multiline
            rows={10}
            onChange={(e) => setContent(e.target.value)}
          />
          <Stack direction={'row'}>
            <CuButton
              variant="contained"
              action={() => handleClose && handleClose()}
              message="취소"
            />
            <CuButton
              variant="contained"
              action={() => messageSubmit()}
              message="보내기"
            />
          </Stack>
        </Stack>
      )}
    </>
  )
}

export default MessageForm
