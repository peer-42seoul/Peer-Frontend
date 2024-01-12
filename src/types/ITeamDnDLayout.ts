import { Layout } from 'react-grid-layout'

export type DateTimeArray = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
]

export interface ITeamDnDLayout {
  teamId: number
  type: string // teamPage, peerLog
  createdAt: Date | DateTimeArray
  updatedAt: Date | DateTimeArray // LocalDateTime
  widgets: IWidget[]
}

// 위젯의 데이터
//new Date
export interface IWidget {
  key: number
  size: SizeType // S/M/L
  grid: Layout // x,y,w,h
  type: WidgetType
  createdAt?: Date | DateTimeArray
  updatedAt?: Date | DateTimeArray
  data: any
}

export type WidgetType =
  | 'notice'
  | 'board'
  | 'calender'
  | 'attendance'
  | 'text'
  | 'image'
  | 'linkTable'

export type SizeType = 'S' | 'M' | 'L'
