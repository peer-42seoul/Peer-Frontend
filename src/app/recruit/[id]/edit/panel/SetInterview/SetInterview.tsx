import { Dispatch, SetStateAction, useState } from 'react'
import AreaForAddInterviewForm from './AreaForAddInterviewForm'
import AreaForShowAnswers from './AreaForShowAnswers'
import { Stack } from '@mui/material'
import { IFormInterview } from '@/types/IPostDetail'
import CuModal from '@/components/CuModal'

/**
 * [컴포넌트 구조]
 * SetInterview
 * - AreaForAddInterviewForm (질문과 답변 칸 만들기)
 *   - SelectInterviewType (답변 타입 설정)
 *   - WriteAnswers (답변 작성칸)
 * - AreaForShowAnswers (만들어진 질문 답변 칸 보기)
 *   - Answers
 */

export const SetInterview = ({
  openBasicModal,
  handleCloseBasicModal,
  interviewData,
  setInterviewData,
}: {
  openBasicModal: boolean
  handleCloseBasicModal: Dispatch<SetStateAction<boolean>>
  interviewData: IFormInterview[]
  setInterviewData: (value: Array<IFormInterview>) => void
}) => {
  const [question, setQuestion] = useState<string>('')
  const [formType, setFormType] = useState<string>('OPEN')
  const [answer, setAnswer] = useState<string[]>([])

  return (
    <CuModal
      open={openBasicModal}
      onClose={() => {
        handleCloseBasicModal(false)
      }}
      title="인터뷰 작성"
      textButton={{
        text: '취소',
        onClick: () => {
          handleCloseBasicModal(false)
        },
      }}
      containedButton={{
        text: '작성',
        onClick: () => {
          handleCloseBasicModal(false)
        },
      }}
    >
      <Stack gap={'1.5rem'}>
        {/* 질문과 답변 칸 만들기 */}
        <AreaForAddInterviewForm
          question={question}
          setQuestion={setQuestion}
          formType={formType}
          setFormType={setFormType}
          answer={answer}
          setAnswer={setAnswer}
          interviewData={interviewData}
          setInterviewData={setInterviewData}
        />
        {/* 만들어진 질문 답변 칸 보기 */}
        <AreaForShowAnswers
          interviewData={interviewData}
          setInterviewData={setInterviewData}
        />
      </Stack>
    </CuModal>
  )
}

export default SetInterview
