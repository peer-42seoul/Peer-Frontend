import { TextField, Typography } from '@mui/material'
import { IWidgetProps } from '@/types/ITeamDnDLayout'
import WidgetCard from './WidgetCard'

/* 임시 위젯 */
const TmpBoardWidget = ({ data, size, key }: IWidgetProps) => {
  return (
    <WidgetCard>
      <Typography>{'Board ' + size + ' ' + key}</Typography>
      <Typography>{data}</Typography>
      <TextField label="Multiline" multiline maxRows={4} />
    </WidgetCard>
  )
}
export default TmpBoardWidget
