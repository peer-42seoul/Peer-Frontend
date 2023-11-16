import { EventProps, ToolbarProps } from 'react-big-calendar'
import { IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { IEvent } from '@/types/WidgetDataTypes'

// Toolbar : 상단 달 표시 컴포넌트
export const MiniToolbar = (props: ToolbarProps) => {
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

// ============= 이벤트 mock data ==============
// TODO : api 연동 후 mock data 삭제

export const events: IEvent[] = [
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
