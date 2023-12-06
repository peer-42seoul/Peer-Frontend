import { Chip } from '@mui/material'
import { useMemo } from 'react'

const TagChip = ({
  name,
  color,
  onDelete,
}: {
  name: string
  color: string
  onDelete?: () => void
}) => {
  const backgroundColor = useMemo(() => {
    if (!color) return ''
    const r = parseInt(color.slice(1, 3), 16),
      g = parseInt(color.slice(3, 5), 16),
      b = parseInt(color.slice(5, 7), 16)
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + '0.3' + ')'
  }, [color])

  return (
    <Chip
      label={name ?? ''}
      size="small"
      style={{
        color: color,
        backgroundColor: backgroundColor,
        borderRadius: 5,
      }}
      onDelete={onDelete}
    />
  )
}

export default TagChip
