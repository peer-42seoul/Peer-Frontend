import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import AreaForAddInterviewForm from './AreaForAddInterviewForm'
import AreaForShowAnswers from './AreaForShowAnswers'
import { Stack } from '@mui/material'
import { IFormInterview } from '@/types/IPostDetail'

/**
 * [컴포넌트 구조]
 * SetInterview
 * - AreaForAddInterviewForm (질문과 답변 칸 만들기)
 *   - SelectInterviewType (답변 타입 설정)
 *   - WriteAnswers (답변 작성칸)
 * - AreaForShowAnswers (만들어진 질문 답변 칸 보기)
 *   - Answers
 */

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll',
}

export const SetInterview = ({
  openBasicModal,
  handleCloseBasicModal,
  interviewData,
  setInterviewData,
}: {
  openBasicModal: boolean
  handleCloseBasicModal: () => void
  interviewData: IFormInterview[]
  setInterviewData: React.Dispatch<React.SetStateAction<IFormInterview[]>>
}) => {
  const [question, setQuestion] = useState<string>('')
  const [formType, setFormType] = useState<string>('주관식')
  const [answer, setAnswer] = useState<string[]>([])

  return (
    <Stack>
      <Modal
        open={openBasicModal}
        onClose={handleCloseBasicModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            모집 인터뷰 등록하기
          </Typography>
          <AreaForAddInterviewForm
            question={question}
            setQuestion={setQuestion}
            formType={formType}
            setFormType={setFormType}
            answer={answer}
            setAnswer={setAnswer}
            setInterviewData={setInterviewData}
          />
          <AreaForShowAnswers
            interviewData={interviewData}
            setInterviewData={setInterviewData}
          />
        </Box>
      </Modal>
    </Stack>
  )
}

export default SetInterview
