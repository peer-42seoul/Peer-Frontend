import { Event } from 'react-big-calendar'

export interface IMember {
  userId: number
  nickname: string
}

export interface IEvent extends Event {
  // title: React.ReactNode | undefined // extends Event
  // start: Date // extends Event
  // end: Date // extends Event
  teamId: number
  member: IMember[]
  eventId: number
  memo: string
}
