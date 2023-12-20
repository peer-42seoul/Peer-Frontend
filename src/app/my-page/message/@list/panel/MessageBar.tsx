import CuButton from '@/components/CuButton'
import { InputBase, Stack, Typography } from '@mui/material'
import SearchIcon from '@/icons/SearchIcon'
import * as style from './MessageBar.style'

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
    <Stack spacing={'1.5rem'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant={'Title3Emphasis'}>대상 리스트</Typography>
        <CuButton
          TypographyProps={{ variant: 'CaptionEmphasis' }}
          variant="text"
          action={() => setIsManageMode(true)}
          message="관리"
        />
      </Stack>
      <Stack
        sx={style.searchInputWrapper}
        direction={'row'}
        alignItems={'center'}
        spacing={'0.38rem'}
      >
        <SearchIcon />
        <InputBase
          sx={style.searchInput}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="닉네임을 검색해주세요."
          fullWidth
        />
        <CuButton
          TypographyProps={{
            variant: 'CaptionEmphasis',
            color: 'text.alternative',
          }}
          variant="text"
          action={handleMessageSearch}
          message="검색"
        />
      </Stack>
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
    <Stack spacing={'1.5rem'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant={'Title3Emphasis'}>대상 리스트 관리</Typography>
        <CuButton
          TypographyProps={{ variant: 'CaptionEmphasis' }}
          variant="text"
          action={() => setIsManageMode(false)}
          message="리스트로 돌아가기"
        />
      </Stack>
      <Stack
        direction={'row'}
        sx={style.manageBarStack}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        {isSelectedAll ? (
          <CuButton
            TypographyProps={{
              variant: 'CaptionEmphasis',
              color: 'text.alternative',
            }}
            variant="text"
            action={handleUnselectAll}
            message="전체 선택 해제"
          />
        ) : (
          <CuButton
            TypographyProps={{
              variant: 'CaptionEmphasis',
              color: 'text.alternative',
            }}
            variant="text"
            action={handleSelectAll}
            message="전체 선택"
          />
        )}
        <CuButton
          TypographyProps={{
            variant: 'CaptionEmphasis',
          }}
          variant="text"
          action={handleDelete}
          message="삭제"
        />
      </Stack>
    </Stack>
  )
}
