'use client'
import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import CuTextField from '@/components/CuTextField'
import useAxiosWithAuth from '@/api/config'
import { useRouter } from 'next/navigation'

interface IReportFormInput {
  type: string
  id: number
  content: string
}

const ReportForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const useParams = useSearchParams()
  // 모집글, 사용자 등 신고 종류 구분
  const type = useParams.get('type')
  // 신고 대상의 id(글, 사용자)
  const id = Number(useParams.get('id'))

  const axiosInstance = useAxiosWithAuth()

  const onSubmit: SubmitHandler<IReportFormInput> = (data) => {
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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IReportFormInput>({
    defaultValues: {
      type: type ? type : '',
      id: id,
      content: '',
    },
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="content"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Box>
            <CuTextFieldLabel
              htmlFor="content"
              style={{ color: '#000', font: 'inherit' }}
            >
              신고 내용
            </CuTextFieldLabel>
            <CuTextField
              field={field}
              id="content"
              style={{ width: '100%' }}
              placeholder="신고 내용을 작성해주세요"
            />
            {errors.content && (
              <Typography>{errors.content.message}</Typography>
            )}
          </Box>
        )}
      />
      <Button onClick={() => router.back()}>취소하기</Button>
      <Button type="submit" disabled={isSubmitting}>
        신고하기
      </Button>
    </Box>
  )
}

export default ReportForm
