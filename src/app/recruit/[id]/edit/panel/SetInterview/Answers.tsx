import { IFormInterview } from '@/types/IPostDetail'
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'

const Answers = ({ data }: { data: IFormInterview }) => {
  console.log('data.type', data.type)
  switch (data.type) {
    case '객관식': {
      return (
        <Box>
          <RadioGroup
            aria-labelledby="muitiple-radio-buttons-group-label"
            name="multiple-radio-buttons-group"
          >
            {data.optionList?.map((option, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              )
            })}
          </RadioGroup>
        </Box>
      )
    }
    case '주관식': {
      return (
        <TextField
          variant="standard"
          value={data.type}
          disabled={true}
        ></TextField>
      )
    }
    case '체크박스': {
      return (
        <Box>
          <FormGroup sx={{ paddingLeft: '10px' }}>
            {data.optionList?.map((option, index) => {
              return (
                <Box key={index}>
                  <Typography>{`${index}번째 옵션`}</Typography>
                  <FormControlLabel control={<Checkbox />} label={``} />
                  <TextField
                    variant="standard"
                    value={option}
                    disabled={true}
                  ></TextField>
                </Box>
              )
            })}
          </FormGroup>
        </Box>
      )
    }
    case '선형배율': {
      // if (!data?.ratioList) return
      if (!data?.optionList) return
      // const maxNumber = parseInt(data.ratioList?.max)
      const maxNumber = parseInt(data.optionList[0])

      return (
        <Box>
          <RadioGroup
            aria-labelledby="muitiple-radio-buttons-group-label"
            name="multiple-radio-buttons-group"
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              {Array.from({ length: maxNumber }, (_, i) => i + 1).map(
                (num, index) => (
                  <Box
                    key={index}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <FormControlLabel
                      value={`${num}`}
                      control={<Radio />}
                      label={``}
                    />
                    {/* {num === 1 ? data.ratioList?.valueOfMin : null} */}
                    {/* {num === maxNumber ? data.ratioList?.valueOfMax : null} */}
                    {num === 1 && data.optionList ? data.optionList[1] : null}
                    {num === maxNumber && data.optionList
                      ? data.optionList[2]
                      : null}
                  </Box>
                ),
              )}
            </Box>
          </RadioGroup>
        </Box>
      )
    }
    default:
      return
  }
}

export default Answers
