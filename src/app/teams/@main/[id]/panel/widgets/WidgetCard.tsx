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
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default WidgetCard
