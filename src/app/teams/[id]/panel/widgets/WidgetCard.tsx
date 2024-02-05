import { Card, CardContent, SxProps, Theme } from '@mui/material'
import * as style from './WidgetCard.style'

interface IWigetCardProps {
  children: React.ReactNode
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
