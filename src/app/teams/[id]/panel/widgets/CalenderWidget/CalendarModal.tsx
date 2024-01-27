'use client'
import { ReactNode, useState } from 'react'
import CuModal from '@/components/CuModal'
import { IEvent } from '@/types/WidgetDataTypes'
import PreviewModalContent from './PreviewModalContent'
import * as style from './CalendarModal.style'

interface IPreviewModalProps {
  open: boolean
  onClose: () => void
  events?: IEvent[]
}

interface IContainerProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

type TCalendarModalType = 'preview' | 'create'

const CalendarModal = ({ open, onClose, events }: IPreviewModalProps) => {
  const [modalType, setModalType] = useState<TCalendarModalType>('preview')
  switch (modalType) {
    case 'preview':
      return (
        <CalendarModalContainer open={open} onClose={onClose} title={'캘린더'}>
          <PreviewModalContent
            events={events}
            openNewModal={() => setModalType('create')}
          />
        </CalendarModalContainer>
      )
    default:
      return null
  }
}

const CalendarModalContainer = ({
  open,
  onClose,
  children,
}: IContainerProps) => {
  return (
    <CuModal sx={style.modal} open={open} onClose={onClose} title={'캘린더'}>
      <>{children}</>
    </CuModal>
  )
}

export default CalendarModal
