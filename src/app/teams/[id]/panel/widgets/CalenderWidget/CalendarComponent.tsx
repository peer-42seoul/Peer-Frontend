import { DateHeaderProps, EventProps, ToolbarProps } from 'react-big-calendar'
import dayjs from 'dayjs'
import { IconButton, Stack } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CircleIcon from '@mui/icons-material/Circle'
import { IEvent } from '@/types/WidgetDataTypes'

interface IMiniDateHeaderProps extends DateHeaderProps {
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

// 날짜 칸 컴포넌트 (기본 스타일 제거용)
export const MiniDayCell = () => {
  return <div className="rbc-day-bg" />
}

export const MiniDateHeader = (props: IMiniDateHeaderProps) => {
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

// 위젯에서는 이벤트에 대한 상세 정보를 보여주지 않음.
export const MiniDayEvent = () => {
  return null
}

// 이벤트 컴포넌트

export const LargeDayEvent = (props: EventProps) => {
  return (
    <div className="rbc-event">
      <div className="rbc-event-content">{props.title}</div>
    </div>
  )
}
