import { TeamType } from '@/app/teams/types/types'
import { Box, Theme, Typography } from '@mui/material'

const TeamTypeCard = ({ type }: { type: TeamType }) => {
  return (
    <Box
      width={'30rem'}
      sx={{
        py: '0.5rem',
        px: '1rem',
        backgroundColor: (theme: Theme) => theme.palette.background.tertiary,
        borderRadius: '0.5rem',
      }}
    >
      <Typography
        textAlign={'center'}
        color={type === TeamType.STUDY ? 'yellow.strong' : 'green.strong'}
        fontWeight={'bold'}
      >
        {type === TeamType.STUDY ? '스터디' : '프로젝트'}
      </Typography>
    </Box>
  )
}

export default TeamTypeCard
