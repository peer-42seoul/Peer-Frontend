import { Stack, Typography } from '@mui/material'

const RecruitContentText = ({
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
  <Stack gap={'0.5rem'}>
    <Stack direction={'row'} gap={'0.5rem'} alignItems={'center'}>
      <Stack
        sx={{ color: 'text.normal', width: '1rem', height: '1rem' }}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {icon}
      </Stack>
      <Typography color={'text.strong'} variant="CaptionEmphasis">
        {label}
      </Typography>
    </Stack>
    {content && (
      <Typography variant={'Body2'} color={'text.alternative'}>
        {content}
      </Typography>
    )}
    {children && children}
  </Stack>
)

export default RecruitContentText
