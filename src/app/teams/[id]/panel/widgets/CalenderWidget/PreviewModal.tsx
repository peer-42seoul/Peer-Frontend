'use client'
import { ReactNode } from 'react'
import dayjs from 'dayjs'
import { Box, IconButton, Modal, Stack, Typography } from '@mui/material'
import Circle from '@mui/icons-material/Circle'
import useMedia from '@/hook/useMedia'
import { PlusIcon } from '@/icons'
import { IEvent } from '@/types/WidgetDataTypes'
import CalendarLarge from './CalendarLarge'
import { isPastEvent, useCalendar } from './utils'
import * as modalStyle from '@/components/CuModal.style'

interface IPreviewModalProps {
  open: boolean
  onClose: () => void
  events?: IEvent[]
}

interface IEventItem {
  title: ReactNode
  start: Date | undefined
  end: Date | undefined
}

const PreviewModal = ({ open, onClose, events }: IPreviewModalProps) => {
  const { isPc } = useMedia()
  const { selectedDate, setSelectedDate, todayEvents, isEmpty } =
    useCalendar(events)
  const modalWrapperStyle = isPc
    ? modalStyle.pcWrapper
    : modalStyle.mobileWrapper
  return (
    <Modal open={open} onClose={onClose} keepMounted>
      <Stack sx={modalWrapperStyle}>
        <CalendarLarge
          events={events}
          onDrillDown={(date: Date) => setSelectedDate(dayjs(date))}
        />
        <Box>
          <Stack>
            <Typography>{`${selectedDate.format('M.D')} 일정`}</Typography>
            <IconButton>
              <PlusIcon />
            </IconButton>
          </Stack>
          <Stack>
            {isEmpty ? (
              <Typography>등록된 일정이 없습니다.</Typography>
            ) : (
              <Stack>
                {todayEvents?.map((event) => (
                  <EventItem
                    key={event.id}
                    title={event.title}
                    start={event.start}
                    end={event.end}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
    </Modal>
  )
}

const EventItem = ({ title, start, end }: IEventItem) => {
  if (!start || !end) return null
  const isPast = isPastEvent(end)
  const fontColor = isPast ? 'text.assertive' : 'text.normal'
  return (
    <Stack>
      <Circle />
      <Typography color={fontColor}>{title}</Typography>
      <Typography color={fontColor}>
        {`${dayjs(start).format('HH:mm')}-${dayjs(end).format('HH:mm')}`}
      </Typography>
    </Stack>
  )
}

export default PreviewModal
