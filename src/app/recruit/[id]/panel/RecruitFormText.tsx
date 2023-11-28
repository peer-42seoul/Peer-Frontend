import { Box, Icon, Stack, Typography } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'

const RecruitFormText = ({
  label,
  content,
  children,
  icon,
}: {
  label: string
  content?: string
  children?: React.ReactNode
  icon?: React.ReactNode
}) => (
  <Box>
    <Stack direction={'row'} gap={1}>
      <Box sx={{ color: 'text.normal' }}>{icon}</Box>
      <Typography sx={{ fontWeight: 'bold' }}>{label}</Typography>
    </Stack>
    {content && <Typography>{content}</Typography>}
    {children && children}
  </Box>
)

export default RecruitFormText
