import { TextField, Typography } from '@mui/material'
import { SizeType } from '@/types/ITeamDnDLayout'
import WidgetCard from './WidgetCard'

/* 임시 위젯 */
const TmpCalenderWidget = ({ data, size }: { data: any; size: SizeType }) => {
  /* 추후에 들어올 data */
  console.log('data', data)
  return (
    <WidgetCard bgcolor={'lightGreen'}>
      <Typography>{'Calender ' + size}</Typography>
      <TextField label="Multiline" multiline maxRows={4} />
    </WidgetCard>
  )
}
export default TmpCalenderWidget
