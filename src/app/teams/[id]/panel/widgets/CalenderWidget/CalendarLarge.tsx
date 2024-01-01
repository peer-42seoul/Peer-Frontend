import { useCallback, useState } from 'react'
import { Box } from '@mui/material'
import { IEvent } from '@/types/WidgetDataTypes'
import useMedia from '@/hook/useMedia'
import Calendar from './Calendar'
import * as style from './CalendarLarge.style'
import './CalendarLarge.scss'

interface ICalendarLargeProps {
  events?: IEvent[]
  onDrillDown: (date: Date) => void
}

const CalendarLarge = ({ events, onDrillDown }: ICalendarLargeProps) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  )
  const { isPc } = useMedia()

  const onNavigate = useCallback(
    (currentDate: Date) => {
      if (currentDate.getMonth() !== currentMonth) {
        setCurrentMonth(currentDate.getMonth())
      }
    },
    [currentMonth],
  )

  return (
    <Box
      sx={isPc ? style.pcCalendar : style.mobileCalendar}
      className={'calendar-large'}
    >
      <Calendar
        size={'large'}
        events={events}
        onDrillDown={onDrillDown}
        onNavigate={onNavigate}
      />
    </Box>
  )
}

export default CalendarLarge
