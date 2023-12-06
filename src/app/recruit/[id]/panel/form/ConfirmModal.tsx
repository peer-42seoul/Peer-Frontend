import CuTextModal from '@/components/CuTextModal'
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
    <CuTextModal
      open={open}
      onClose={() => setOpen(false)}
      title={'지원서 제출'}
      containedButton={{
        text: '확인',
        onClick: () => {
          submitForm()
          setOpen(false)
        },
        isLoading: isLoading,
      }}
      textButton={{
        text: '취소',
        onClick: () => setOpen(false),
      }}
      content={'지원서를 제출하시겠습니까?'}
      sx={{ zIndex: 1450 }}
    />
  )
}

export default ConfirmModal
