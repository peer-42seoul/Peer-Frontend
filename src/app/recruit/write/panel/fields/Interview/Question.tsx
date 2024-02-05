import ControlledSelect from '@/components/ControlledSelect'
import { IconButton, MenuItem, Stack, Typography } from '@mui/material'
import React from 'react'
// import { IFormInterview } from '@/types/IPostDetail'
import { Control, UseFieldArrayRemove, useWatch } from 'react-hook-form'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'
import ControlledTextfield from '@/components/ControlledTextfield'
import Options from './Options'
import { CloseIcon } from '@/icons'

const Question = ({
  control,
  index,
  remove,
}: {
  control: Control<IRecruitWriteField, any>
  index: number
  remove: UseFieldArrayRemove
}) => {
  const type = useWatch({ control, name: `interviewList.${index}.type` })

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <ControlledSelect
          name={`interviewList.${index}.type`}
          control={control}
          rules={{ required: '필수 입력 항목입니다.' }}
          label="질문 타입"
          sx={{
            backgroundColor: 'background.tertiary',
            height: '2rem',
            flexGrow: 1,
          }}
          disabled
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
        </ControlledSelect>
        <IconButton
          size="small"
          sx={{ padding: 0 }}
          onClick={() => {
            remove(index)
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <ControlledTextfield
        name={`interviewList.${index}.question`}
        control={control}
        rules={{ required: '필수 입력 항목입니다.' }}
        placeholder="질문을 입력해주세요."
        variant="standard"
        sx={{
          width: '50%',
          '& .MuiInputBase-root': {
            fontSize: '15px',
            fontWeight: 400,
            color: 'text.normal',
            lineHeight: '150%',
          },
          '& input': {
            p: 0,
          },
        }}
      />
      <Options control={control} firstIndex={index} type={type} />
    </>
  )
}

export default Question
