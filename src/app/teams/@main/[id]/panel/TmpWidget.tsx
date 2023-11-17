import { Box, TextField, Typography } from '@mui/material'
import { SizeType } from '@/types/ITeamDnDLayout'

/* 임시 위젯 */
const TmpWidget = ({ data, size }: { data: any; size: SizeType }) => {
  /* 추후에 들어올 data */
  console.log('data', data)
  return (
    <Box width={'100%'} height={'100%'}>
      <Typography>{'size: ' + size}</Typography>
      <TextField label="Multiline" multiline maxRows={4} />
    </Box>
  )
}
export default TmpWidget
