import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export default function BasicSelectArea() {
  const [num, setNum] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setNum(event.target.value as string)
  }

  return (
    <Box sx={{ width: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">지역</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={num}
          label="num"
          onChange={handleChange}
        >
          <MenuItem value={0}>구로구</MenuItem>
          <MenuItem value={1}>API 땡겨와서 작업예정</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
