import { useMemo } from 'react'
import {
  DateHeaderProps,
  ToolbarProps,
  Calendar,
  dayjsLocalizer,
} from 'react-big-calendar'
import dayjs from 'dayjs'
import { Box, Stack } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import { IEvent } from '@/types/WidgetDataTypes'
import '../style/CalendarMini.scss'

const localizer = dayjsLocalizer(dayjs)

// ============= 이벤트 mock data ==============

const events: IEvent[] = [
  {
    id: 1,
    color: '#CB62D0',
    title: 'test',
    start: new Date(),
    end: new Date(),
  },
  {
    id: 2,
    color: '#CB62D0',
    title: 'test',
    start: new Date(),
    end: new Date(),
  },
  {
    id: 3,
    color: '#CB62D0',
    title: 'test',
    start: new Date(),
    end: new Date(),
  },
  {
    id: 4,
    color: '#CB62D0',
    title: 'test',
    start: new Date(),
    end: new Date(),
  },
]

// ============= 위젯 뷰 커스텀 컴포넌트 ==============

// 상단 달 표시 컴포넌트
function Toolbar(props: ToolbarProps) {
  const { date } = props

  return (
    <div className="rbc-toolbar">
      <span className="rbc-toolbar-label">
        {
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'Octobor',
            'November',
            'December',
          ][date.getMonth()]
        }
      </span>
    </div>
  )
}

// 날짜 칸 컴포넌트 (기본 스타일 제거용)
const DayCell = () => {
  return <div className="rbc-day-bg" />
}

// 날짜 (숫자) 컴포넌트
const DayHeader = (props: DateHeaderProps) => {
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

const DayEvent = () => {
  // 위젯에서는 이벤트에 대한 상세 정보를 보여주지 않음.
  return null
}

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
      toolbar: Toolbar,
      dateCellWrapper: DayCell,
      month: { dateHeader: DayHeader, event: DayEvent },
    }),
    [],
  )

  return (
    <Box sx={{ height: '300px' }}>
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
