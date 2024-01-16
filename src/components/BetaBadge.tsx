import { Card, Typography } from '@mui/material'

const BetaBadge = () => {
  return (
    <Card
      sx={{
        padding: '0.2rem',
        background: 'linear-gradient(to right bottom, green , lightgreen)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography fontSize={'small'} fontWeight={'bold'} textAlign={'center'}>
        BETA
      </Typography>
    </Card>
  )
}

export default BetaBadge
