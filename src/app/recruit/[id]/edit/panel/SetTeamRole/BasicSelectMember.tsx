import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export default function BasicSelect({
  member,
  setMember,
}: {
  member: string
  setMember: React.Dispatch<React.SetStateAction<string>>
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
        >
          {[1, 2, 3, 4, 5, 6].map((value) => {
            return <MenuItem key={value} value={value}>{`${value}명`}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
