import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { Dispatch, SetStateAction } from 'react'
import { Stack, Typography } from '@mui/material'

interface RowRadioButtonsGroupProps {
  setValue: Dispatch<SetStateAction<string>>
  disabled?: boolean
  defaultChecked?: string
}

// TODO : 상위 컴포넌트에서 value 가져와서 선택된 값의 색을 'text.normal'로 설정하기
export default function RowRadioButtonsGroup({
  setValue,
  disabled,
  defaultChecked,
}: RowRadioButtonsGroupProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  return (
    <>
      <FormControl sx={{ boxSizing: 'border-box' }}>
        <RadioGroup
          row
          aria-labelledby="team-type-radio-buttons-group-label"
          name="team-type-radio-buttons-group"
          onChange={handleChange}
          defaultValue={defaultChecked ?? 'PROJECT'}
        >
          <Stack spacing={'0.5rem'} direction={'row'}>
            <FormControlLabel
              value="PROJECT"
              control={
                <Radio
                  sx={{
                    width: '1.5rem',
                    height: '1.5rem',
                    color: 'text.alternative',
                    boxSizing: 'border-box',
                    '&.Mui-checked': {
                      color: 'text.alternative',
                    },
                  }}
                  size="small"
                />
              }
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
              control={
                <Radio
                  sx={{
                    width: '1.5rem',
                    height: '1.5rem',
                    color: 'text.alternative',
                    '&.Mui-checked': {
                      color: 'text.alternative',
                    },
                  }}
                  size="small"
                />
              }
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
      </FormControl>
    </>
  )
}
