import CuButton from '@/components/CuButton'
import { Button, Stack, TextField } from '@mui/material'

interface ISearchBarProps {
  setSearchKeyword: (keyword: string) => void
  setIsManageMode: (isManageMode: boolean) => void
  handleMessageSearch: () => void
}

export const SearchBar = ({
  setSearchKeyword,
  setIsManageMode,
  handleMessageSearch,
}: ISearchBarProps) => {
  return (
    <Stack direction="row">
      <TextField
        placeholder="사람을 검색해 주세요."
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <Button variant="contained" onClick={handleMessageSearch}>
        검색
      </Button>
      <CuButton
        variant="text"
        action={() => setIsManageMode(true)}
        message="관리"
      />
    </Stack>
  )
}

interface IManageBarProps {
  isSelectedAll: boolean
  handleSelectAll: () => void
  handleUnselectAll: () => void
  handleDelete: () => void
  setIsManageMode: (isManageMode: boolean) => void
}

export const ManageBar = ({
  isSelectedAll,
  handleSelectAll,
  handleUnselectAll,
  handleDelete,
  setIsManageMode,
}: IManageBarProps) => {
  return (
    <Stack direction="row">
      {isSelectedAll ? (
        <CuButton
          variant="text"
          action={handleUnselectAll}
          message="전체 선택 해제"
        />
      ) : (
        <CuButton variant="text" action={handleSelectAll} message="전체 선택" />
      )}
      <CuButton variant="text" action={handleDelete} message="삭제" />
      <CuButton
        variant="text"
        action={() => setIsManageMode(false)}
        message="리스트로 돌아가기"
      />
    </Stack>
  )
}
