import { TextField, Typography } from '@mui/material'
import { SizeType } from '@/types/ITeamDnDLayout'
import WidgetCard from './WidgetCard'

/* 임시 위젯 */
const TmpBoardWidget = ({ data, size }: { data: any; size: SizeType }) => {
  return (
    <WidgetCard bgcolor={'orange'}>
      <Typography>{'Board ' + size}</Typography>
      <Typography>{data}</Typography>
      <TextField label="Multiline" multiline maxRows={4} />
    </WidgetCard>
  )
}
export default TmpBoardWidget
