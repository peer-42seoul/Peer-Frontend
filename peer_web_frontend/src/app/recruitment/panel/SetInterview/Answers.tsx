import { IFormInterview } from '@/types/IPostDetail';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from '@mui/material'

const Answers = ({ data }: { data: IFormInterview; index: number }) => {
  if (data.type === '객관식') {
    return (
      <Box>
        {data.optionList.map((option, index) => {
          return (
            <Box key={index}>
              <Typography>{`${index}번째 옵션`}</Typography>
              <TextField
                variant="standard"
                value={option}
                disabled={true}
              ></TextField>
            </Box>
          )
        })}
      </Box>
    )
  } else if (data.type === '주관식') {
    return (
      <TextField
        variant="standard"
        value={data.type}
        disabled={true}
      ></TextField>
    )
  } else if (data.type === '체크박스') {
    return (
      <Box>
        <FormGroup sx={{ paddingLeft: '10px' }}>
          {data.optionList.map((option, index) => {
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
  } else if (data.type === '선형배율') {
    return (// 미완성 수정예정
      <Box>
        {/* {data.optionList.map((option, index) => {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              console.log(option) console.log(index)
            </Box>
          )
        })} */}
        <Typography>최소값</Typography>
        <TextField
          variant="standard"
          value={data.optionList[0]}
          disabled={true}
        ></TextField>
        <Typography>최대값</Typography>
        <TextField
          variant="standard"
          value={data.optionList[1]}
          disabled={true}
        ></TextField>
      </Box>
    )
  }
}

export default Answers
