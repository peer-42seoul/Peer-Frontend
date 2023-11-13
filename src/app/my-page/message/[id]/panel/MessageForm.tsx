import { useCallback, useState } from 'react'
import { Stack, TextField } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import { IMessage } from '@/types/IMessage'

type TMessageSendView = 'PC_VIEW' | 'MOBILE_VIEW'
interface IMessageFormProps {
  view: TMessageSendView
  targetId: number
  addNewMessage: (newMessage: IMessage) => void
  handleClose?: () => void // MOBILE_VIEW에서 모달을 닫기 위함
}

const MessageForm = ({
  view,
  targetId,
  addNewMessage,
  handleClose,
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
        addNewMessage(response.data.Msg)
        alert('메시지가 성공적으로 전송되었습니다.')
        setContent('')
        handleClose && handleClose()
      }
    } catch (error) {
      // TODO : 에러 구체화
      alert('메시지 전송에 실패하였습니다.')
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
