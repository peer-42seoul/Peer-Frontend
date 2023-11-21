import { Layout } from 'react-grid-layout'

export interface ITeamDnDLayout {
  teamId: number
  type: string // teamPage, peerLog
  createdAt: Date | number[]
  updatedAt: Date | number[] // LocalDateTime
  widgets: IWidget[]
}

// 위젯의 데이터
//new Date
export interface IWidget {
  key: number
  size: SizeType // S/M/L
  grid: Layout // x,y,w,h
  type: WidgetType
  createdAt?: Date | number[]
  updatedAt?: Date | number[]
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
