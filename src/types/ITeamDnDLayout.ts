export interface ITeamDnDLayout {
  teamId: number
  type: string // teamPage, peerLog
  createdAt: Date
  updatedAt: Date
  widgets: IWidget[]
}

// 위젯의 좌표와 크기
export interface IDataGrid {
  i?: number
  x: number
  y: number
  w: number
  h: number
  moved?: boolean
  static?: boolean
  isDraggable?: boolean
}

// 위젯의 데이터
//new Date
export interface IWidget {
  key: number
  size: SizeType // S/M/L
  grid: IDataGrid // x,y,w,h
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
