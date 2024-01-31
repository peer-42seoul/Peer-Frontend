import CuModal from './CuModal'
import React, { ReactNode, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import CuTextField from '@/components/CuTextField'
import useAxiosWithAuth from '@/api/config'
import { AlertColor, Box, Typography } from '@mui/material'
import ReportTypeSelect from '@/components/ReportTypeSelect'
import useToast from '@/states/useToast'

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
  const [toastProps, setToastProps] = useState<{
    severity: AlertColor
    message: ReactNode
  }>({
    severity: 'info',
    message: '',
  })
  const { openToast } = useToast()

  const axiosInstance = useAxiosWithAuth()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IReportFormInput>({
    defaultValues: {
      userId: targetId ? targetId : '',
      type: '',
      content: '',
    },
  })

  const onSubmit: SubmitHandler<IReportFormInput> = (data) => {
    //console.log(data)
    setIsSubmitting(true)
    axiosInstance
      .post(`api/v1/report`, data)
      .then(() => {
        setToastProps({
          severity: 'success',
          message: '신고가 접수되었습니다.',
        })
        handleClose()
        openToast(toastProps)
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          setToastProps({
            severity: 'error',
            message: '신고 접수 중 오류가 발생했습니다.',
          })
          openToast(toastProps)
        }
      })
    setIsSubmitting(false)
  }

  return (
    <>
      <CuModal
        open={isModalOpen}
        onClose={handleClose}
        title={'신고하기'}
        mobileFullSize
        containedButton={{
          text: isSubmitting ? '제출 중' : '완료',
          type: 'submit',
          form: 'report-form',
        }}
        textButton={{
          text: '취소',
          onClick: handleClose,
        }}
      >
        <Box sx={{ height: '100%', justifyContent: 'flex-start' }}>
          <form id="report-form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="type"
              control={control}
              rules={{
                required: '신고의 유형을 선택해주세요',
              }}
              render={({ field }) => (
                <>
                  <ReportTypeSelect field={field} label="신고 유형" />
                  <Typography color="error" variant="Caption">
                    {errors.type?.message || '\u00A0'}
                  </Typography>
                </>
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
                  <CuTextField
                    {...field}
                    id="content"
                    style={{ width: '100%' }}
                    placeholder="신고하는 이유를 적어주세요."
                    multiline
                    rows={5}
                  />
                  <Typography color="error" variant="Caption">
                    {errors.content?.message || '\u00A0'}
                  </Typography>
                </Box>
              )}
            />
          </form>
        </Box>
      </CuModal>
    </>
  )
}

export default ReportModal
