'use client'

import useToast from '@/hook/useToast'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ConfirmModal from './ConfirmModal'
import CloseQuestionForm, { CloseQuestionList } from './CloseQuestionForm'
import CheckQuestionForm, { CheckQuestionList } from './CheckQuestionForm'
import RatioQuestionForm, { RatioQuestionList } from './RatioQuestionForm'
import useAxiosWithAuth from '@/api/config'
import useSWR from 'swr'
import useAuthStore from '@/states/useAuthStore'
import { useRouter } from 'next/navigation'
import CuTextField from '@/components/CuTextField'

interface IInterviewData {
  question: string
  type: 'CLOSE' | 'OPEN' | 'RATIO' | 'CHECK'
  optionList?: CloseQuestionList | RatioQuestionList | CheckQuestionList | null
}

const RecruitFormModal = ({
  open,
  setOpen,
  recruit_id,
  role,
}: {
  open: boolean
  setOpen: any
  recruit_id: string
  role: string | null
}) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [isLoading, setLoading] = useState(false)
  const { isLogin } = useAuthStore()
  const { data } = useSWR<IInterviewData[]>(
    isLogin
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/interview/${recruit_id}`
      : null,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )
  const router = useRouter()
  const [openConfirm, setOpenConfirm] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const {
    CuToast: CuSuccessToast,
    isOpen: isSuccessOpen,
    openToast: openSuccessToast,
    closeToast: closeSuccessToast,
  } = useToast()
  const {
    CuToast: CuFailedToast,
    isOpen: isFailedOpen,
    openToast: openFailedToast,
    closeToast: closeFailedToast,
  } = useToast()

  const submitForm = () => {
    handleSubmit(onSubmit)()
  }

  const onSubmit = async (values: any) => {
    let value

    if (!data?.length) value = { role, answerList: [] }
    else {
      const array = Object.values(values)
      const answerList = array?.map((res: any) => {
        if (typeof res !== 'string') {
          const idxArr = res?.map((item: any, idx: number) =>
            item === true ? idx : undefined,
          )
          const trueArr = idxArr?.filter((item: any) => item !== undefined)
          return trueArr.join('^&%') //정해놓은 구분자로 넣기
        } else return res
      })
      value = {
        role: role ? role : 'STUDY',
        answerList,
      }
    }

    try {
      setLoading(true)
      await axiosWithAuth.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/interview/${recruit_id}`,
        value,
      )
      setOpenConfirm(false)
      openSuccessToast()
      router.push(`/recruit/${recruit_id}`)
      setOpen(false)
    } catch (e) {
      setOpenConfirm(false)
      openFailedToast()
      console.log('e', e)
    } finally {
      setLoading(false)
    }
  }

  return (data?.length ?? 0) > 0 ? (
    <>
      <CuSuccessToast
        open={isSuccessOpen}
        onClose={closeSuccessToast}
        severity="success"
      >
        <Typography>제출에 성공하였습니다.</Typography>
      </CuSuccessToast>
      <CuFailedToast
        open={isFailedOpen}
        onClose={closeFailedToast}
        severity="error"
      >
        <Typography>제출에 실패하였습니다.</Typography>
      </CuFailedToast>
      <form>
        <ConfirmModal
          isLoading={isLoading}
          open={openConfirm}
          setOpen={setOpenConfirm}
          submitForm={submitForm}
        />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack
            gap={'1.5rem'}
            padding={'1.5rem'}
            sx={{
              overflowY: 'auto',
              width: '70vw',
              maxHeight: '70vh',
              maxWidth: '800px',
              backgroundColor: 'background.primary',
            }}
          >
            <Typography variant={'Body1Emphasis'}>인터뷰 작성</Typography>
            <Stack gap={'1rem'}>
              {data?.map((quest, idx) => (
                <Box
                  key={idx}
                  bgcolor={'background.secondary'}
                  padding={'1.25rem'}
                  borderRadius={'0.75rem'}
                >
                  <Typography variant={'Body1Emphasis'} marginBottom={'1rem'}>
                    {quest.question}
                  </Typography>
                  {quest.type === 'OPEN' && (
                    <Controller
                      rules={{
                        required: '답변을 입력해주세요',
                      }}
                      name={idx.toString()}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CuTextField
                          fullWidth
                          multiline
                          {...field}
                          placeholder={
                            '텍스트로 답변을 입력할 수 있습니다. (공백포함 1000자 제한)'
                          }
                          variant="standard"
                          error={!!errors[idx]}
                          helperText={errors[idx]?.message as string}
                          inputProps={{
                            maxLength: 1000,
                          }}
                        />
                      )}
                    />
                  )}
                  {quest.type === 'CLOSE' && (
                    <CloseQuestionForm
                      optionList={quest?.optionList as CloseQuestionList}
                      control={control}
                      idx={idx}
                      disabled={false}
                    />
                  )}
                  {quest.type === 'RATIO' && (
                    <RatioQuestionForm
                      optionList={quest?.optionList as RatioQuestionList}
                      control={control}
                      idx={idx}
                      disabled={false}
                    />
                  )}
                  {quest.type === 'CHECK' && (
                    <CheckQuestionForm
                      optionList={quest?.optionList as CheckQuestionList}
                      control={control}
                      idx={idx}
                      disabled={false}
                    />
                  )}
                </Box>
              ))}
            </Stack>
            <Stack gap={1} direction={'row'} marginY={2}>
              <Button variant={'contained'} onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button
                variant={'contained'}
                onClick={() => {
                  if (Object.keys(errors)?.length === 0) setOpenConfirm(true)
                }}
              >
                제출하기
              </Button>
            </Stack>
          </Stack>
        </Modal>
      </form>
    </>
  ) : (
    <ConfirmModal
      isLoading={isLoading}
      open={open}
      setOpen={setOpen}
      submitForm={submitForm}
    />
  )
}

export default RecruitFormModal
