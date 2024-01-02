import { Event } from 'react-big-calendar'

export interface IMember {
  id: number
  name: string
}

export interface IEvent extends Event {
  // title: React.ReactNode | undefined // extends Event
  // start: Date // extends Event
  // end: Date // extends Event
  teamId: number
  id: number
  members: IMember[]
  eventId: number
}
