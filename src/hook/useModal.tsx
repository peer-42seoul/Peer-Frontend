import { useState } from 'react'
import ModalCustom from '@/components/ModalCustom'

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return { ModalCustom, isOpen, openModal, closeModal }
}

export default useModal
