import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import AreaForAddInterviewForm from './AreaForAddInterviewForm'
import AreaForShowAnswers from './AreaForShowAnswers'
import { IFormInterview } from '@/types/IPostDetail'

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
}: {
  openBasicModal: boolean
  handleCloseBasicModal: () => void
}) => {
  const [interviewData, setInterviewData] = useState<IFormInterview[]>([])
  const [question, setQuestion] = useState<string>('')
  const [formType, setFormType] = useState<string>('주관식')
  const [answer, setAnswer] = useState<string[]>([])

  useEffect(() => {
    console.log('interviewData :', interviewData)
  }, [interviewData])

  return (
    <div>
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
    </div>
  )
}

export default SetInterview
