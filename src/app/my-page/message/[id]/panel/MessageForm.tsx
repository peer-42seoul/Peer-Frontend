import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { isAxiosError } from 'axios'
import { Stack, TextField, Typography, IconButton, styled } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import { IMessage, IMessageTargetUser } from '@/types/IMessage'
import SendIcon from '@/icons/SendIcon'
import * as style from './MessageForm.style'
import CuTextField from '@/components/CuTextField'

const MAX_LENGTH = 300

type TMessageSendView = 'PC_VIEW' | 'MOBILE_VIEW'
interface IMessageFormProps {
  view: TMessageSendView
  targetId: number
  updateTarget?: Dispatch<SetStateAction<IMessageTargetUser | undefined>>
  addNewMessage: (newMessage: IMessage) => void
  handleClose?: () => void // MOBILE_VIEW에서 모달을 닫기 위함
  disabled?: boolean // PC_VIEW에서 채팅방이 삭제되었을 때 메시지 전송을 막기 위함
}

const BorderlessTextField = styled(CuTextField)(style.removeBorder)

const MessageForm = ({
  view,
  targetId,
  updateTarget,
  addNewMessage,
  handleClose,
  disabled,
}: IMessageFormProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [content, setContent] = useState<string>('')
  const messageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
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
  }

  return (
    <form onSubmit={messageSubmit}>
      {view === 'PC_VIEW' ? (
        <Stack
          direction={'row'}
          alignItems={'center'}
          spacing={'1rem'}
          sx={style.pcMessageForm}
        >
          <Stack
            direction={'row'}
            spacing={0}
            alignItems={'flex-end'}
            sx={style.pcTextFieldContainer}
          >
            <BorderlessTextField
              fullWidth
              multiline
              rows={4}
              value={content}
              placeholder="내용을 입력하세요"
              onChange={(e) => setContent(e.target.value.slice(0, MAX_LENGTH))}
              disabled={disabled}
            />
            <Typography color={'text.assistive'} sx={style.messageLength}>
              {content.length} / {MAX_LENGTH}
            </Typography>
          </Stack>
          <IconButton type="submit" sx={style.pcSendButton}>
            <SendIcon />
          </IconButton>
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
            <CuButton variant="contained" type="submit" message="보내기" />
          </Stack>
        </Stack>
      )}
    </form>
  )
}

export default MessageForm
