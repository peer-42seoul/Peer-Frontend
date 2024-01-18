import { MenuItem, Select } from '@mui/material'
import useTeamPageState from '@/states/useTeamPageState'
import { ChevronDown } from '@/icons'
import { ITeamBoard } from '@/types/TeamBoardTypes'
import * as style from './BoardDropdown.style'

const BoardDropdown = ({ boardData }: { boardData: ITeamBoard[] }) => {
  const { boardId, setBoard } = useTeamPageState()
  if (!boardData || boardData.length == 0) return null
  return (
    <Select
      value={boardId}
      onChange={(e) => setBoard('LIST', Number(e.target.value))}
      IconComponent={ChevronDown}
      sx={style.boardSelect}
    >
      {boardData.map((board) => (
        <MenuItem
          key={board.boardId}
          value={board.boardId}
          sx={style.boardSelectMenu}
        >
          {board.boardName}
        </MenuItem>
      ))}
    </Select>
  )
}

export default BoardDropdown
