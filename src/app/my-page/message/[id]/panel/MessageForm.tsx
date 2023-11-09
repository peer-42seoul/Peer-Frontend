import { useCallback, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import { IMessage } from '@/types/IMessage'

const MessageForm = ({
  targetId,
  addNewMessage,
}: {
  targetId: number
  addNewMessage: (newMessage: IMessage) => void
}) => {
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
      }
    } catch (error) {
      // TODO : 에러 구체화
      alert('메시지 전송에 실패하였습니다.')
    }
  }, [content])

  return (
    <Box sx={{ display: 'flex' }}>
      <TextField
        sx={{ width: '100%' }}
        value={content}
        placeholder="내용을 입력하세요"
        variant="outlined"
        multiline
        rows={3}
        onChange={(e) => setContent(e.target.value)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={messageSubmit}>보내기</Button>
      </Box>
    </Box>
  )
}

export default MessageForm
