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
  widgetKey: number | string
}

interface IModalData {
  type: TCalendarModalType
  teamId: number
  eventId?: number
  widgetKey: number | string
}

type TCalendarModalType = 'preview' | 'create'

const CalendarModal = ({
  open,
  onClose,
  events,
  teamId,
  widgetKey,
}: IPreviewModalProps) => {
  const [modalData, setModalData] = useState<IModalData>({
    type: 'preview',
    teamId,
    widgetKey,
  })
  useEffect(() => {
    setModalData({
      type: 'preview',
      teamId,
      widgetKey,
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
                widgetKey: prev.widgetKey,
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
            widgetKey={modalData.widgetKey}
            mode={'create'}
            closeEditModal={() =>
              setModalData((prev) => ({
                type: 'preview',
                teamId: prev.teamId,
                widgetKey: prev.widgetKey,
              }))
            }
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
