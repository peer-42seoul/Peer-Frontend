import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Dispatch, SetStateAction } from 'react'

interface RowRadioButtonsGroupProps {
  setValue?: Dispatch<SetStateAction<string>>
  value?: string
}

export default function RowRadioButtonsGroup({
  setValue,
  value,
}: RowRadioButtonsGroupProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue((event.target as HTMLInputElement).value)
  }

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        스터디 or 프로젝트
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        defaultValue={value ?? "project"}
      >
        <FormControlLabel
          value="study"
          control={<Radio />}
          label="Study-group"
          disabled={!!value}
        />
        <FormControlLabel
          value="project"
          control={<Radio />}
          label="Project-team"
          // defaultChecked
          disabled={!!value}
        />
      </RadioGroup>
    </FormControl>
  )
}
