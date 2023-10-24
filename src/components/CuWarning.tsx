'use clients'

import { Modal, SxProps, Box } from '@mui/material'

interface ICuModal {
  open: boolean
  handleClose: () => void
  children: React.ReactNode
  title: string
  description: string
  style: SxProps
}

const defaultstyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid red',
  boxShadow: 24,
  p: 4,
}

const CuWarning = ({
  open,
  handleClose,
  children,
  title,
  description,
  style = defaultstyle,
}: ICuModal) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={title}
        aria-describedby={description}
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </>
  )
}

export default CuWarning
