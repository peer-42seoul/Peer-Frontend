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
import * as style from './index.style'

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
  const calendarData = data || []

  return (
    <>
      <WidgetCard onClick={openModal}>
        <CalendarRender data={calendarData} size={size} />
      </WidgetCard>
      <PreviewModal open={isOpen} onClose={closeModal} events={data} />
    </>
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
    <Stack sx={style.largeContainer}>
      <Stack direction={'row'} spacing={'3.875rem'}>
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
  )
}

const CalendarMedium = ({ data }: ICalendar) => {
  const { today, todayEvents } = getTodayData(data)
  const isEmpty = !todayEvents || todayEvents.length === 0

  return (
    <Stack direction={'row'} spacing={'0.5rem'} sx={style.mediumContainer}>
      <Stack justifyContent={'space-between'} sx={style.mediumToday}>
        <Today today={today} />
        <Typography variant={'Caption'} color={'purple.normal'}>
          {/* 높이 유지를 위해 빈 문자 삽입 - 위젯 높이가 고정된다면 빈 문자 삭제 예정 */}
          {isEmpty ? '\u00A0' : `${todayEvents.length}개의 일정이 있습니다.`}
        </Typography>
      </Stack>
      {isEmpty ? (
        <Typography variant={'Body2'} color={'text.alternative'}>
          등록된 일정이 없습니다.
        </Typography>
      ) : (
        <Stack spacing={'1rem'}>
          {/* 최대 3개의 일정만 보여줌 */}
          {todayEvents.slice(0, 3).map((event) => (
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
  )
}

const CalendarSmall = ({ data }: ICalendar) => {
  const { today, todayEvents } = getTodayData(data)
  const isEmpty = !todayEvents || todayEvents.length === 0
  const message = isEmpty
    ? '등록된 일정이 없습니다.'
    : `외 ${todayEvents.length - 1}개의 일정`

  return (
    <Stack spacing={'0.56rem'} sx={style.smallContainer}>
      <Today today={today} />
      {!isEmpty && (
        <EventItem
          title={todayEvents[0].title}
          start={todayEvents[0].start}
          end={todayEvents[0].end}
        />
      )}
      <Typography
        variant="Body2"
        color={isEmpty ? 'text.alternative' : 'text.strong'}
        sx={style.eventText}
      >
        {message}
      </Typography>
    </Stack>
  )
}

const EventItem = ({ title, start, end }: IEventItem) => {
  if (!start || !end) return null
  return (
    <Stack>
      <Stack
        direction={'row'}
        spacing={'0.5rem'}
        alignItems={'center'}
        width={'100%'}
      >
        <CircleIcon sx={style.eventItemDot} />
        <Box sx={style.eventTextWrapper}>
          <Typography
            variant={'Body2'}
            color={'text.strong'}
            sx={style.eventText}
          >
            {title}
          </Typography>
        </Box>
      </Stack>
      <Typography
        variant={'Caption'}
        color={'text.alternative'}
        sx={style.eventText}
      >
        {dayjs(start).format('HH:mm')}-{dayjs(end).format('HH:mm')}
      </Typography>
    </Stack>
  )
}

const Today = ({ today }: { today: dayjs.Dayjs }) => {
  return (
    <Stack spacing={'0.5rem'} sx={style.today}>
      <Typography variant="Title3">{today.format('dddd')}</Typography>
      <Typography variant="Headline">{today.format('D')}</Typography>
    </Stack>
  )
}

export default CalenderWidget
