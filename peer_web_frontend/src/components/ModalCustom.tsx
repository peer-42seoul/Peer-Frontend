import { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'

const ModalCustom = ({ children }: { children: ReactNode }) => {
  const el = document.createElement('div')

  const modalRoot = document.getElementById('modal-root')
  useEffect(() => {
    if (!modalRoot) return
    modalRoot.appendChild(el)

    return () => {
      modalRoot.removeChild(el)
    }
  }, [el])

  return ReactDOM.createPortal(children, el)
}

export default ModalCustom
