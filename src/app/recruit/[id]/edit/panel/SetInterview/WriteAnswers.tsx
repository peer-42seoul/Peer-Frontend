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
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { Stack } from '@mui/material'
import { CloseIcon } from '@/icons'

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
    case 'OPEN': {
      return (
        <>
          <TextField
            variant="standard"
            disabled={true}
            placeholder="텍스트로 답변을 입력할 수 있어요."
            sx={{ width: '70%' }}
          >
            주관식 답변입니다.
          </TextField>
        </>
      )
    }
    case 'CLOSE': {
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RadioButtonUncheckedIcon sx={{ color: 'grey' }} />
            <TextField
              variant="standard"
              value={value}
              onChange={onHandlerEditValue}
              placeholder="옵션을 입력하세요."
              sx={{ width: '60%' }}
            />
            <Button onClick={onHandlerAddOption}>옵션 추가</Button>
          </Box>
          {option.map((data, index) => {
            return (
              <Stack
                key={index}
                direction={'row'}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <RadioButtonUncheckedIcon sx={{ color: 'grey' }} />
                <TextField
                  variant="standard"
                  value={data}
                  disabled={true}
                  sx={{ width: '60%' }}
                />
                <Button sx={{ width: '4%' }} onClick={onHandlerRemove(index)}>
                  <CloseIcon color="primary" />
                </Button>
              </Stack>
            )
          })}
        </>
      )
    }
    case 'CHECK': {
      return (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <CheckBoxOutlineBlankIcon sx={{ color: 'grey' }} />
            <TextField
              variant="standard"
              value={value}
              onChange={onHandlerEditValue}
            />
            <Button onClick={onHandlerAddOption}>옵션 추가</Button>
          </Box>
          {option.map((data, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <CheckBoxOutlineBlankIcon sx={{ color: 'grey' }} />
                <TextField variant="standard" value={data} disabled={true} />
                <Button sx={{ width: '4%' }} onClick={onHandlerRemove(index)}>
                  <CloseIcon color="primary" />
                </Button>
              </Box>
            )
          })}
        </>
      )
    }
    case 'RATIO': {
      return (
        <>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            gap={'0.5rem'}
          >
            <FormControl>
              <Select
                sx={{ width: '3.5rem', height: '2.5rem' }}
                defaultValue={1}
              >
                <MenuItem value={1}>{`1`}</MenuItem>
              </Select>
            </FormControl>
            <Typography color={'primary'}> ~ </Typography>
            <FormControl>
              <Select
                sx={{ width: '3.5rem', height: '2.5rem' }}
                value={max}
                onChange={onHandlerEditMax}
              >
                {['2', '3', '4', '5'].map((value) => {
                  return (
                    <MenuItem key={value} value={value}>{`${value}`}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Stack direction={'row'} sx={{ alignItems: 'center' }}>
              <Typography>1</Typography>
              <TextField
                variant="standard"
                value={valueOfMin}
                onChange={onHandlerEditValueOfMin}
              />
            </Stack>
            <Stack direction={'row'} sx={{ alignItems: 'center' }} >
              <Typography>{max}</Typography>
              <TextField
                variant="standard"
                value={valueOfMax}
                onChange={onHandlerEditValueOfMax}
              />
            </Stack>
          </Box>
        </>
      )
    }
    default:
      return
  }
}

export default WriteAnswers
