import { TextField, Typography } from '@mui/material'
import { IWidgetProps } from '@/types/ITeamDnDLayout'
import WidgetCard from '@/app/teams/[id]/panel/widgets/WidgetCard'

/* 임시 위젯 */
const TmpNoticeWidget = ({ data, size, wgKey }: IWidgetProps) => {
  return (
    <WidgetCard>
      <Typography>{'Notice: ' + size + ' ' + wgKey}</Typography>
      <Typography>{data}</Typography>
      <TextField label="Multiline" multiline maxRows={4} />
    </WidgetCard>
  )
}

export default TmpNoticeWidget
