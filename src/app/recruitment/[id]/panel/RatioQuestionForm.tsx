import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { Controller } from 'react-hook-form'

export type RatioQuestionList = {
  number: string
  option1: string
  option2: string
}

const RatioQuestionForm = ({
  optionList,
  control,
  idx,
  value,
  disabled,
}: {
  optionList: RatioQuestionList
  control: any
  idx: number
  value?: string
  disabled: boolean
}) => {
  const number = parseInt(optionList?.number)
  const listArray = Array.from({ length: number }, (_, index) =>
    index.toString(),
  )
  return (
    <Controller
      disabled={disabled ? true : false}
      name={idx.toString()}
      control={control}
      rules={{
        required: '답변을 선택해주세요',
      }}
      defaultValue={value ? value : '0'}
      render={({ field }) => (
        <RadioGroup {...field}>
          {listArray?.map((label: string, index: number) => {
            return (
              <Box key={index}>
                <FormControlLabel
                  disabled={disabled ? true : false}
                  control={<Radio />}
                  label={label}
                  value={index}
                />
              </Box>
            )
          })}
        </RadioGroup>
      )}
    />
  )
}

export default RatioQuestionForm
