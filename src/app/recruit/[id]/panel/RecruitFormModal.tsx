import useToast from '@/hook/useToast'
import {
  Box,
  Button,
  Modal,
  Portal,
  TextField,
  Typography,
} from '@mui/material'
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
interface IInterviewData {
  question: string
  type: 'CLOSE' | 'OPEN' | 'RATIO' | 'CHECK'
  optionList?: CloseQuestionList | RatioQuestionList | CheckQuestionList | null
}

const RecruitFormModal = ({
  open,
  setOpen,
  user_id,
  recruit_id,
  role,
  setRoleOpen,
}: {
  open: boolean
  setOpen: any
  user_id: string
  recruit_id: string
  role: string,
  setRoleOpen: any
}) => {
  const axiosWithAuth = useAxiosWithAuth()
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

    const value = {
      user_id,
      recruit_id,
      role,
      answerList,
    }
    console.log('value', value)

    try {
      await axiosWithAuth.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/interview/${recruit_id}`,
        value,
      )
      setOpenConfirm(false)
      openSuccessToast()
      router.push(`/recruit/${recruit_id}`)
      setOpen(false)
      setRoleOpen(false)

    } catch (e) {
      setOpenConfirm(false)
      openFailedToast()
      console.log('e', e)
    }
  }

  return (
    <>
      <Portal>
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
      </Portal>
      <form>
        <ConfirmModal
          open={openConfirm}
          setOpen={setOpenConfirm}
          submitForm={submitForm}
        />
        <Modal open={open} onClose={() => setOpen(false)} sx={{ zIndex: 1400 }}>
          <Box
            bgcolor={'white'}
            padding={4}
            height={'90%'}
            sx={{ overflowY: 'scroll' }}
          >
            <Button onClick={() => setOpen(false)}>닫기</Button>
            <Typography variant="h4">{`${role} 지원 하기`}</Typography>
            {data?.map((quest, idx) => (
              <Box key={idx}>
                <Typography>{idx + 1}번 질문</Typography>
                <Typography>{quest.question}</Typography>
                {quest.type === 'OPEN' && (
                  <Controller
                    rules={{
                      required: '답변을 입력해주세요',
                    }}
                    name={idx.toString()}
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} />}
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
                {errors[idx] && (
                  <Typography color="error">
                    {errors[idx]?.message as string}
                  </Typography>
                )}
              </Box>
            ))}
            <Button onClick={() => setOpenConfirm(true)}>제출</Button>
          </Box>
        </Modal>
      </form>
    </>
  )
}

export default RecruitFormModal
