import { Typography } from '@mui/material'
import {
  CheckQuestionList,
  CloseQuestionList,
  EInterviewType,
  IInterview,
  RatioQuestionList,
} from '../../../types/types'
import CloseQuestionForm from '@/app/recruit/[id]/panel/form/CloseQuestionForm'
import RatioQuestionForm from '@/app/recruit/[id]/panel/form/RatioQuestionForm'
import CheckQuestionForm from '@/app/recruit/[id]/panel/form/CheckQuestionForm'
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
      {interview.type === EInterviewType.OPEN && (
        <Typography>{interview.answer}</Typography>
      )}
      {interview.type === EInterviewType.CLOSE && (
        <CloseQuestionForm
          optionList={interview?.optionList as CloseQuestionList}
          control={control}
          idx={index}
          value={interview.answer}
          disabled={true}
        />
      )}
      {interview.type === EInterviewType.RATIO && (
        <RatioQuestionForm
          optionList={interview?.optionList as RatioQuestionList}
          control={control}
          idx={index}
          value={interview.answer}
          disabled={true}
        />
      )}
      {interview.type === EInterviewType.CHECK && (
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
