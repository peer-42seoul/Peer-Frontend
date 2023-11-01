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
          sx={{ color: type === 'study' ? 'blue' : 'black' }}
          onClick={() => {
            setType('study')
          }}
        >
          스터디
        </Button>
        <Button
          variant="text"
          sx={{ color: type === 'project' ? 'blue' : 'black' }}
          onClick={() => {
            setType('project')
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
        sx={{ backgroundColor: type === 'study' ? 'blue' : 'gray' }}
        onClick={() => {
          setType('study')
        }}
      >
        스터디
      </Button>
      <Button
        sx={{ backgroundColor: type === 'project' ? 'blue' : 'gray' }}
        onClick={() => {
          setType('project')
        }}
      >
        프로젝트
      </Button>
    </ButtonGroup>
  )
}

export default SelectType
