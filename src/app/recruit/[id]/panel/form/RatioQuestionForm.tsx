import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material'
import { Controller } from 'react-hook-form'

export type RatioQuestionList = string[]

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
  const number = parseInt(optionList?.[0])
  const listArray = Array.from({ length: number }, (_, index) =>
    index.toString(),
  )
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
        <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
          <Typography>{optionList?.[1]}</Typography>
          <RadioGroup {...field} row>
            {listArray?.map((label: string, index: number) => {
              return (
                <Box key={index}>
                  <FormControlLabel
                    disabled={disabled}
                    control={<Radio />}
                    label={label}
                    value={index}
                  />
                </Box>
              )
            })}
          </RadioGroup>
          <Typography>{optionList?.[2]}</Typography>
        </Stack>
      )}
    />
  )
}

export default RatioQuestionForm
