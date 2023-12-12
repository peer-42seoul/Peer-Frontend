import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

const WriteAnswers = ({
  formType,
  option,
  setOption,
  max,
  setMax,
  valueOfMin,
  setvalueOfMin,
  valueOfMax,
  setvalueOfMax,
}: {
  answer: string[]
  setAnswer: Dispatch<SetStateAction<string[]>>
  formType: string
  option: string[]
  setOption: Dispatch<SetStateAction<string[]>>
  max: string
  setMax: Dispatch<SetStateAction<string>>
  valueOfMin: string
  setvalueOfMin: Dispatch<SetStateAction<string>>
  valueOfMax: string
  setvalueOfMax: Dispatch<SetStateAction<string>>
}) => {
  const [value, setValue] = useState<string>('')

  const onHandlerAddOption = () => {
    if ((formType !== 'open' && value === '') || option.length === 10) {
      console.log('onHandlerAddOption')
      // TODO 에러 처리 추가예정
      return
    }
    console.log('WriteAnswers option', option)
    setOption([...option, value])
    setValue('')
  }

  const onHandlerEditValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as string)
  }

  const onHandlerEditMax = (event: SelectChangeEvent) => {
    setMax(event.target.value as string)
    setValue(event.target.value as string)
  }

  const onHandlerEditValueOfMin = (event: ChangeEvent<HTMLInputElement>) => {
    setvalueOfMin(event.target.value as string)
  }

  const onHandlerEditValueOfMax = (event: ChangeEvent<HTMLInputElement>) => {
    setvalueOfMax(event.target.value as string)
  }

  const onHandlerRemove = (index: number) => () => {
    setOption(option.filter((_, i) => i !== index))
  }

  switch (formType) {
    case 'open': {
      return (
        <>
          <TextField
            variant="outlined"
            disabled={true}
            value={'주관식 답변입니다.'}
          >
            주관식 답변입니다.
          </TextField>
        </>
      )
    }
    case 'close': {
      return (
        <>
          <Box sx={{ paddingBottom: '20px' }}>
            <RadioButtonCheckedIcon />
            <TextField
              variant="outlined"
              value={value}
              onChange={onHandlerEditValue}
              label="옵션을 입력하세요."
            />
            <Button onClick={onHandlerAddOption}>옵션 추가</Button>
          </Box>
          <Box>
            {option.map((data, index) => {
              return (
                <Box key={index}>
                  <RadioButtonCheckedIcon />
                  <TextField variant="outlined" value={data} disabled={true} />
                  <Button variant="outlined" onClick={onHandlerRemove(index)}>
                    제거
                  </Button>
                </Box>
              )
            })}
          </Box>
        </>
      )
    }
    case 'check': {
      return (
        <>
          <Box
            sx={{ paddingLeft: '10px', display: 'flex', flexDirection: 'row' }}
          >
            <CheckBoxOutlineBlankIcon />
            <TextField
              sx={{ paddingRight: '17px' }}
              variant="standard"
              value={value}
              onChange={onHandlerEditValue}
            ></TextField>
            <Button onClick={onHandlerAddOption}>옵션 추가</Button>
          </Box>
          <Box>
            <FormGroup>
              {option.map((data, index) => {
                return (
                  <Box key={index}>
                    <FormControlLabel control={<Checkbox />} label={``} />
                    <TextField
                      variant="standard"
                      value={data}
                      disabled={true}
                    />
                    <Button onClick={onHandlerRemove(index)}>제거</Button>
                  </Box>
                )
              })}
            </FormGroup>
          </Box>
        </>
      )
    }
    case 'ratio': {
      return (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <FormControl>
              <Select defaultValue={1}>
                <MenuItem value={1}>{`1`}</MenuItem>
              </Select>
            </FormControl>
            <Typography> ~ </Typography>
            <FormControl>
              <Select value={max} onChange={onHandlerEditMax}>
                {['2', '3', '4', '5', '6', '7', '8', '10'].map((value) => {
                  return (
                    <MenuItem key={value} value={value}>{`${value}`}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>최소값</Typography>
            <TextField
              variant="standard"
              value={valueOfMin}
              onChange={onHandlerEditValueOfMin}
            />
            <Typography>최대값</Typography>
            <TextField
              variant="standard"
              value={valueOfMax}
              onChange={onHandlerEditValueOfMax}
            />
          </Box>
        </>
      )
    }
    default:
      return
  }
}

export default WriteAnswers
