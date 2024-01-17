'use client'
import React from 'react'
import IconMenuItem from './IconMenuItem'
import * as style from './dropdownMenu.styles'
import { ReportIcon } from '@/icons'
import ReportModal from '../ReportModal'
import useModal from '@/hook/useModal'

const ReportMenuItem = ({ targetId }: { targetId: number }) => {
  const { isOpen, openModal, closeModal } = useModal()

  const handleReport = () => {
    openModal()
  }

  return (
    <>
      <IconMenuItem
        action={handleReport}
        icon={
          <ReportIcon
            sx={{ ...style.menuItemIconStyleBase, color: 'text.alternative' }}
          />
        }
        text={'신고'}
      />
      <ReportModal
        isModalOpen={isOpen}
        handleClose={closeModal}
        targetId={`${targetId}`}
      />
    </>
  )
}

export default ReportMenuItem
