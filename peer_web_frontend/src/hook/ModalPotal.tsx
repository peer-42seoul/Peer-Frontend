import { createPortal } from 'react-dom'

interface ModalPortalProps {
  children: React.ReactNode
}

export const ModalPortal = ({ children }: ModalPortalProps) => {
  const modalRoot = document.getElementById('modal-root')

  return modalRoot ? createPortal(children, modalRoot) : null
}
