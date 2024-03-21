import { Stack, Typography } from '@mui/material'
import React from 'react'
import * as Style from './SkillInput.style'
import { CalendarIcon } from '@/app/showcase/panel/icons'
import LabelWithIcon from '../../../../components/LabelWithIcon'
import useMedia from '@/hook/useMedia'
import * as style from './StartEndDateViewer.style'
interface Idate {
  start: string
  end: string
}

const StartEndDateViewer = ({ start, end }: Idate) => {
  const { isPc } = useMedia()

  return (
    <Stack direction={'row'} sx={style.StartEndDateViewerBox(isPc)}>
      <Stack spacing={'0.75rem'} sx={{ width: '50%', display: 'flex' }}>
        <LabelWithIcon
          svgIcon={<CalendarIcon sx={Style.IconStyle} />}
          message="시작일"
          color="text.alternative"
        />
        <Typography variant={'Body2'} sx={{ color: 'text.normal' }}>
          {start.split('T')[0]} (모집글 게시일)
        </Typography>
      </Stack>
      <Stack spacing={'0.75rem'} sx={{ width: '50%', display: 'flex' }}>
        <LabelWithIcon
          svgIcon={<CalendarIcon sx={Style.IconStyle} />}
          message="종료일"
          color="text.alternative"
        />
        <Typography variant={'Body2'} sx={{ color: 'text.normal' }}>
          {end.split('T')[0]} (진행 완료일)
        </Typography>
      </Stack>
    </Stack>
  )
}

export default StartEndDateViewer
