import { useCallback, useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import { IMessageListData, IMessageTarget } from '@/types/IMessage'

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
  const messageSubmitHandler = async () => {
    // TODO : state 대신 formdata 사용할 수 있도록 수정
    try {
      if (!content) {
        alert('내용을 입력하세요.')
        return
      } else if (!userInfo) {
        alert('받는 사람을 입력하세요.')
        return
      }
      const reqBody: IMessageData = {
        targetId: userInfo.targetId,
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
      alert('쪽지 전송에 실패하였습니다. 다시 시도해주세요.')
    }
  }

  return (
    <form onSubmit={messageSubmitHandler} id={'new-message-form'}>
      <Typography>{`받는 사람 : ${
        userInfo ? userInfo.targetNickname : ''
      }`}</Typography>
      <TextField
        sx={{ width: '100%' }}
        value={content}
        placeholder="내용을 입력하세요"
        variant="outlined"
        multiline
        rows={3}
        onChange={(e) => setContent(e.target.value)}
      />
    </form>
  )
}

export default NewMessageForm
