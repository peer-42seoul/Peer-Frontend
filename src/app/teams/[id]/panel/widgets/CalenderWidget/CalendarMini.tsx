import { useMemo } from 'react'
import { DateHeaderProps, Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import { Box, SxProps } from '@mui/material'
import { IEvent } from '@/types/WidgetDataTypes'
import {
  MiniToolbar,
  MiniDayCell,
  MiniDayEvent,
  MiniDateHeader,
} from './CalendarComponent'
import './CalendarMini.scss'

interface ICaledarMini {
  events?: IEvent[]
  sx?: SxProps
}

const localizer = dayjsLocalizer(dayjs)

const CalendarMini = ({ events, sx }: ICaledarMini) => {
  const formats = useMemo(
    () => ({
      weekdayFormat: (date: Date) => dayjs(date).format('dd')[0],
    }),
    [],
  )
  const components = useMemo(
    () => ({
      toolbar: MiniToolbar,
      dateCellWrapper: MiniDayCell,
      month: {
        dateHeader: (props: DateHeaderProps) => (
          <MiniDateHeader {...props} events={events} />
        ),
        event: MiniDayEvent,
      },
    }),
    [],
  )

  return (
    <Box sx={sx || { height: '300px' }} className={'calendar-mini'}>
      <Calendar
        localizer={localizer}
        formats={formats}
        components={components}
        events={events ?? []}
      />
    </Box>
  )
}

export default CalendarMini
