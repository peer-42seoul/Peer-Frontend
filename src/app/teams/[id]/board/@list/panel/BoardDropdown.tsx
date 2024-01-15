import { Select } from '@mui/material'
import useTeamPageState from '@/states/useTeamPageState'
import { ITeamBoardInfo } from '@/types/TeamBoardTypes'

const BoardDropdown = ({ boardData }: { boardData: ITeamBoardInfo[] }) => {
  const { setBoard } = useTeamPageState()
  if (!boardData || boardData.length == 0) return null
  return (
    <Select
      value={boardData[0].boardId}
      onChange={(e) => setBoard('LIST', Number(e.target.value))}
    >
      {boardData.map((board) => (
        <option key={board.boardId} value={board.boardId}>
          {board.boardName}
        </option>
      ))}
    </Select>
  )
}

export default BoardDropdown
