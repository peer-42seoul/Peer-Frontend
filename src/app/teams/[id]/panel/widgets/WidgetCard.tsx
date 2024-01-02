import { Card, CardContent } from '@mui/material'

const WidgetCard = ({
  bgcolor,
  children,
}: {
  bgcolor: string
  children: React.ReactNode
}) => {
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: bgcolor,
        position: 'relative',
      }}
    >
      <CardContent
        sx={{
          padding: '1.5rem 1.5rem 2rem 1.5rem',
        }}
      >
        {children}
      </CardContent>
    </Card>
  )
}

export default WidgetCard
