import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

const SetupSelect = ({
  type,
  value,
  setValue,
}: {
  type: string
  value: string
  setValue: (event: SelectChangeEvent) => void
}) => {
  if (type === 'location') {
    return (
      <FormControl sx={{ m: 0, minWidth: 80 }} size="small">
        <InputLabel id="demo-select-small-label">지역</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          label="지역"
          onChange={setValue}
        >
          <MenuItem value={'서울'}>서울</MenuItem>
          <MenuItem value={'부산'}>부산</MenuItem>
          <MenuItem value={'인천'}>인천</MenuItem>
          <MenuItem value={'대구'}>대구</MenuItem>
          <MenuItem value={'광주'}>광주</MenuItem>
          <MenuItem value={'대전'}>대전</MenuItem>
          <MenuItem value={'울산'}>울산</MenuItem>
          <MenuItem value={'세종'}>세종</MenuItem>
        </Select>
      </FormControl>
    )
  } else if (type === 'operationForm') {
    return (
      <FormControl sx={{ m: 0, minWidth: 80 }} size="small">
        <InputLabel id="demo-select-small-label">활동 방식</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          label="활동 방식"
          onChange={setValue}
        >
          <MenuItem value={'온라인'}>온라인</MenuItem>
          <MenuItem value={'오프라인'}>오프라인</MenuItem>
          <MenuItem value={'혼합'}>혼합</MenuItem>
        </Select>
      </FormControl>
    )
  } else if (type === 'dueTo') {
    return (
      <FormControl sx={{ m: 0, minWidth: 80 }} size="small">
        <InputLabel id="demo-select-small-label">목표 기간</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          label="목표 기간"
          onChange={setValue}
        >
          <MenuItem value={'1주일'}>1주일</MenuItem>
          <MenuItem value={'2주일'}>2주일</MenuItem>
          <MenuItem value={'3주일'}>3주일</MenuItem>
          <MenuItem value={'4주일'}>4주일</MenuItem>
          <MenuItem value={'1개월'}>1개월</MenuItem>
          <MenuItem value={'2개월'}>2개월</MenuItem>
          <MenuItem value={'3개월'}>3개월</MenuItem>
          <MenuItem value={'4개월'}>4개월</MenuItem>
          <MenuItem value={'5개월'}>5개월</MenuItem>
          <MenuItem value={'6개월'}>6개월</MenuItem>
          <MenuItem value={'7개월'}>7개월</MenuItem>
          <MenuItem value={'8개월'}>8개월</MenuItem>
          <MenuItem value={'9개월'}>9개월</MenuItem>
          <MenuItem value={'10개월'}>10개월</MenuItem>
          <MenuItem value={'11개월'}>11개월</MenuItem>
          <MenuItem value={'12개월'}>12개월</MenuItem>
          <MenuItem value={'12개월 이상'}>12개월 이상</MenuItem>
        </Select>
      </FormControl>
    )
  } else {
    return <div></div>
  }
}

export default SetupSelect
