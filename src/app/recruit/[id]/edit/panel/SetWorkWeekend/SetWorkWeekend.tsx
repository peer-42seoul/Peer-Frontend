import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface CheckboxState {
  mon: boolean
  tue: boolean
  wed: boolean
  thu: boolean
  fri: boolean
  sat: boolean
  sun: boolean
}
interface WorkWeekendProps {
  setWeekendCheckedState: Dispatch<SetStateAction<CheckboxState>>
  WeekendCheckedState: CheckboxState
}

const SetWorkWeekend = ({
  setWeekendCheckedState,
  WeekendCheckedState,
}: WorkWeekendProps) => {
  const handleChangeWeekend = (event: ChangeEvent<HTMLInputElement>) => {
    setWeekendCheckedState({
      ...WeekendCheckedState,
      [event.target.name]: event.target.checked,
    })
  }

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={0}>
      <Typography variant="h6">팀 활동 요일</Typography>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={0}>
          {[`mon`, 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((value) => (
            <Grid key={value} item>
              <Box>
                <Typography>{`${value}`}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={value}
                      checked={
                        WeekendCheckedState[value as keyof CheckboxState]
                      }
                      onChange={handleChangeWeekend}
                    />
                  }
                  label=""
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SetWorkWeekend
