import { Box, Button, TextField, Typography } from '@mui/material'
import Answers from './Answers'
import { IFormInterview } from './SetInterview'

const AreaForShowAnswers = ({
  interviewData,
  setInterviewData,
}: {
  interviewData: IFormInterview[]
  setInterviewData: React.Dispatch<React.SetStateAction<IFormInterview[]>>
}) => {
  const onHandlerRemove = (index: number) => () => {
    setInterviewData(interviewData.filter((_, i) => i !== index))
  }

  return (
    <Box sx={{ border: 1, borderRadius: 2, boxShadow: 1 }}>
      {interviewData.map((data, index) => {
        return (
          <Box
            key={index}
            sx={{
              border: 1,
              borderRadius: 2,
              boxShadow: 1,
              padding: `10px`,
            }}
          >
            <Box key={index}>
              <Typography>{`${index}번째 질문`}</Typography>
              <TextField
                variant="standard"
                value={data.question}
                disabled={true}
              ></TextField>
              <Typography>답변 유형</Typography>
              <Answers data={data} index={index} />
            </Box>
            <Button onClick={onHandlerRemove(index)}>제거</Button>
          </Box>
        )
      })}
    </Box>
  )
}

export default AreaForShowAnswers
