import { Button, ButtonGroup } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { ProjectType } from './MainPage'

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
          sx={{ color: type === 'Study' ? 'blue' : 'black' }}
          onClick={() => {
            setType('Study')
          }}
        >
          스터디
        </Button>
        <Button
          variant="text"
          sx={{ color: type === 'Project' ? 'blue' : 'black' }}
          onClick={() => {
            setType('Project')
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
      aria-label="Study or Project button"
      fullWidth
      sx={{
        justifyContent: 'space-evenly',
        border: 'none',
      }}
    >
      <Button
        sx={{ backgroundColor: type === 'Study' ? 'blue' : 'gray' }}
        onClick={() => {
          setType('Study')
        }}
      >
        스터디
      </Button>
      <Button
        sx={{ backgroundColor: type === 'Project' ? 'blue' : 'gray' }}
        onClick={() => {
          setType('Project')
        }}
      >
        프로젝트
      </Button>
    </ButtonGroup>
  )
}

export default SelectType
