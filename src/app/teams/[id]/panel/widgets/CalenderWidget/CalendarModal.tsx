'use client'
import { useEffect, useState } from 'react'
import CuModal from '@/components/CuModal'
import { ICuModalProps } from '@/types/ModalTypes'
import { IEvent } from '@/types/WidgetDataTypes'
import PreviewModalContent from './PreviewModalContent'
import EditModalContent from './EditModalContent'
import * as style from './CalendarModal.style'

interface IPreviewModalProps {
  open: boolean
  onClose: () => void
  events?: IEvent[]
  teamId: number
}

interface IModalData {
  type: TCalendarModalType
  teamId: number
  eventId?: number
  widgetId?: string
}

type TCalendarModalType = 'preview' | 'create'

const CalendarModal = ({
  open,
  onClose,
  events,
  teamId,
}: IPreviewModalProps) => {
  const [modalData, setModalData] = useState<IModalData>({
    type: 'preview',
    teamId,
  })
  useEffect(() => {
    setModalData({
      type: 'preview',
      teamId,
    })
  }, [open])
  switch (modalData.type) {
    case 'preview':
      return (
        <CalendarModalContainer open={open} onClose={onClose} title={'캘린더'}>
          <PreviewModalContent
            events={events}
            openNewModal={() =>
              setModalData((prev) => ({ ...prev, type: 'create' }))
            }
          />
        </CalendarModalContainer>
      )
    case 'create':
      return (
        <CalendarModalContainer
          open={open}
          onClose={onClose}
          title={'새로운 일정'}
          textButton={{
            text: '취소',
            onClick: () =>
              setModalData((prev) => ({
                type: 'preview',
                teamId: prev.teamId,
              })),
          }}
          containedButton={{
            text: '완료',
            type: 'submit',
            form: 'calender-form',
          }}
        >
          <EditModalContent
            teamId={modalData.teamId}
            eventId={modalData.eventId}
            widgetId={modalData.widgetId}
            mode={'create'}
          />
        </CalendarModalContainer>
      )
    default:
      return null
  }
}

const CalendarModalContainer = (props: ICuModalProps) => {
  return (
    <CuModal sx={style.modal} {...props}>
      <>{props.children}</>
    </CuModal>
  )
}

export default CalendarModal
