import { Button, ButtonGroup } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { ProjectType } from '../page'

const SelectType = ({
  type,
  setType,
}: {
  type: ProjectType
  setType: Dispatch<SetStateAction<ProjectType>>
}) => {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="study or project button"
      fullWidth
      sx={{
        justifyContent: 'space-evenly',
        border: 'none',
      }}
    >
      <Button
        sx={{ backgroundColor: type === 'studies' ? 'blue' : 'gray' }}
        onClick={() => {
          setType('studies')
        }}
      >
        스터디
      </Button>
      <Button
        sx={{ backgroundColor: type === 'projects' ? 'blue' : 'gray' }}
        onClick={() => {
          setType('projects')
        }}
      >
        프로젝트
      </Button>
    </ButtonGroup >
  )
}

export default SelectType
