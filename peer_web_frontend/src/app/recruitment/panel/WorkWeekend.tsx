import { CheckBox } from '@mui/icons-material'
import { Box, Checkbox, FormControlLabel, Grid, Paper, Typography } from '@mui/material'


const WorkWeekend = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={0}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={0}>
          {[`mon`, 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((value) => (
            <Grid key={value} item>
              <Box>
                <Typography>{`${value}`}</Typography>
                <FormControlLabel control={<Checkbox defaultChecked />} label="" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default WorkWeekend
