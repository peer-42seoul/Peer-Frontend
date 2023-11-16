import { useMemo } from 'react'
import { DateHeaderProps, Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import { Box, Stack } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import {
  MiniToolbar,
  MiniDayCell,
  MiniDayEvent,
  events,
} from './CalendarComponent'
import '../style/CalendarMini.scss'

const localizer = dayjsLocalizer(dayjs)

// ===============================================

const CalendarMini = () => {
  const formats = useMemo(
    () => ({
      // 요일 표시 포맷
      weekdayFormat: (date: Date) =>
        ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()],
    }),
    [],
  )
  const components = useMemo(
    () => ({
      toolbar: MiniToolbar,
      dateCellWrapper: MiniDayCell,
      month: {
        dateHeader: (props: DateHeaderProps) => {
          const { date } = props
          const today = new Date()
          const isToday = dayjs(date).isSame(today, 'day')
          const isEventDay = events.some(
            (event) =>
              dayjs(event.start).isSame(date, 'day') ||
              dayjs(event.end).isSame(date, 'day'),
          )
          return (
            <Stack
              alignItems={'center'}
              justifyContent={'center'}
              className={`rbc-day-header ${isToday ? 'is-today' : ''}`}
            >
              {date.getDate()}
              {isEventDay ? <CircleIcon className="event-icon" /> : null}
            </Stack>
          )
        },
        event: MiniDayEvent,
      },
    }),
    [],
  )

  return (
    <Box sx={{ height: '300px' }} className={'calendar-mini'}>
      <Calendar
        localizer={localizer}
        formats={formats}
        components={components}
        events={events}
      />
    </Box>
  )
}

export default CalendarMini
