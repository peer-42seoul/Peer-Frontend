import { useCallback, useState } from 'react'
import { Box } from '@mui/material'
import { IEvent } from '@/types/WidgetDataTypes'
import CustomCalendar from './CustomCalendar'
import './CalendarLarge.scss'

interface ICalendarLargeProps {
  events?: IEvent[]
  onDrillDown: (date: Date) => void
}

const CalendarLarge = ({ events, onDrillDown }: ICalendarLargeProps) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
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
      <CustomCalendar
        size={'large'}
        events={events}
        onDrillDown={onDrillDown}
        onNavigate={onNavigate}
      />
    </Box>
  )
}

export default CalendarLarge
