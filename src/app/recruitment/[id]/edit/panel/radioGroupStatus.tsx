import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Dispatch, SetStateAction } from 'react'
import { statusEnum } from '../page'

interface RowRadioButtonsGroupProps {
  setValue: Dispatch<SetStateAction<statusEnum>>
}

export default function RowRadioButtonsGroupStatus({
  setValue,
}: RowRadioButtonsGroupProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as unknown as statusEnum)
  }

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        팀 모집 현황
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        defaultValue="project"
      >
        <FormControlLabel value="BEFORE" control={<Radio />} label="모집전" />
        <FormControlLabel
          value="ONGOING"
          control={<Radio />}
          label="모집중"
          defaultChecked
        />
        <FormControlLabel
          value="AFTER"
          control={<Radio />}
          label="모집완료"
          defaultChecked
        />
      </RadioGroup>
    </FormControl>
  )
}
