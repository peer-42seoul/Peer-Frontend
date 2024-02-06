import CuModal from '@/components/CuModal'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'
import { Button, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import {
  Control,
  UseFormSetValue,
  UseFormTrigger,
  useFieldArray,
  useFormState,
} from 'react-hook-form'
import Question from './Question'
import CuTextModal from '@/components/CuTextModal'
import useModal from '@/hook/useModal'
import useToast from '@/states/useToast'

const InterviewForm = ({
  control,
  closeModal,
  isOpen,
  trigger,
  setFormValue,
  setCompletedInterview,
}: {
  control: Control<IRecruitWriteField>
  closeModal: () => void
  isOpen: boolean
  trigger: UseFormTrigger<IRecruitWriteField>
  setFormValue: UseFormSetValue<IRecruitWriteField>
  setCompletedInterview: (value: boolean) => void
}) => {
  const { openToast } = useToast()
  const {
    openModal: openCancelModal,
    closeModal: closeCancelModal,
    isOpen: isCancelOpen,
  } = useModal()

  const {
    openModal: openCompleteModal,
    closeModal: closeCompleteModal,
    isOpen: isCompleteOpen,
  } = useModal()

  const [value, setValue] = useState<'OPEN' | 'CLOSE' | 'CHECK' | 'RATIO'>(
    'OPEN',
  )

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'interviewList',
  })

  const { errors } = useFormState({ control, name: 'interviewList' })

  const handleComplete = () => {
    if (fields.length === 0) {
      openToast({
        message: '최소 한 개 이상의 질문을 작성하세요.',
        severity: 'error',
      })
      return
    }
    trigger('interviewList').then(() => {
      if (Object.keys(errors).length) {
        console.log(errors)
        openToast({
          message: '질문과 답변을 모두 작성해주세요.',
          severity: 'error',
        })
        return
      }
      openCompleteModal()
    })
  }

  const handleCompleteModalConfirm = () => {
    setCompletedInterview(true)
    closeCompleteModal()
    closeModal()
  }

  const handleCancelModalConfirm = () => {
    fields.map((_, index) => remove(index))
    setFormValue('interviewList', [])
    closeCancelModal()
    closeModal()
  }

  const handleAddQuestion = () => {
    if (fields.length >= 10) {
      return
    }
    if (value === 'OPEN')
      append({
        question: '',
        type: 'OPEN',
        optionList: [{ option: '' }],
      })
    else if (value === 'CLOSE')
      append({
        question: '',
        type: 'CLOSE',
        optionList: [{ option: '' }, { option: '' }],
      })
    else if (value === 'CHECK')
      append({
        question: '',
        type: 'CHECK',
        optionList: [{ option: '' }],
      })
    else if (value === 'RATIO')
      append({
        question: '',
        type: 'RATIO',
        optionList: [{ option: '5' }, { option: '' }, { option: '' }],
      })
  }
  return (
    <>
      <CuModal
        open={isOpen}
        onClose={openCancelModal}
        title="인터뷰 작성"
        textButton={{
          text: '취소',
          onClick: openCancelModal,
        }}
        containedButton={{
          text: '작성',
          onClick: handleComplete,
        }}
        mobileFullSize
      >
        <Stack spacing={'1.5rem'}>
          {fields.map((field, index) => {
            return (
              <Stack
                key={field.id}
                spacing={'1rem'}
                sx={{
                  backgroundColor: 'background.secondary',
                  px: '1rem',
                  py: '1.5rem',
                  borderRadius: ['0.25rem', '0.75rem'],
                }}
              >
                <Question control={control} index={index} remove={remove} />
              </Stack>
            )
          })}
          <Stack spacing={'1rem'} direction={'row'}>
            <Select
              value={value}
              onChange={(event) =>
                setValue(
                  event.target.value as 'OPEN' | 'CLOSE' | 'CHECK' | 'RATIO',
                )
              }
            >
              <MenuItem value="OPEN">
                <Typography variant="Body2">주관식</Typography>
              </MenuItem>
              <MenuItem value="CLOSE">
                <Typography variant="Body2">객관식</Typography>
              </MenuItem>
              <MenuItem value="CHECK">
                <Typography variant="Body2">다중 선택</Typography>
              </MenuItem>
              <MenuItem value="RATIO">
                <Typography variant="Body2">선형 배율</Typography>
              </MenuItem>
            </Select>
            <Button onClick={handleAddQuestion} disabled={fields.length >= 10}>
              질문 추가
            </Button>
          </Stack>
        </Stack>
      </CuModal>
      <CuTextModal
        open={isCancelOpen}
        onClose={closeCancelModal}
        title="다음에 할까요?"
        content="인터뷰를 통해 지원자에 대해 더 자세히 알 수 있어요."
        textButton={{
          text: '취소',
          onClick: closeCancelModal,
        }}
        containedButton={{
          text: '나가기',
          onClick: handleCancelModalConfirm,
        }}
      />
      <CuTextModal
        open={isCompleteOpen}
        onClose={closeCompleteModal}
        title="다 작성하셨나요?"
        content="인터뷰 수정하기를 통해 언제든지 수정할 수 있어요."
        textButton={{
          text: '닫기',
          onClick: closeCompleteModal,
        }}
        containedButton={{
          text: '완료',
          onClick: handleCompleteModalConfirm,
        }}
      />
    </>
  )
}

export default InterviewForm
