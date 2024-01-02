import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import Answers from './Answers'
import { IFormInterview } from '@/types/IPostDetail'

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
    <Stack gap={'1.5rem'}>
      {interviewData.map((data, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              border: 1,
              borderBottom: '1.5rem',
              boxShadow: 1,
              borderRadius: '0.75rem',
              backgroundColor: 'background.secondary',
              padding: '1rem 1.25rem 1rem 1.25rem',
            }}
            gap={'1rem'}
          >
            <TextField
              variant="standard"
              value={data.question}
              disabled={true}
              sx={{ width: '70%' }}
            />
            <Answers data={data} />
            <Button
              onClick={() => {
                onHandlerRemove(index)
              }}
            >
              <Typography>삭제</Typography>
            </Button>
          </Box>
        )
      })}
    </Stack>
  )
}

export default AreaForShowAnswers
