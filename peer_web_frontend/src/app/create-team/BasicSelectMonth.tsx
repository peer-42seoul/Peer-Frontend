import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export default function BasicSelectMonth() {
  const [num, setNum] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setNum(event.target.value as string)
  }

  return (
    <Box sx={{ width: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">기간</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={num}
          label="num"
          onChange={handleChange}
        >
          <MenuItem value={0}>1개월 미만</MenuItem>
          <MenuItem value={1}>1개월</MenuItem>
          <MenuItem value={2}>2개월</MenuItem>
          <MenuItem value={3}>3개월</MenuItem>
          <MenuItem value={4}>4개월</MenuItem>
          <MenuItem value={5}>5개월</MenuItem>
          <MenuItem value={6}>6개월</MenuItem>
          <MenuItem value={7}>7개월</MenuItem>
          <MenuItem value={8}>8개월</MenuItem>
          <MenuItem value={9}>9개월</MenuItem>
          <MenuItem value={10}>10개월</MenuItem>
          <MenuItem value={11}>11개월</MenuItem>
          <MenuItem value={12}>12개월 이상</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
