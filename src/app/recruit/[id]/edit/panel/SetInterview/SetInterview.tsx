import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import AreaForAddInterviewForm from './AreaForAddInterviewForm'
import AreaForShowAnswers from './AreaForShowAnswers'
import { Button, Container, Stack } from '@mui/material'
import { IFormInterview } from '@/types/IPostDetail'
import CloseIcon from '@mui/icons-material/Close'
import useMedia from '@/hook/useMedia'

/**
 * [컴포넌트 구조]
 * SetInterview
 * - AreaForAddInterviewForm (질문과 답변 칸 만들기)
 *   - SelectInterviewType (답변 타입 설정)
 *   - WriteAnswers (답변 작성칸)
 * - AreaForShowAnswers (만들어진 질문 답변 칸 보기)
 *   - Answers
 */

const style_Container = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '57rem',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll',
  padding: '1rem, 1.25rem, 1rem, 1.25rem',
}
const mobile_Container = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
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
  const [formType, setFormType] = useState<string>('OPEN')
  const [answer, setAnswer] = useState<string[]>([])
  const { isPc } = useMedia()

  return (
    <Modal
      open={openBasicModal}
      onClose={handleCloseBasicModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container sx={isPc ? style_Container : mobile_Container}>
        <Stack gap={'1.5rem'}>
          {/* 최상단 라벨 칸 */}
          <Stack direction={'row'}>
            <Box sx={{ width: '4%' }} />
            <Stack sx={{ width: '92%' }}>
              <Typography
                align="center"
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                인터뷰 작성
              </Typography>
            </Stack>
            <Button
              sx={{ width: '4%' }}
              onClick={() => {
                handleCloseBasicModal
              }}
            >
              <CloseIcon color="primary" />
            </Button>
          </Stack>
          {/* 질문과 답변 칸 만들기 */}
          <AreaForAddInterviewForm
            question={question}
            setQuestion={setQuestion}
            formType={formType}
            setFormType={setFormType}
            answer={answer}
            setAnswer={setAnswer}
            setInterviewData={setInterviewData}
          />
          {/* 만들어진 질문 답변 칸 보기 */}
          <AreaForShowAnswers
            interviewData={interviewData}
            setInterviewData={setInterviewData}
          />
        </Stack>
      </Container>
    </Modal>
  )
}

export default SetInterview
