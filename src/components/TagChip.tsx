import { Chip, Typography, createSvgIcon } from '@mui/material'
import { useMemo } from 'react'

const TagChip = ({
  name,
  color,
  onDelete,
  deleteIcon,
}: {
  name: string
  color: string
  onDelete?: () => void
  deleteIcon?: boolean
}) => {
  const backgroundColor = useMemo(() => {
    if (!color) return ''
    const r = parseInt(color.slice(1, 3), 16),
      g = parseInt(color.slice(3, 5), 16),
      b = parseInt(color.slice(5, 7), 16)
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + '0.3' + ')'
  }, [color])

  const CloseIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7.99743 8.7284C7.90092 8.63189 7.8467 8.501 7.8467 8.36451C7.8467 8.22802 7.90092 8.09712 7.99743 8.00061C8.09394 7.9041 8.22484 7.84988 8.36133 7.84988C8.49782 7.84988 8.62871 7.9041 8.72522 8.00061L16.0031 15.2785C16.0996 15.375 16.1538 15.5059 16.1538 15.6424C16.1538 15.7789 16.0996 15.9098 16.0031 16.0063C15.9066 16.1028 15.7757 16.157 15.6392 16.157C15.5027 16.157 15.3718 16.1028 15.2753 16.0063L7.99743 8.7284Z"
        fill={color}
      />
      <path
        d="M15.2748 8.00061C15.3713 7.9041 15.5022 7.84988 15.6387 7.84988C15.7752 7.84988 15.9061 7.9041 16.0026 8.00061C16.0991 8.09712 16.1533 8.22802 16.1533 8.36451C16.1533 8.501 16.0991 8.63189 16.0026 8.7284L8.72467 16.0063C8.62816 16.1028 8.49726 16.157 8.36078 16.157C8.22429 16.157 8.09339 16.1028 7.99688 16.0063C7.90037 15.9098 7.84615 15.7789 7.84615 15.6424C7.84615 15.5059 7.90037 15.375 7.99688 15.2785L15.2748 8.00061Z"
        fill={color}
      />
    </svg>,
    'CloseIcon',
  )

  return (
    <Chip
      label={
        (
          <Typography variant="Tag" color={color} sx={{ padding: 0 }}>
            {name}
          </Typography>
        ) ?? ''
      }
      size="small"
      sx={{
        color: color,
        backgroundColor: backgroundColor,
        borderRadius: '2px',
        padding: deleteIcon ? '6px 0px 6px 8px' : '0px 6px',
        height: deleteIcon ? '24px' : '20px',
        '& .MuiChip-label': {
          padding: '0px',
        },
        display: 'inline-flex',
        flexShrink: 0,
        alignItems: 'center',
      }}
      onDelete={onDelete}
      deleteIcon={
        deleteIcon ? (
          <CloseIcon
            style={{
              height: '1.5rem',
              width: '1.5rem',
              right: 0,
              display: 'relative',
              margin: 0,
            }}
          />
        ) : undefined
      }
    />
  )
}

export default TagChip
