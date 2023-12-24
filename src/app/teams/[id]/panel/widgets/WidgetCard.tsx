import { Card, CardContent } from '@mui/material'
import * as style from './WidgetCard.style'

const WidgetCard = ({
  children,
}: {
  bgcolor?: string // TODO : 타입에러 방지로 남겨두었습니다. 나중에 지워주세요.
  children: React.ReactNode
}) => {
  return (
    <Card sx={style.widgetCard}>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default WidgetCard
