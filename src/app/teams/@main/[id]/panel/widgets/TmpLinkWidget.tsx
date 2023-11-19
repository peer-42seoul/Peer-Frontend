import { TextField, Typography } from '@mui/material'
import { SizeType } from '@/types/ITeamDnDLayout'
import WidgetCard from './WidgetCard'

/* 임시 위젯 */
const TmpLinkWidget = ({ data, size }: { data: any; size: SizeType }) => {
  return (
    <WidgetCard bgcolor={'purple'}>
      <Typography>{'Link ' + size}</Typography>
      <Typography>{data}</Typography>
      <TextField label="Multiline" multiline maxRows={4} />
    </WidgetCard>
  )
}
export default TmpLinkWidget
