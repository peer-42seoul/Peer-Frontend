import { RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

export type CloseQuestionList = string[]

const CloseQuestionForm = ({
  optionList,
  control,
  idx,
  value,
  disabled,
}: {
  optionList: CloseQuestionList
  control: any
  idx: number
  value?: string
  disabled: boolean
}) => {
  return (
    <Controller
      disabled={disabled}
      name={idx.toString()}
      control={control}
      rules={{
        required: '답변을 선택해주세요',
      }}
      defaultValue={value ? value : '0'}
      render={({ field }) => (
        <RadioGroup {...field}>
          {optionList?.map((label: string, index: number) => {
            return (
              <FormControlLabel
                disabled={disabled}
                control={<Radio />}
                label={
                  <Typography color={'text.alternative'}>{label}</Typography>
                }
                value={index}
                key={index}
              />
            )
          })}
        </RadioGroup>
      )}
    />
  )
}

export default CloseQuestionForm
