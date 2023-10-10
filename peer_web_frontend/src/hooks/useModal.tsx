import { useState } from 'react'

//  const { open, handleClose, handleOpenl } = useModal()
// ModalContainer 컴포넌트를 선언한 곳에서 위처럼 선언한 후 ModalContainer에 props로 넘겨주면 됩니다.

const useModal = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return { open, handleClose, handleOpen }
}

export default useModal
