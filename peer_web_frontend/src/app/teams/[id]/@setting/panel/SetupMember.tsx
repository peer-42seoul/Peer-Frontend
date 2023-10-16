import { Avatar, Box, Grid, Stack, Switch, Typography } from '@mui/material'
import { IMember } from '../page'

const SetupMember = ({ team }: { team: IMember[] }) => {
  return (
    <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography fontWeight="bold">팀원 목록</Typography>
        </Grid>
        {team.map((member, index) => (
          <Grid component="div" key={index} item xs={6} textAlign="center">
            <Box component="div" border="1px solid" p={1}>
              <Avatar sx={{ margin: 'auto' }}>A</Avatar>
              <Typography fontWeight="bold">{member.name}</Typography>
              <Stack direction="row" sx={{ justifyContent: 'center' }}>
                <Typography fontSize="small">리더 권한</Typography>
                <Switch size="small" />
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SetupMember
