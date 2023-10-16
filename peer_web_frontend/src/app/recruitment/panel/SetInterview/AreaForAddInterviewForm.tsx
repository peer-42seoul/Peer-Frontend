import { Box, Button, TextField, Typography } from '@mui/material'
import { SelectInterviewType } from './SelectInterviewType'
import WriteAnswers from './WriteAnswers'
import { Dispatch, SetStateAction, useState } from 'react'
import { IFormInterview } from '@/app/recruitment/page'

const AreaForAddInterviewForm = ({
  question,
  setQuestion,
  formType,
  setFormType,
  answer,
  setAnswer,
  setInterviewData,
}: {
  question: string
  setQuestion: Dispatch<SetStateAction<string>>
  formType: string
  setFormType: Dispatch<SetStateAction<string>>
  answer: string[]
  setAnswer: Dispatch<SetStateAction<string[]>>
  setInterviewData: Dispatch<SetStateAction<IFormInterview[]>>
}) => {
  const [option, setOption] = useState<string[]>([])
  // const [max, setMax] = useState<string>('')
  const [valueOfMin, setvalueOfMin] = useState<string>('')
  const [valueOfMax, setvalueOfMax] = useState<string>('')

  const onHandlerEditQuestion = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuestion(event.target.value as string)
  }

  const onHandlerAddQuestion = () => {
    if (
      question === '' ||
      formType === '' ||
      (formType !== '주관식' && option.length === 0)
    )
      return
    setInterviewData((prev) => [
      ...prev,
      {
        question: question,
        type: formType,
        optionList: option,
      },
    ])
    setQuestion('')
    setFormType('주관식')
    setOption([])
  }

  return (
    <Box sx={{ border: 1, borderRadius: 2, boxShadow: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography>질문</Typography>
          <TextField
            variant="outlined"
            value={question}
            onChange={onHandlerEditQuestion}
          />
          <SelectInterviewType formType={formType} setFormType={setFormType} />
        </Box>
        <Box>
          <Typography>답변</Typography>
          <WriteAnswers
            answer={answer}
            setAnswer={setAnswer}
            formType={formType}
            option={option}
            setOption={setOption}
            // max={max}
            // setMax={setMax}
            valueOfMin={valueOfMin}
            setvalueOfMin={setvalueOfMin}
            valueOfMax={valueOfMax}
            setvalueOfMax={setvalueOfMax}
          />
        </Box>
      </Box>
      <Button variant="outlined" onClick={onHandlerAddQuestion}>
        인터뷰 질문 추가하기
      </Button>
    </Box>
  )
}

export default AreaForAddInterviewForm
