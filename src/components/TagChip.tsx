import { CloseIcon } from '@/icons'
import { Chip, Typography, alpha } from '@mui/material'
import { useMemo } from 'react'

const TagChip = ({
  name,
  color,
  onDelete,
}: {
  name: string
  color: string
  onDelete?: () => void
  deleteIcon?: boolean
}) => {
  const backgroundColor = useMemo(() => alpha(color, 0.3), [color])

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
        padding: onDelete ? '6px 0px 6px 8px' : '0px 6px',
        height: onDelete ? '1.5rem' : '1.25rem',
        '& .MuiChip-label': {
          padding: '0px',
        },
        display: 'inline-flex',
        flexShrink: 0,
        alignItems: 'center',
      }}
      onDelete={onDelete}
      deleteIcon={
        <CloseIcon
          sx={{
            height: '1.5rem',
            width: '1.5rem',
            right: 0,
            display: 'relative',
            margin: 0,
            color: color,
            py: '6px',
            boxSizing: 'border-box',
            transform: 'translateX(6px)',
          }}
          style={{ color: color }}
        />
      }
    />
  )
}

export default TagChip
