import {
  Dispatch,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react'
import { isAxiosError } from 'axios'
import { Stack, Typography, IconButton, styled, Box } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuTextField from '@/components/CuTextField'
import useMedia from '@/hook/useMedia'
import useToast from '@/states/useToast'
import SendIcon from '@/icons/SendIcon'
import { IMessage, IMessageTargetUser } from '@/types/IMessage'
import * as style from './MessageForm.style'

const MAX_LENGTH = 300

interface IMessageFormProps {
  messageSendState: {
    isMessageSending: boolean
    setIsMessageSending: (value: boolean) => void
  }
  targetId: number
  updateTarget?: Dispatch<SetStateAction<IMessageTargetUser | undefined>>
  addNewMessage: (newMessage: IMessage) => void
  handleClose?: () => void // MOBILE_VIEW에서 모달을 닫기 위함
  disabled?: boolean // PC_VIEW에서 채팅방이 삭제되었을 때 메시지 전송을 막기 위함
}

const BorderlessTextField = styled(CuTextField)(style.removeBorder)

const MessageForm = ({
  messageSendState,
  targetId,
  updateTarget,
  addNewMessage,
  handleClose,
  disabled,
}: IMessageFormProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [content, setContent] = useState<string>('')
  const { isPc } = useMedia()
  const { openToast } = useToast()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      // 한글 입력 시 이벤트 중복 방지 https://minjung-jeon.github.io/IME-keyCode-229-issue/
      if (!e.nativeEvent.isComposing && e.key === 'Enter') messageSubmit(e)
    },
    [content],
  )

  const messageSubmit = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLDivElement>,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    messageSendState.setIsMessageSending(true)
    try {
      if (!content) {
        openToast({
          severity: 'error',
          message: '내용을 입력해주세요.',
        })
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
        openToast({
          severity: 'error',
          message:
            '상대가 쪽지를 삭제했습니다. 새 쪽지 보내기를 통해 다시 대화를 시작해주세요.',
        })
      } else {
        openToast({
          severity: 'error',
          message: '쪽지 보내기에 실패했습니다. 다시 시도해주세요.',
        })
      }
    } finally {
      messageSendState.setIsMessageSending(false)
      handleClose && handleClose()
    }
  }

  return (
    <Box sx={isPc ? undefined : style.mobileMessageForm}>
      <form onSubmit={messageSubmit} id={'message-form'}>
        {isPc ? (
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
                id="message"
                multiline
                value={content}
                placeholder={
                  disabled ? '채팅방이 삭제되었습니다' : '내용을 입력하세요'
                }
                onChange={(e) =>
                  setContent(e.target.value.slice(0, MAX_LENGTH))
                }
                onKeyDown={handleKeyDown}
                disabled={disabled}
                sx={{
                  '.MuiOutlinedInput-root.Mui-disabled': {
                    opacity: 1,
                  },
                }}
              />
              <Typography color={'text.assistive'} sx={style.messageLength}>
                {content.length} / {MAX_LENGTH}
              </Typography>
            </Stack>
            <IconButton
              disabled={messageSendState.isMessageSending || disabled}
              type="submit"
              sx={style.pcSendButton}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        ) : (
          <BorderlessTextField
            fullWidth
            multiline
            value={content}
            placeholder="내용을 입력하세요"
            variant="outlined"
            onChange={(e) => setContent(e.target.value.slice(0, MAX_LENGTH))}
            onKeyDown={handleKeyDown}
          />
        )}
      </form>
    </Box>
  )
}

export default MessageForm
