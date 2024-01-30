import { TextField, Typography } from '@mui/material'
import { IWidgetProps } from '@/types/ITeamDnDLayout'
import WidgetCard from './WidgetCard'

/* 임시 위젯 */
const TmpAttendWidget = ({ data, size }: IWidgetProps) => {
  return (
    <WidgetCard>
      <Typography>{'Attned ' + size + ' '}</Typography>
      <Typography>{data}</Typography>
      <TextField label="Multiline" multiline maxRows={4} />
    </WidgetCard>
  )
}
export default TmpAttendWidget
