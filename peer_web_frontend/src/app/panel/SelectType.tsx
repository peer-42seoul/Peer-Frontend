import { Button, ButtonGroup } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { ProjectType } from '../page'

const SelectType = ({
  type,
  setType,
  pc,
}: {
  type: ProjectType
  setType: Dispatch<SetStateAction<ProjectType>>
  pc?: boolean
}) => {
  if (pc) {
    return (
      <ButtonGroup>
        <Button
          variant="text"
          sx={{ color: type === 'studies' ? 'blue' : 'black' }}
          onClick={() => {
            setType('studies')
          }}
        >
          스터디
        </Button>
        <Button
          variant="text"
          sx={{ color: type === 'projects' ? 'blue' : 'black' }}
          onClick={() => {
            setType('projects')
          }}
        >
          프로젝트
        </Button>
      </ButtonGroup>
    )
  }

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
    </ButtonGroup>
  )
}

export default SelectType
