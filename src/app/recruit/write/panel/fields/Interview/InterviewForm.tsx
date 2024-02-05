import CuModal from '@/components/CuModal'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'
import { Button, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Control, UseFormTrigger, useFieldArray } from 'react-hook-form'
import Question from './Question'

const InterviewForm = ({
  control,
  closeModal,
  isOpen,
  trigger,
}: {
  control: Control<IRecruitWriteField>
  closeModal: () => void
  isOpen: boolean
  trigger: UseFormTrigger<IRecruitWriteField>
}) => {
  const [value, setValue] = useState<'OPEN' | 'CLOSE' | 'CHECK' | 'RATIO'>(
    'OPEN',
  )

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'interviewList',
  })

  const handleComplete = () => {
    trigger('interviewList')
    closeModal()
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
    <CuModal
      open={isOpen}
      onClose={closeModal}
      title="인터뷰 작성"
      textButton={{
        text: '취소',
        onClick: closeModal,
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
  )
}

export default InterviewForm
