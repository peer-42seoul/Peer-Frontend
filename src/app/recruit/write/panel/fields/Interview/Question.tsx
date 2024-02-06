import ControlledSelect from '@/components/ControlledSelect'
import { IconButton, MenuItem, Stack, Typography } from '@mui/material'
import React from 'react'
import {
  Control,
  UseFieldArrayRemove,
  useFormState,
  useWatch,
} from 'react-hook-form'
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
  const { errors } = useFormState<IRecruitWriteField>({ control })

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
        inputProps={{
          maxLength: 20,
        }}
        error={!!errors?.interviewList?.[index]?.question?.message}
        rules={{
          required: '질문을 입력하세요.',
          maxLength: {
            value: 20,
            message: '최대 20자까지 입력 가능합니다.',
          },
          minLength: {
            value: 2,
            message: '최소 2자 이상 입력해주세요.',
          },
        }}
        helperText={
          <Typography variant="Caption" color={'error'}>
            {errors?.interviewList?.[index]?.question?.message}
          </Typography>
        }
        placeholder="질문을 입력해주세요."
        variant="standard"
        sx={{
          width: '100%',
          maxWidth: ['100%', '20rem'],
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
