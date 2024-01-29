import { Event } from 'react-big-calendar'

export interface IMember {
  userId: number
  nickname: string
}

export interface IEvent extends Event {
  // title: React.ReactNode | undefined // extends Event
  // start: Date // extends Event
  // end: Date // extends Event
  id: string // 위젯에서 사용할 id
  eventId: number // 일정 알림에서 사용할 id
  teamId: number
  member: IMember[]
  memo: string
}
