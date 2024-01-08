import { Card, CardContent, SxProps, Theme } from '@mui/material'
import * as style from './WidgetCard.style'

interface IWigetCardProps {
  children: React.ReactNode
  bgcolor?: string // TODO : 타입에러 방지로 남겨두었습니다. 나중에 지워주세요.
  onClick?: () => void
  contentSx?: SxProps
}

const WidgetCard = ({ children, onClick, contentSx }: IWigetCardProps) => {
  return (
    <Card sx={style.widgetCard} onClick={onClick}>
      <CardContent
        sx={{ ...style.widgetCardContent, ...contentSx } as SxProps<Theme>}
      >
        {children}
      </CardContent>
    </Card>
  )
}

export default WidgetCard
