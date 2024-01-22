import { Modal } from '@mui/material'

const Prop = {
  open: boolean,
  onClose: () => void
}

const AnnounceModal = ({open, onClose} : Prop) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ></Modal>
    </>
  )
}

export default AnnounceModal
