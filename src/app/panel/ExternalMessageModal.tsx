import React, { useState, ReactNode } from 'react'
import { Box, Stack, InputBase, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import useModal from '@/hook/useModal'
import useToast from '@/states/useToast'
import useMedia from '@/hook/useMedia'
import CuTextModal from '@/components/CuTextModal'
import CuModal from '@/components/CuModal'
import * as style from './ExternalMessageModal.style'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

interface IExternalMessageModalProps {
  targetNickname: string
  targetId: number
  isOpen: boolean
  handleClose: () => void
}

interface IMessageData {
  targetId: number
  content: string
}

const InputContainer = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <Stack spacing={'0.25rem'} width={'100%'}>
      <Typography
        sx={style.subTitle}
        variant={'CaptionEmphasis'}
        color={'text.strong'}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  )
}

const ExternalMessageModal = ({
  targetNickname,
  targetId,
  isOpen,
  handleClose,
}: IExternalMessageModalProps) => {
  const axiosInstance = useAxiosWithAuth()
  const { isOpen: modalOpen, openModal, closeModal } = useModal()
  const { isPc } = useMedia()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { openToast } = useToast()

  const { handleSubmit, control, watch } = useForm<IMessageData>({
    defaultValues: {
      targetId: targetId,
      content: '',
    },
  })

  const onSubmit: SubmitHandler<IMessageData> = (data) => {
    setIsSubmitting(true)
    axiosInstance
      .post(`api/v1/message/external-message`, data)
      .then(() => {
        closeModal()
        handleClose()
        openToast({
          severity: 'success',
          message: '쪽지가 전송되었습니다.',
        })
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          openToast({
            severity: 'error',
            message: '전송 중 오류가 발생했습니다.',
          })
        }
        closeModal()
      })
    setIsSubmitting(false)
  }

  const content = watch('content')

  const handleSendClick = () => {
    if (!content.trim()) {
      openToast({
        severity: 'error',
        message: '내용을 입력해주세요.',
      })
    } else {
      openModal()
    }
  }

  return (
    <>
      <CuModal
        open={isOpen}
        onClose={handleClose}
        title={'새 쪽지'}
        mobileFullSize
        containedButton={{
          text: '보내기',
          type: 'button',
          onClick: handleSendClick,
        }}
        textButton={{
          text: '취소',
          onClick: handleClose,
        }}
      >
        <>
          <Stack
            alignItems={isPc ? 'center' : 'flex-start'}
            spacing={'1rem'}
            sx={isPc ? style.pcContainer : style.mobileContainer}
          >
            <InputContainer title={'받는 이'}>
              <InputBase
                fullWidth
                value={targetNickname}
                disabled
                sx={style.inputBase}
              />
            </InputContainer>
            <InputContainer title={'내용'}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                id={'external-message-form'}
              >
                <Box sx={style.form}>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <InputBase
                        fullWidth
                        placeholder="내용을 입력하세요."
                        {...field}
                        sx={style.input}
                      />
                    )}
                  />
                </Box>
              </form>
              <CuTextModal
                open={modalOpen}
                title={'쪽지 보내기'}
                onClose={closeModal}
                containedButton={{
                  text: isSubmitting ? '제출 중' : '확인',
                  type: 'submit',
                  form: 'external-message-form',
                }}
                textButton={{
                  text: '취소',
                  onClick: () => {
                    closeModal()
                  },
                }}
                content={`${targetNickname}에게 쪽지를 보내시겠습니까?`}
              />
            </InputContainer>
          </Stack>
        </>
      </CuModal>
    </>
  )
}

export default ExternalMessageModal
