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

const InterviewForm = ({
  control,
  closeModal,
  isOpen,
  trigger,
  setFormValue,
}: {
  control: Control<IRecruitWriteField>
  closeModal: () => void
  isOpen: boolean
  trigger: UseFormTrigger<IRecruitWriteField>
  setFormValue: UseFormSetValue<IRecruitWriteField>
}) => {
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

  const { isValid } = useFormState({ control, name: 'interviewList' })

  const handleCancel = () => {
    setFormValue('interviewList', [])
  }

  const handleComplete = () => {
    trigger('interviewList').then(() => {
      if (!isValid) return
    })
    openCompleteModal()
  }

  const handleAddQuestion = () => {
    if (fields.length >= 10) {
      return
    }
    if (value === 'OPEN')
      append({
        question: '질문을 입력하세요.',
        type: 'OPEN',
        optionList: [{ option: '' }],
      })
    else if (value === 'CLOSE')
      append({
        question: '질문을 입력하세요.',
        type: 'CLOSE',
        optionList: [{ option: '' }, { option: '' }],
      })
    else if (value === 'CHECK')
      append({
        question: '질문을 입력하세요.',
        type: 'CHECK',
        optionList: [{ option: '' }],
      })
    else if (value === 'RATIO')
      append({
        question: '질문을 입력하세요.',
        type: 'RATIO',
        optionList: [{ option: '5' }, { option: '' }, { option: '' }],
      })
  }
  return (
    <>
      <CuModal
        open={isOpen}
        onClose={closeModal}
        title="인터뷰 작성"
        textButton={{
          text: '취소',
          onClick: openCancelModal,
        }}
        containedButton={{
          text: '작성',
          onClick: handleComplete,
        }}
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
          text: '닫기',
          onClick: closeCancelModal,
        }}
        containedButton={{
          text: '나가기',
          onClick: handleCancel,
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
          onClick: closeModal,
        }}
      />
    </>
  )
}

export default InterviewForm
