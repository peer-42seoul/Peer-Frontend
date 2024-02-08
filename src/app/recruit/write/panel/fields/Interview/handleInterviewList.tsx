import { IFormInterview } from '@/types/IPostDetail'
import { IFormInterviewField } from '@/types/IRecruitWriteField'

export const fieldToForm = (interviewList: IFormInterviewField[]) => {
  const newInterviewList: IFormInterview[] = interviewList.map((interview) => {
    return {
      question: interview.question,
      type: interview.type,
      optionList: interview.optionList.map((option) => {
        return option.option
      }),
    }
  })
  return newInterviewList
}

export const formToField = (interviewList: IFormInterview[]) => {
  const newInterviewList: IFormInterviewField[] = interviewList.map(
    (interview) => {
      return {
        question: interview.question,
        type: interview.type,
        optionList: interview.optionList.map((option) => {
          return { option: option }
        }),
      }
    },
  )
  return newInterviewList
}
