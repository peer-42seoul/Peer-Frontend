import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Dispatch, SetStateAction } from 'react'
import { Stack, Typography } from '@mui/material'
import * as style from './radioGroup.style'

interface RowRadioButtonsGroupProps {
  setValue: Dispatch<SetStateAction<string>>
  disabled?: boolean
  defaultChecked?: string
}

function RowRadioButtonsGroup({
  setValue,
  disabled,
  defaultChecked,
}: RowRadioButtonsGroupProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  return (
    <RadioGroup
      row
      aria-labelledby="team-type-radio-buttons-group-label"
      name="team-type-radio-buttons-group"
      onChange={handleChange}
    >
      <Stack spacing={'0.5rem'} direction={'row'}>
        <FormControlLabel
          value="PROJECT"
          control={<Radio sx={style.radioButtonStyle} size="small" />}
          label={
            <Typography variant={'Caption'} color={'text.alternative'}>
              프로젝트
            </Typography>
          }
          disabled={disabled}
          defaultChecked={defaultChecked === 'PROJECT'}
        />
        <FormControlLabel
          value="STUDY"
          control={<Radio sx={style.radioButtonStyle} size="small" />}
          label={
            <Typography variant={'Caption'} color={'text.alternative'}>
              스터디
            </Typography>
          }
          disabled={disabled}
          defaultChecked={defaultChecked === 'STUDY'}
        />
      </Stack>
    </RadioGroup>
  )
}

export default RowRadioButtonsGroup
