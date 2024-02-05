import { ReactNode } from 'react'
import dayjs from 'dayjs'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import useMedia from '@/hook/useMedia'
import { PlusIcon } from '@/icons'
import { IEvent } from '@/types/WidgetDataTypes'
import { isPastEvent, useCalendar } from './utils'
import CalendarLarge from './CalendarLarge'
import * as style from './CalendarModal.style'

interface IPreviewModalProps {
  events?: IEvent[]
  openNewModal: () => void
}

const PreviewModalContent = ({ events, openNewModal }: IPreviewModalProps) => {
  const { selectedDate, setSelectedDate, todayEvents, isEmpty } =
    useCalendar(events)
  const { isPc } = useMedia()
  return (
    <Stack
      sx={isPc ? style.modalContent : style.mobileModalContent}
      spacing={'2.5rem'}
    >
      <CalendarLarge
        events={events}
        onDrillDown={(date: Date) => setSelectedDate(dayjs(date))}
      />
      <Box>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={style.eventListHeader}
        >
          <Typography
            variant={'Body1Emphasis'}
            color={'text.strong'}
          >{`${selectedDate.format('M.D')} 일정`}</Typography>
          <IconButton onClick={openNewModal}>
            <PlusIcon width={'1.25rem'} height={'1.25rem'} />
          </IconButton>
        </Stack>
        <Stack sx={style.eventList}>
          {isEmpty ? (
            <Typography variant={'Body2'} color={'text.alternative'}>
              등록된 일정이 없습니다.
            </Typography>
          ) : (
            <Stack spacing={'0.5rem'}>
              {todayEvents?.map((event) => (
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
      </Box>
    </Stack>
  )
}

interface IEventItem {
  title: ReactNode
  start: Date | undefined
  end: Date | undefined
}

const EventItem = ({ title, start, end }: IEventItem) => {
  if (!start || !end) return null
  const isPast = isPastEvent(end)
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={'0.5rem'}>
      <CircleIcon
        sx={{
          ...style.eventItemIcon,
          color: isPast ? 'text.assistive' : 'text.strong',
        }}
      />
      <Typography
        variant={'Body2'}
        color={isPast ? 'text.assistive' : 'text.strong'}
        sx={style.eventItemText}
      >
        {title}
      </Typography>
      <Typography
        variant={'Caption'}
        color={isPast ? 'text.assistive' : 'text.alternative'}
        sx={style.eventItemTime}
      >
        {`${dayjs(start).format('HH:mm')}-${dayjs(end).format('HH:mm')}`}
      </Typography>
    </Stack>
  )
}

export default PreviewModalContent
