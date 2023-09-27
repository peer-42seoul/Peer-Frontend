import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function RowRadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        스터디 or 프로젝트
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="스터디"
          control={<Radio />}
          label="Study-group"
        />
        <FormControlLabel
          value="프로젝트"
          control={<Radio />}
          label="Project-team"
        />
      </RadioGroup>
    </FormControl>
  )
}
