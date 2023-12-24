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
  return data?.filter((event) => dayjs(event.start).isSame(today, 'day'))
}
