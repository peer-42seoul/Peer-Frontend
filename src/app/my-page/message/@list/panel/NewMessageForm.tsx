import { FormEvent, useCallback, useState } from 'react'
import { TextField } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import useToast from '@/hook/useToast'
import { IMessageListData, IMessageTarget } from '@/types/IMessage'
import CuToast from '@/components/CuToast'

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
  const { isOpen, openToast, closeToast, setToastMessage, toastMessage } =
    useToast()

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
    try {
      if (!content) {
        setToast('내용을 입력하세요.')
        return
      } else if (!userInfo) {
        setToast('받는 이를 선택하세요.')
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
      setToast('쪽지 전송에 실패했어요. 다시 시도해주세요.')
    }
  }

  return (
    <>
      <form onSubmit={messageSubmitHandler} id={'new-message-form'}>
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
      <CuToast open={isOpen} onClose={closeToast} severity={'error'}>
        {toastMessage}
      </CuToast>
    </>
  )
}

export default NewMessageForm
