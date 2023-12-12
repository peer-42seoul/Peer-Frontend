import CuModal from './CuModal'
import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import CuTextField from '@/components/CuTextField'
import useAxiosWithAuth from '@/api/config'
import { Box, Typography } from '@mui/material'

interface IReportModalProps {
  isOpen: boolean
  handleClose: () => void
  reportType: 'user' | 'showcase' | 'recruit'
  targetId: string
}

const ReportModal = ({
  isOpen,
  handleClose,
  reportType,
  targetId,
}: IReportModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const axiosInstance = useAxiosWithAuth()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ targetId: string; content: string }>({
    defaultValues: {
      targetId: targetId ? targetId : '',
      content: '',
    },
  })

  const onSubmit: SubmitHandler<{ content: string }> = (data) => {
    console.log(data)
    setIsSubmitting(true)
    axiosInstance
      .post(`/report`, {
        data,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error.message)
      })
    setIsSubmitting(false)
  }

  let typeName: string

  switch (reportType) {
    case 'user':
      typeName = '유저'
      break
    case 'showcase':
      typeName = '쇼케이스'
      break
    case 'recruit':
      typeName = '모집글'
      break
  }

  return (
    <CuModal
      open={isOpen}
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
                    이 {typeName}를 신고하시겠습니까?
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
  )
}

export default ReportModal
