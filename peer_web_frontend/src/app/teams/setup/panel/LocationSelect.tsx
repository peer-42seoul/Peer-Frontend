import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

const LocationSelect = ({
  location,
  setLocation,
}: {
  location: string
  setLocation: (event: SelectChangeEvent) => void
}) => {
  return (
    <FormControl sx={{ m: 0, minWidth: 80 }} size="small">
      <InputLabel id="demo-select-small-label">지역</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={location}
        label="지역"
        onChange={setLocation}
      >
        <MenuItem value={'서울'}>서울</MenuItem>
        <MenuItem value={'경기'}>경기</MenuItem>
        <MenuItem value={'인천'}>인천</MenuItem>
        <MenuItem value={'부산'}>부산</MenuItem>
        <MenuItem value={'판교'}>판교</MenuItem>
      </Select>
    </FormControl>
  )
}

export default LocationSelect
