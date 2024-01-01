import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { IEvent } from '@/types/WidgetDataTypes'

export const getTodayData = (data: IEvent[] | undefined) => {
  const today = dayjs()
  const todayEvents = getTodayEvents(today, data)
  return {
    today,
    todayEvents,
  }
}

export const getTodayEvents = (
  today: dayjs.Dayjs,
  data: IEvent[] | undefined,
) => {
  return data?.filter((event) => dayjs(event.start).isSame(today, 'day')) || []
}

export const isPastEvent = (end: Date) => {
  return dayjs(end).isBefore(dayjs())
}

export const useCalendar = (events?: IEvent[]) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs())
  const [todayEvents, setTodayEvents] = useState<IEvent[] | undefined>([])
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  useEffect(() => {
    const todayEvents = getTodayEvents(selectedDate, events)
    setTodayEvents(todayEvents)
    setIsEmpty(!todayEvents || todayEvents.length === 0)
  }, [events, selectedDate])
  return { selectedDate, setSelectedDate, todayEvents, isEmpty }
}
