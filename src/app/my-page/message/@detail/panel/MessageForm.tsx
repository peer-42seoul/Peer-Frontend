import {
  Dispatch,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react'
import { isAxiosError } from 'axios'
import { Stack, Typography, IconButton, styled } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuTextField from '@/components/CuTextField'
import useMedia from '@/hook/useMedia'
import useToast from '@/hook/useToast'
import SendIcon from '@/icons/SendIcon'
import { IMessage, IMessageTargetUser } from '@/types/IMessage'
import * as style from './MessageForm.style'

const MAX_LENGTH = 300

interface IMessageFormProps {
  targetId: number
  updateTarget?: Dispatch<SetStateAction<IMessageTargetUser | undefined>>
  addNewMessage: (newMessage: IMessage) => void
  handleClose?: () => void // MOBILE_VIEW에서 모달을 닫기 위함
  disabled?: boolean // PC_VIEW에서 채팅방이 삭제되었을 때 메시지 전송을 막기 위함
}

const BorderlessTextField = styled(CuTextField)(style.removeBorder)

const MessageForm = ({
  targetId,
  updateTarget,
  addNewMessage,
  handleClose,
  disabled,
}: IMessageFormProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [content, setContent] = useState<string>('')
  const {
    CuToast,
    isOpen,
    openToast,
    closeToast,
    toastMessage,
    setToastMessage,
  } = useToast()
  const { isPc } = useMedia()

  const resetToast = useCallback(() => {
    setToastMessage('')
    closeToast()
  }, [closeToast, setToastMessage])

  const setToast = useCallback(
    (message: string) => {
      setToastMessage(message)
      openToast()
    },
    [openToast, setToastMessage],
  )

  const messageSubmit = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLDivElement>,
  ) => {
    try {
      e.preventDefault()
      if (!content) {
        setToast('빈 메시지는 전송할 수 없습니다.')
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
        resetToast()
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
        setToast('상대가 쪽지를 삭제했습니다.') // NOTE : 안내 문구가 괜찮은지 모르겠음.
      } else setToast('쪽지 전송에 실패했습니다. 다시 시도해주세요.') // NOTE : 안내 문구가 괜찮은지 모르겠음.
    } finally {
      handleClose && handleClose()
    }
  }

  return (
    <>
      <form
        onSubmit={messageSubmit}
        id={'message-form'}
        style={!isPc ? { height: '100%' } : undefined}
      >
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
                placeholder="내용을 입력하세요"
                onChange={(e) =>
                  setContent(e.target.value.slice(0, MAX_LENGTH))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') messageSubmit(e)
                }}
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
          <BorderlessTextField
            fullWidth
            multiline
            value={content}
            placeholder="내용을 입력하세요"
            variant="outlined"
            onChange={(e) => setContent(e.target.value.slice(0, MAX_LENGTH))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.stopPropagation()
                return
                // messageSubmit(e) // NOTE : 모바일에서도 엔터를 쳤을 때 전송가능해야 하는지?
              }
            }}
          />
        )}
      </form>
      <CuToast open={isOpen} onClose={closeToast} severity="error">
        {toastMessage}
      </CuToast>
    </>
  )
}

export default MessageForm
