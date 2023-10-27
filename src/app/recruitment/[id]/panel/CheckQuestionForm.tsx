import FormCheckbox from '@/app/panel/FormCheckbox'
import { FormControl, FormGroup } from '@mui/material'

export type CheckQuestionList = string[]

const CheckQuestionForm = ({
  optionList,
  control,
  idx,
  value,
}: {
  optionList: CheckQuestionList
  control: any
  idx: number
  value?: string
}) => {
  console.log('check', value)
  return (
    <FormControl component="fieldset">
      <FormGroup defaultValue={value}>
        {optionList?.map((label: string, index: number) => {
          console.log(label, value?.includes(label))
          return (
            <FormCheckbox
              name={`${idx}[${index}]`}
              label={label}
              control={control}
              key={index}
              value={value?.includes(label) ? label : undefined}
            />
          )
        })}
      </FormGroup>
    </FormControl>
  )
}

export default CheckQuestionForm
