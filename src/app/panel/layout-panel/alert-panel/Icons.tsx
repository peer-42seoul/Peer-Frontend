import { Card, Typography } from '@mui/material'

const SystemIcon = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        width: '3rem',
        backgroundColor: (theme) => theme.palette.red.strong,
        padding: '0.1rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="Caption">시스템</Typography>
    </Card>
  )
}

const MessageIcon = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        width: '3rem',
        backgroundColor: (theme) => theme.palette.blue.strong,
        padding: '0.1rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="Caption">쪽지</Typography>
    </Card>
  )
}

const TeamIcon = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        width: '3rem',
        backgroundColor: (theme) => theme.palette.green.strong,
        padding: '0.1rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="Caption">팀</Typography>
    </Card>
  )
}

export { SystemIcon, MessageIcon, TeamIcon }
