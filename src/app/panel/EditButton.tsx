import { Edit } from '@mui/icons-material'
import { Fab } from '@mui/material'
import Link from 'next/link'

const EditButton = () => {
  return (
    <Fab color="secondary" aria-label="edit">
      <Link href={"/recruitment"}>
        <Edit />
      </Link>
    </Fab>
  )
}

export default EditButton
