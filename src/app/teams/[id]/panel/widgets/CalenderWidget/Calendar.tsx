import { useMemo } from 'react'
import dayjs from 'dayjs'
import {
  DateHeaderProps,
  Calendar as ReactBigCalendar,
  dayjsLocalizer,
} from 'react-big-calendar'
import { IEvent } from '@/types/WidgetDataTypes'
import * as Component from './CalendarComponent'

const localizer = dayjsLocalizer(dayjs)

interface ICalendarProps {
  size?: 'mini' | 'large'
  events?: IEvent[]
  onDrillDown?: (date: Date) => void
  onNavigate?: (date: Date) => void
}

const Calendar = ({
  size,
  events,
  onDrillDown,
  onNavigate,
}: ICalendarProps) => {
  const formats = useMemo(
    () => ({
      weekdayFormat: (date: Date) => dayjs(date).format('dd')[0],
    }),
    [],
  )
  const components = useMemo(
    () => ({
      toolbar:
        size === 'large' ? Component.LargeToolbar : Component.MiniToolbar,
      dateCellWrapper: Component.DayCell,
      month: {
        dateHeader: (props: DateHeaderProps) =>
          size === 'large' ? (
            <Component.LargeDateHeader {...props} events={events} />
          ) : (
            <Component.MiniDateHeader {...props} events={events} />
          ),
        event: Component.DayEvent,
      },
    }),
    [size],
  )
  return (
    <ReactBigCalendar
      localizer={localizer}
      formats={formats}
      components={components}
      events={events ?? []}
      onDrillDown={onDrillDown}
      onNavigate={onNavigate}
    />
  )
}

export default Calendar
