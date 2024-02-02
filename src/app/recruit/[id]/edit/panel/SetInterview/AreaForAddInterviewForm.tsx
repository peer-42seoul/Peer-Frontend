import { Button, Stack, TextField, Typography } from '@mui/material'
import { SelectInterviewType } from './SelectInterviewType'
import WriteAnswers from './WriteAnswers'
import { Dispatch, SetStateAction, useState } from 'react'
import { IFormInterview } from '@/types/IPostDetail'
import AddIcon from '@mui/icons-material/Add'
import useMedia from '@/hook/useMedia'

const QuestionCard = {
  border: 1,
  borderRadius: '0.75rem',
  boxShadow: 1,
  backgroundColor: 'background.secondary',
  padding: '1rem 1.25rem 1rem 1.25rem',
}

const AddQuestionButtonPc = {
  width: '6.8rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: '1rem',
  paddingRight: '1.38rem',
}

const AddQuestionButtonMobile = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: '1rem',
  paddingRight: '1.38rem',
}

const AreaForAddInterviewForm = ({
  question,
  setQuestion,
  formType,
  setFormType,
  answer,
  setAnswer,
  interviewData,
  setInterviewData,
}: {
  question: string
  setQuestion: Dispatch<SetStateAction<string>>
  formType: string
  setFormType: Dispatch<SetStateAction<string>>
  answer: string[]
  setAnswer: Dispatch<SetStateAction<string[]>>
  interviewData: IFormInterview[]
  setInterviewData: (value: Array<IFormInterview>) => void
}) => {
  const [option, setOption] = useState<string[]>([])
  const [max, setMax] = useState<string>('5')
  const [valueOfMin, setvalueOfMin] = useState<string>('')
  const [valueOfMax, setvalueOfMax] = useState<string>('')
  const { isPc } = useMedia()

  const onHandlerEditQuestion = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuestion(event.target.value as string)
  }

  const onHandlerAddQuestion = () => {
    switch (formType) {
      case 'RATIO': {
        if (
          question === '' ||
          max === '' ||
          valueOfMin === '' ||
          valueOfMax === ''
        ) {
          alert('모든 값을 입력해주세요')
          return
        }
        setInterviewData([
          ...interviewData,
          {
            question: question,
            type: formType,
            // ratioList: { max, valueOfMin, valueOfMax },
            optionList: [max, valueOfMin, valueOfMax],
          },
        ])
        setQuestion('')
        setFormType('OPEN')
        setOption([])
        setMax('5')
        setvalueOfMin('')
        setvalueOfMax('')
        return
      }
      case 'OPEN': {
        if (question === '') {
          alert('모든 값을 입력해주세요')
          return
        }
        break
      }
      default: {
        if (question === '' || formType === '' || option.length === 0) return
      }
    }
    setInterviewData([
      ...interviewData,
      {
        question: question,
        type: formType,
        optionList: option,
      },
    ])
    setQuestion('')
    setFormType('OPEN')
    setOption([])
  }

  return (
    <Stack sx={QuestionCard} gap={'1rem'}>
      {/* 질문 분류 선택 */}
      <SelectInterviewType formType={formType} setFormType={setFormType} />
      {/* 질문란 작성 */}
      <TextField
        variant="standard"
        value={question}
        onChange={onHandlerEditQuestion}
        placeholder="질문을 입력해주세요."
        sx={{ width: '70%' }}
      />
      {/* 답변란 작성 */}
      <Stack gap={'0.5rem'}>
        {/* 질문 분류에 따른 답변 종류 */}
        <WriteAnswers
          answer={answer}
          setAnswer={setAnswer}
          formType={formType}
          option={option}
          setOption={setOption}
          max={max}
          setMax={setMax}
          valueOfMin={valueOfMin}
          setvalueOfMin={setvalueOfMin}
          valueOfMax={valueOfMax}
          setvalueOfMax={setvalueOfMax}
        />
        {/* 질문 추가 버튼 */}
        <Button
          sx={isPc ? AddQuestionButtonPc : AddQuestionButtonMobile}
          variant="outlined"
          onClick={onHandlerAddQuestion}
        >
          <AddIcon
            sx={{ color: 'primary', width: '1.25rem', height: '1.25rem' }}
          />
          <Typography fontSize={'0.75rem'} color={'primary'}>
            질문 추가
          </Typography>
        </Button>
      </Stack>
    </Stack>
  )
}

export default AreaForAddInterviewForm
