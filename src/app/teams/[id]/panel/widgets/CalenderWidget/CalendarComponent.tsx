import { DateHeaderProps, ToolbarProps } from 'react-big-calendar'
import dayjs from 'dayjs'
import { IconButton, Stack } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import { ChevronLeft, ChevronRight } from '@/icons'
import { IEvent } from '@/types/WidgetDataTypes'

interface ICustomDateHeaderProps extends DateHeaderProps {
  events?: IEvent[]
}

// Toolbar : 상단 달 표시 컴포넌트
export const MiniToolbar = (props: ToolbarProps) => {
  const { date } = props

  return (
    <div className="rbc-toolbar">
      <span className="rbc-toolbar-label">{dayjs(date).format('MMMM')}</span>
    </div>
  )
}

export const LargeToolbar = (props: ToolbarProps) => {
  const { date, onNavigate } = props
  return (
    <Stack
      direction={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      spacing={'1rem'}
      className="rbc-toolbar"
    >
      <IconButton
        className={'rbc-toolbar-button'}
        onClick={() => onNavigate('PREV')}
      >
        <ChevronLeft />
      </IconButton>
      <span className="rbc-toolbar-label">{dayjs(date).format('MMMM')}</span>
      <IconButton
        className={'rbc-toolbar-button'}
        onClick={() => onNavigate('NEXT')}
      >
        <ChevronRight />
      </IconButton>
    </Stack>
  )
}

// 날짜 칸 컴포넌트 (기본 스타일 제거용)
export const DayCell = () => {
  return <div className="rbc-day-bg" />
}

export const MiniDateHeader = (props: ICustomDateHeaderProps) => {
  const { date } = props
  const isEventDay = props.events?.some(
    (event) =>
      dayjs(event.start).isSame(date, 'day') ||
      dayjs(event.end).isSame(date, 'day'),
  )
  return (
    <Stack alignItems={'center'} justifyContent={'center'}>
      {date.getDate()}
      {isEventDay ? <CircleIcon className="event-icon" /> : null}
    </Stack>
  )
}

export const LargeDateHeader = (props: ICustomDateHeaderProps) => {
  const { onDrillDown } = props
  return (
    <button onClick={onDrillDown} className="rbc-button-link">
      <MiniDateHeader {...props} />
    </button>
  )
}

// 캘린더에서는 이벤트에 대한 상세 정보를 보여주지 않음.
export const DayEvent = () => {
  return null
}
