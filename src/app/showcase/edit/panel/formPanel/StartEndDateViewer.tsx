import { Stack, Typography } from '@mui/material'
import React from 'react'
import * as Style from '../ShowcaseEditor.style'
import { CalendarIcon } from '@/app/showcase/panel/icons'
import LabelWithIcon from '../LabelWithIcon'

interface Idate {
  start: string
  end: string
}

const StartEndDateViewer = ({ start, end }: Idate) => {
  return (
    <Stack
      direction={'row'}
      spacing={'0.5rem'}
      sx={{ justifyContent: 'space-between' }}
    >
      <Stack>
        <LabelWithIcon
          svgIcon={<CalendarIcon sx={Style.IconStyle} />}
          message="시작일"
        />
        <Typography variant={'Body2'} sx={{ color: 'text.normal' }}>
          {start} (모집글 게시일)
        </Typography>
      </Stack>
      <Stack>
        <LabelWithIcon
          svgIcon={<CalendarIcon sx={Style.IconStyle} />}
          message="종료일"
        />
        <Typography variant={'Body2'} sx={{ color: 'text.normal' }}>
          {end} (진행 완료일)
        </Typography>
      </Stack>
    </Stack>
  )
}

export default StartEndDateViewer
