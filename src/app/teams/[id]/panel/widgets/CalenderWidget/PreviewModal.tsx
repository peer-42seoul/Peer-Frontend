'use client'
import { ReactNode } from 'react'
import dayjs from 'dayjs'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import { PlusIcon } from '@/icons'
import CuModal from '@/components/CuModal'
import { IEvent } from '@/types/WidgetDataTypes'
import CalendarLarge from './CalendarLarge'
import { isPastEvent, useCalendar } from './utils'
import * as style from './PreviewModal.style'

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
  const { selectedDate, setSelectedDate, todayEvents, isEmpty } =
    useCalendar(events)
  return (
    <CuModal sx={style.modal} open={open} onClose={onClose} title={'캘린더'}>
      <Stack sx={style.modalContent}>
        <CalendarLarge
          events={events}
          onDrillDown={(date: Date) => setSelectedDate(dayjs(date))}
        />
        <Box>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={style.eventListHeader}
          >
            <Typography
              variant={'Body1Emphasis'}
              color={'text.strong'}
            >{`${selectedDate.format('M.D')} 일정`}</Typography>
            <IconButton>
              <PlusIcon width={'1.25rem'} height={'1.25rem'} />
            </IconButton>
          </Stack>
          <Stack>
            {isEmpty ? (
              <Typography variant={'Body2'} color={'text.alternative'}>
                등록된 일정이 없습니다.
              </Typography>
            ) : (
              <Stack spacing={'0.5rem'}>
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
    </CuModal>
  )
}

const EventItem = ({ title, start, end }: IEventItem) => {
  if (!start || !end) return null
  const isPast = isPastEvent(end)
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={'0.5rem'}>
      <CircleIcon
        sx={{
          ...style.eventItemIcon,
          color: isPast ? 'text.assistive' : 'text.strong',
        }}
      />
      <Typography
        variant={'Body2'}
        color={isPast ? 'text.assistive' : 'text.strong'}
        sx={style.eventItemText}
      >
        {title}
      </Typography>
      <Typography
        variant={'Caption'}
        color={isPast ? 'text.assistive' : 'text.alternative'}
        sx={style.eventItemTime}
      >
        {`${dayjs(start).format('HH:mm')}-${dayjs(end).format('HH:mm')}`}
      </Typography>
    </Stack>
  )
}

export default PreviewModal
