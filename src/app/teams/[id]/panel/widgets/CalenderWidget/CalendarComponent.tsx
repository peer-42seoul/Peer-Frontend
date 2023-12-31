import { EventProps, ToolbarProps } from 'react-big-calendar'
import dayjs from 'dayjs'
import { IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

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
