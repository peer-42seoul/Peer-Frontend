// Note - 캘린더 위젯 (Large) 테스트 컴포넌트
import { useEffect, useState } from 'react'
// import { IEvent } from '@/types/WidgetDataTypes'
import CalendarLarge from './widgets/CalenderWidget/CalendarLarge'
import { Stack, Typography } from '@mui/material'

const CalendarLargeTest = () => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  // const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null)
  useEffect(() => {
    setSelectedDate(new Date())
  }, [])
  return (
    <Stack>
      <CalendarLarge
        // onSelectedEvent={setSelectedEvent}
        onDrillDown={setSelectedDate}
      />
      <Typography>{selectedDate?.toString()}</Typography>
      {/* <Typography>{selectedEvent?.title}</Typography> */}
    </Stack>
  )
}

export default CalendarLargeTest
