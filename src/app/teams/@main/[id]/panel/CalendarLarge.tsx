'use client'
import { useCallback, useMemo } from 'react'
import {
  DateHeaderProps,
  ToolbarProps,
  Calendar,
  dayjsLocalizer,
  NavigateAction,
  EventProps,
} from 'react-big-calendar'
import dayjs from 'dayjs'
import { Box, Stack, IconButton } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { IEvent } from '@/types/WidgetDataTypes'
import '../style/CalendarLarge.scss'

const localizer = dayjsLocalizer(dayjs)

// ============= 이벤트 mock data ==============

const events: IEvent[] = [
  {
    id: 0,
    color: '#CB62D0',
    title: 'aaaaaaaaa',
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date(new Date().setMonth(new Date().getMonth() - 1)),
  },
  {
    id: 1,
    color: '#FFD976',
    title: 'bbbbbbbb',
    start: new Date(),
    end: new Date(),
  },
  {
    id: 2,
    color: '#CB62D0',
    title: 'cccccccc',
    start: new Date(new Date().setDate(new Date().getDate() + 5)),
    end: new Date(new Date().setDate(new Date().getDate() + 5)),
  },
  {
    id: 3,
    color: '#FFD976',
    title: 'dddddddd',
    start: new Date(new Date().setDate(new Date().getDate() + 5)),
    end: new Date(new Date().setDate(new Date().getDate() + 6)),
  },
  {
    id: 4,
    color: '#CB62D0',
    title: 'eeeeeeee',
    start: new Date(new Date().setDate(new Date().getDate() + 10)),
    end: new Date(new Date().setDate(new Date().getDate() + 10)),
  },
]

// ============= 위젯 뷰 커스텀 컴포넌트 ==============

// 상단 달 표시 컴포넌트

const Toolbar = (props: ToolbarProps) => {
  const { date, onNavigate } = props
  return (
    <div className="rbc-toolbar">
      <IconButton onClick={() => onNavigate('PREV')}>
        <ArrowBackIosIcon />
      </IconButton>
      <span className="rbc-toolbar-label">{`${date.getMonth() + 1}월`}</span>
      <IconButton onClick={() => onNavigate('NEXT')}>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  )
}

// 날짜 (숫자) 컴포넌트 (Mini와 100% 동일. 디자인, 기능에 따라 합칠 수 있다면 합칠 예정)
const DateHeader = (props: DateHeaderProps) => {
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
}

// 이벤트 컴포넌트

const DayEvent = (props: EventProps) => {
  return (
    <div className="rbc-event">
      <div className="rbc-event-content">{props.title}</div>
    </div>
  )
}

// ===============================================

const CalendarLarge = () => {
  const formats = useMemo(
    () => ({
      // 요일 표시 포맷
      weekdayFormat: (date: Date) =>
        ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()],
    }),
    [],
  )

  const components = useMemo(
    () => ({
      toolbar: Toolbar,
      month: { dateHeader: DateHeader, event: DayEvent },
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
      />
    </Box>
  )
}

export default CalendarLarge
