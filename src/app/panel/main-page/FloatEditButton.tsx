import { Edit } from '@mui/icons-material'
import { Fab } from '@mui/material'
import Link from 'next/link'

const FloatEditButton = () => {
  return (
    <Fab color="secondary" aria-label="edit">
      <Link href={'/recruit/write'}>
        <Edit />
      </Link>
    </Fab>
  )
}

export default FloatEditButton
