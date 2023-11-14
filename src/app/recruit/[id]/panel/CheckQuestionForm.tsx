import FormCheckbox from '@/app/panel/FormCheckbox'
import { FormControl, FormGroup } from '@mui/material'

export type CheckQuestionList = string[]

const CheckQuestionForm = ({
  optionList,
  control,
  idx,
  value,
  disabled,
}: {
  optionList: CheckQuestionList
  control: any
  idx: number
  value?: string
  disabled: boolean
}) => {
  return (
    <FormControl disabled={disabled ? true : false} component="fieldset">
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
