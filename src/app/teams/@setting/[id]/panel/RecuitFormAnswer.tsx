import { Typography } from '@mui/material'
import {
  CheckQuestionList,
  CloseQuestionList,
  IInterview,
  RatioQuestionList,
} from '../page'
import CloseQuestionForm from '@/app/recruit/[id]/panel/CloseQuestionForm'
import RatioQuestionForm from '@/app/recruit/[id]/panel/RatioQuestionForm'
import CheckQuestionForm from '@/app/recruit/[id]/panel/CheckQuestionForm'
import { useForm } from 'react-hook-form'

const FormAnswer = ({
  interview,
  index,
}: {
  interview: IInterview
  index: number
}) => {
  const { control } = useForm()
  return (
    <>
      {interview.type === 'open' && <Typography>{interview.answer}</Typography>}
      {interview.type === 'close' && (
        <CloseQuestionForm
          optionList={interview?.optionList as CloseQuestionList}
          control={control}
          idx={index}
          value={interview.answer}
          disabled={true}
        />
      )}
      {interview.type === 'ratio' && (
        <RatioQuestionForm
          optionList={interview?.optionList as RatioQuestionList}
          control={control}
          idx={index}
          value={interview.answer}
          disabled={true}
        />
      )}
      {interview.type === 'check' && (
        <CheckQuestionForm
          optionList={interview?.optionList as CheckQuestionList}
          control={control}
          idx={index}
          disabled={true}
          value={interview.answer}
        />
      )}
    </>
  )
}

export default FormAnswer
