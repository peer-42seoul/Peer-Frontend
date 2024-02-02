import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Typography } from '@mui/material'

export default function BasicSelect({
  member,
  setMember,
  disabled,
}: {
  member: string
  setMember: React.Dispatch<React.SetStateAction<string>>
  disabled?: boolean
}) {
  const handleChange = (event: SelectChangeEvent) => {
    setMember(event.target.value as string)
  }

  return (
    <Box sx={{ width: '72px' }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={member}
          onChange={handleChange}
          sx={{ width: '4.5rem', height: '2rem' }}
          disabled={disabled ? disabled : false}
        >
          {[1, 2, 3, 4, 5, 6].map((value) => {
            return (
              <MenuItem key={value} value={value}>
                <Typography>{`${value}명`}</Typography>
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
