'use client'
import { ReactNode } from 'react'
import dayjs from 'dayjs'
import { Box, Grid, Stack, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import useModal from '@/hook/useModal'
import { SizeType } from '@/types/ITeamDnDLayout'
import { IEvent } from '@/types/WidgetDataTypes'
import WidgetCard from '../WidgetCard'
import CalendarMini from './CalendarMini'
import { getTodayData } from './utils'
import PreviewModal from './PreviewModal'

interface ICalendarWidget {
  data?: IEvent[]
  size: SizeType
}

interface ICalendar {
  data?: IEvent[]
}

interface IEventItem {
  title: ReactNode
  start: Date | undefined
  end: Date | undefined
}

const CalenderWidget = ({ data, size }: ICalendarWidget) => {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <CalendarRender data={data} size={size} />
      <PreviewModal open={isOpen} onClose={closeModal} events={data} />
    </>
  )
  )
}

const CalendarRender = ({ data, size }: ICalendarWidget) => {
  if (size === 'S') return <CalendarSmall data={data} />
  if (size === 'M') return <CalendarMedium data={data} />
  return <CalendarLarge data={data} /> // size === 'L'
}

const CalendarLarge = ({ data }: ICalendar) => {
  const { today, todayEvents } = getTodayData(data)
  const isEmpty = !todayEvents || todayEvents.length === 0
  return (
    <WidgetCard>
      <Stack>
        <Stack>
          <Today today={today} />
          <CalendarMini events={data} />
        </Stack>
        {isEmpty ? (
          <Typography>등록된 일정이 없습니다.</Typography>
        ) : (
          <Grid>
            {/* 최대 5개의 일정만 보여줌 */}
            {todayEvents.slice(0, 5).map((event) => (
              <Grid item key={event.id} xs={6}>
                <EventItem
                  title={event.title}
                  start={event.start}
                  end={event.end}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </WidgetCard>
  )
}

const CalendarMedium = ({ data }: ICalendar) => {
  const { today, todayEvents } = getTodayData(data)
  const isEmpty = !todayEvents || todayEvents.length === 0

  return (
    <WidgetCard>
      <Stack>
        <Stack>
          <Today today={today} />
          {!isEmpty && (
            <Typography>{todayEvents.length}개의 일정이 있습니다.</Typography>
          )}
        </Stack>
        {isEmpty ? (
          <Typography>등록된 일정이 없습니다.</Typography>
        ) : (
          <Stack>
            {/* 최대 3개의 일정만 보여줌 */}
            {todayEvents.slice(0, 4).map((event) => (
              <EventItem
                key={event.id}
                title={event.title}
                start={event.start}
                end={event.end}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </WidgetCard>
  )
}

const CalendarSmall = ({ data }: ICalendar) => {
  const { today, todayEvents } = getTodayData(data)
  const isEmpty = !todayEvents || todayEvents.length === 0

  return (
    <WidgetCard>
      <Stack>
        <Today today={today} />
        {!isEmpty && (
          <EventItem
            title={todayEvents[0].title}
            start={todayEvents[0].start}
            end={todayEvents[0].end}
          />
        )}
        {isEmpty ? (
          <Typography>등록된 일정이 없습니다.</Typography>
        ) : (
          <Typography>외 {todayEvents.length - 1}개의 일정</Typography>
        )}
      </Stack>
    </WidgetCard>
  )
}

const EventItem = ({ title, start, end }: IEventItem) => {
  if (!start || !end) return null
  return (
    <Stack>
      <Box>
        <CircleIcon />
        <Typography>{title}</Typography>
      </Box>
      <Typography>
        {dayjs(start).format('HH:mm')}-{dayjs(end).format('HH:mm')}
      </Typography>
    </Stack>
  )
}

const Today = ({ today }: { today: dayjs.Dayjs }) => {
  return (
    <Stack>
      <Typography>{today.format('dddd')}</Typography>
      <Typography>{today.format('D')}</Typography>
    </Stack>
  )
}

export default CalenderWidget
