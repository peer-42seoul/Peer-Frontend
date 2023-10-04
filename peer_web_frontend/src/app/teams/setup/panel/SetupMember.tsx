import { Box, Typography } from '@mui/material'
import { ITeamInfo } from '../../page'

function createData(
  granted: boolean,
  name: string,
  leader: boolean,
  fired: boolean,
) {
  return { granted, name, leader, fired }
}

const SetupMember = ({ team }: { team: ITeamInfo }) => {
  const rows = [
    createData(true, '김민수', true, false),
    createData(true, '김민수', false, false),
    createData(true, '김민수', false, false),
  ]
  return (
    <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
      <Typography fontWeight="bold">팀원 목록</Typography>
      <Box border="1px grey"></Box>
    </Box>
  )
}

export default SetupMember
