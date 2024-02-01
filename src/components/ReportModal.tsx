import CuModal from './CuModal'
import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import CuTextField from '@/components/CuTextField'
import useAxiosWithAuth from '@/api/config'
import { Box, Typography, Stack } from '@mui/material'
import ReportTypeSelect from '@/components/ReportTypeSelect'
import useToast from '@/states/useToast'
import useModal from '@/hook/useModal'
import CuTextModal from './CuTextModal'

interface IReportModalProps {
  isModalOpen: boolean
  handleClose: () => void
  targetId: string
}

interface IReportFormInput {
  userId: string
  type: string
  content: string
}

const ReportModal = ({
  isModalOpen,
  handleClose,
  targetId,
}: IReportModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { openToast } = useToast()
  const { isOpen, openModal, closeModal } = useModal()

  const axiosInstance = useAxiosWithAuth()
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<IReportFormInput>({
    defaultValues: {
      userId: targetId ? targetId : '',
      type: '',
      content: '',
    },
  })

  const onSubmit: SubmitHandler<IReportFormInput> = (data) => {
    setIsSubmitting(true)
    axiosInstance
      .post(`api/v1/report`, data)
      .then(() => {
        closeModal()
        handleClose()
        openToast({
          severity: 'success',
          message: '신고가 접수되었습니다.',
        })
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          openToast({
            severity: 'error',
            message: '신고 접수 중 오류가 발생했습니다.',
          })
        }
        closeModal()
      })
    setIsSubmitting(false)
  }

  const handleReportClick = async () => {
    const isValid = await trigger()
    if (isValid) openModal()
  }

  return (
    <>
      <CuModal
        open={isModalOpen}
        onClose={handleClose}
        title={'신고하기'}
        mobileFullSize
        containedButton={{
          text: '신고',
          type: 'button',
          onClick: handleReportClick,
        }}
        textButton={{
          text: '취소',
          onClick: handleClose,
        }}
      >
        <Box sx={{ height: '100%', justifyContent: 'flex-start' }}>
          <form id="report-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={1}>
              <Controller
                name="type"
                control={control}
                rules={{
                  required: '신고의 유형을 선택해주세요',
                }}
                render={({ field }) => (
                  <Stack gap={1}>
                    <ReportTypeSelect
                      field={field}
                      label="신고 유형"
                      trigger={trigger}
                    />
                    <Typography color="error" variant="Caption">
                      {errors.type?.message || '\u00A0'}
                    </Typography>
                  </Stack>
                )}
              />
              <Controller
                name="content"
                control={control}
                rules={{
                  required: '신고 내용을 작성해주세요',
                }}
                render={({ field }) => (
                  <Box>
                    <CuTextFieldLabel
                      htmlFor="content"
                      style={{ marginBottom: '10px' }}
                    >
                      <Typography variant="Body2">
                        이 유저를 신고하시겠습니까?
                      </Typography>
                    </CuTextFieldLabel>
                    <Stack gap={1}>
                      <CuTextField
                        {...field}
                        id="content"
                        style={{ width: '100%' }}
                        placeholder="신고하는 이유를 적어주세요."
                        multiline
                        rows={5}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          trigger('content')
                        }}
                      />
                      <Typography color="error" variant="Caption">
                        {errors.content?.message || '\u00A0'}
                      </Typography>
                    </Stack>
                  </Box>
                )}
              />
            </Stack>
          </form>
        </Box>
      </CuModal>
      <CuTextModal
        open={isOpen}
        title={'쪽지 보내기'}
        onClose={closeModal}
        containedButton={{
          text: isSubmitting ? '제출 중' : '완료',
          type: 'submit',
          form: 'report-form',
        }}
        textButton={{
          text: '취소',
          onClick: () => {
            closeModal()
          },
        }}
        content={'정말 이 사용자를 신고하시겠습니까?'}
      />
    </>
  )
}

export default ReportModal
