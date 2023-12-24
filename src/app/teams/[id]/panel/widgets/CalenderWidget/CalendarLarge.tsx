import { useCallback, useMemo, useState } from 'react'
import { DateHeaderProps, Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import { Box, Stack } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import { IEvent } from '@/types/WidgetDataTypes'
import { LargeToolbar, LargeDayEvent } from '../../CalendarComponent'
import '../style/CalendarLarge.scss'

const localizer = dayjsLocalizer(dayjs)

interface ICalendarLargeProps {
  events?: IEvent[]
  onDrillDown: (date: Date) => void
}

const CalendarLarge = ({ events, onDrillDown }: ICalendarLargeProps) => {
  const [currentMonth, setCurrentMonth] = useState<Number>(
    new Date().getMonth(),
  )
  const formats = useMemo(
    () => ({
      weekdayFormat: (date: Date) => dayjs(date).format('ddd').toUpperCase(),
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
          const isEventDay = events?.some(
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

  const styleEvent = useCallback(
    (event: IEvent) => {
      // 현재 선택된 달의 이벤트만 표시
      if (event.start?.getMonth() !== currentMonth) {
        return {
          style: {
            display: 'none',
          },
        }
      }
      return {
        style: {
          color: 'white',
        },
      }
    },
    [currentMonth],
  )

  const onNavigate = useCallback(
    (currentDate: Date) => {
      if (currentDate.getMonth() !== currentMonth) {
        setCurrentMonth(currentDate.getMonth())
      }
    },
    [currentMonth],
  )

  return (
    <Box sx={{ height: '600px', width: '500px' }} className={'calendar-large'}>
      <Calendar
        localizer={localizer}
        formats={formats}
        components={components}
        events={events}
        eventPropGetter={styleEvent}
        // onSelectEvent={onSelectedEvent}
        onDrillDown={onDrillDown}
        onNavigate={onNavigate}
      />
    </Box>
  )
}

export default CalendarLarge
