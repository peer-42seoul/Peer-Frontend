'use client'
import React, { useState } from 'react'
import { Box, Typography, Button, Select, MenuItem } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import CuTextField from '@/components/CuTextField'
import useAxiosWithAuth from '@/api/config'
import { useRouter } from 'next/navigation'

interface IReportFormInput {
  targetUrl: string
  reportType: string
  content: string
}

const ReportForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const useParams = useSearchParams()
  // 모집글, 사용자 등 신고 종류 구분
  const targetUrl = useParams.get('url')
  //console.log(targetUrl)
  // 신고 대상의 id(글, 사용자)


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
      targetUrl: targetUrl? targetUrl : '',
      reportType: '',
      content: '',
    },
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
      <Controller
        name="targetUrl"
        control={control}
        rules={{
          required: '유효하지 않은 신고요청입니다',
        }}
        render={({ field }) => (
          <>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <CuTextFieldLabel
                htmlFor="targetUrl"
                style={{ width: '120px' }}
              >
                신고 대상 url
              </CuTextFieldLabel>
              <CuTextField
                field={field}
                id="targetUrl"
                style={{ width: 'calc(100% - 120px)' }}
                placeholder="신고 내용을 작성해주세요"
                disabled
              />
            </Box>
            {errors.targetUrl && (
              <Typography>{errors.targetUrl?.message}</Typography>
            )}
          </>
        )}
      />
      <Controller
        name="reportType"
        control={control}
        rules={{
          required: '신고의 유형을 선택해주세요',
        }}
        render={({ field }) => (
          <>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <CuTextFieldLabel
                id="reportType-label"
                htmlFor="reportType"
                style={{ width: '120px' }}
              >
                신고 유형
              </CuTextFieldLabel>
              <Select
                labelId='reportType-label'
                {...field}
                sx={{width: "200px"}}
              >
                <MenuItem value="광고">광고</MenuItem>
                <MenuItem value="유해 컨텐츠">유해 컨텐츠</MenuItem>
                <MenuItem value="혐오 조장">혐오 조장</MenuItem>
                <MenuItem value="기타">기타</MenuItem>
              </Select>
            </Box>
            {errors.reportType && (
              <Typography>{errors.reportType?.message}</Typography>
            )}
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
              style={{marginBottom: "10px"}}
            >
              신고 내용
            </CuTextFieldLabel>
            <CuTextField
              field={field}
              id="content"
              style={{ width: '100%' }}
              placeholder="신고 내용을 작성해주세요"
              multiline
              rows={5}
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
