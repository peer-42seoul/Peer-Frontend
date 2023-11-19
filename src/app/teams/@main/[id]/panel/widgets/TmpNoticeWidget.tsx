import { Box, TextField, Typography, Stack } from '@mui/material'
import { SizeType } from '@/types/ITeamDnDLayout'
import WidgetCard from '@/app/teams/@main/[id]/panel/widgets/WidgetCard'

/* 임시 위젯 */
const TmpNoticeWidget = ({ data, size }: { data: any; size: SizeType }) => {
  /* 추후에 들어올 data */
  console.log('data', data)
  return (
    <WidgetCard bgcolor={'blueGrey'}>
      <Typography>{'Notice: ' + size}</Typography>
      <TextField label="Multiline" multiline maxRows={4} />
    </WidgetCard>
  )
}

export default TmpNoticeWidget
