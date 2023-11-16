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
}

// 위젯의 데이터
export interface IWidget {
  key: number
  size: string // S/M/L
  grid: IDataGrid // x,y,w,h
  type: String
  createdAt: Date
  updatedAt: Date
  data: any
}
