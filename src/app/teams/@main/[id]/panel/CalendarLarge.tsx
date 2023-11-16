import { useCallback, useMemo } from 'react'
import { DateHeaderProps, Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import { Box, Stack } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import { IEvent } from '@/types/WidgetDataTypes'
import { LargeToolbar, LargeDayEvent, events } from './CalendarComponent'

import '../style/CalendarLarge.scss'

const localizer = dayjsLocalizer(dayjs)

interface ICalendarLargeProps {
  // events: IEvent[]
  onSelectedEvent: (event: IEvent | null) => void
  onDrillDown: (date: Date) => void
}

const CalendarLarge = ({
  onSelectedEvent,
  onDrillDown,
}: ICalendarLargeProps) => {
  const formats = useMemo(
    () => ({
      weekdayFormat: (date: Date) =>
        ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()],
    }),
    [],
  )

  const components = useMemo(
    () => ({
      toolbar: LargeToolbar,
      month: {
        dateHeader: (props: DateHeaderProps) => {
          const { date, onDrillDown } = props
          const today = new Date()
          const isToday = dayjs(date).isSame(today, 'day')
          const isEventDay = events.some(
            (event) =>
              dayjs(event.start).isSame(date, 'day') ||
              dayjs(event.end).isSame(date, 'day'),
          )
          return (
            <button onClick={onDrillDown} className="rbc-button-link">
              <Stack
                alignItems={'center'}
                justifyContent={'center'}
                className={`${isToday ? 'is-today' : ''}`}
              >
                {date.getDate()}
                {isEventDay ? <CircleIcon className="event-icon" /> : null}
              </Stack>
            </button>
          )
        },
        event: LargeDayEvent,
      },
    }),
    [],
  )

  const coloredEvents = useCallback((event: IEvent) => {
    return {
      style: {
        backgroundColor: event.color,
        color: 'white',
      },
    }
  }, [])

  return (
    <Box sx={{ height: '600px', width: '500px' }} className={'calendar-large'}>
      <Calendar
        localizer={localizer}
        formats={formats}
        components={components}
        events={events}
        eventPropGetter={coloredEvents}
        onSelectEvent={onSelectedEvent}
        onDrillDown={onDrillDown}
      />
    </Box>
  )
}

export default CalendarLarge
