import { Event } from 'react-big-calendar'
// Calendar

// NOTE : 이벤트 타입은 이거 확장해서 쓰는게 안전할듯
// export interface Event {
//   allDay?: boolean | undefined
//   title?: React.ReactNode | undefined
//   start?: Date | undefined
//   end?: Date | undefined
//   resource?: any
// }

export type TEventColor = '#CB62D0' | 'F4CE14' | '#FFD976' // 임시 데이터

export interface IEvent extends Event {
  id: number
  color: TEventColor // 그 이벤트에 해당하는 색깔. (위젯 뷰에서는 색깔을 구분하지 않음)
}
