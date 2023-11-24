import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { Dispatch, SetStateAction } from 'react'

interface RowRadioButtonsGroupProps {
  setValue: Dispatch<SetStateAction<string>>
}

export default function RowRadioButtonsGroup({
  setValue,
}: RowRadioButtonsGroupProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="team-type-radio-buttons-group-label"
        name="team-type-radio-buttons-group"
        onChange={handleChange}
        defaultValue="PROJECT"
      >
        <FormControlLabel
          value="PROJECT"
          control={<Radio />}
          label="프로젝트"
          defaultChecked
        />
        <FormControlLabel value="STUDY" control={<Radio />} label="스터디" />
      </RadioGroup>
    </FormControl>
  )
}
