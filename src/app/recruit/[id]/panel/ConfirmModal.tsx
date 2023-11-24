import CuModal from '@/components/CuModal'
import LoadingButton from '@/components/LoadingButton'
import { Box, Typography, Button } from '@mui/material'
import { Dispatch } from 'react'

const ConfirmModal = ({
  open,
  setOpen,
  submitForm,
  isLoading,
}: {
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  submitForm: () => void
  isLoading: boolean
}) => {
  return (
    <CuModal
      open={open}
      handleClose={() => setOpen(false)}
      ariaTitle="modal-title"
      ariaDescription="modal-description"
      sx={{ zIndex: 1450 }}
    >
      <Box>
        <Typography variant="h4" id="modal-title">
          지원서 제출
        </Typography>
        <Typography id="modal-description">
          지원서를 제출하시겠습니까?
        </Typography>
        <Box>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            취소
          </Button>
          <LoadingButton
            variant="outlined"
            isLoading={isLoading}
            onClick={() => {
              submitForm()
              setOpen(false)
            }}
          >
            확인
          </LoadingButton>
        </Box>
      </Box>
    </CuModal>
  )
}

export default ConfirmModal
