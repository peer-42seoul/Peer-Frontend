import CuButton from '@/components/CuButton'
import { IconButton, InputBase, Stack, Typography } from '@mui/material'
import SearchIcon from '@/icons/SearchIcon'
import * as style from './MessageBar.style'
import { PlusIcon } from '@/icons'

interface IContainerHeaderProps {
  isPc: boolean
  isManageMode: boolean
  setIsManageMode: (isManageMode: boolean) => void
  openNewMessageModal: () => void
}

interface ISearchBarProps {
  isPc: boolean
  setSearchKeyword: (keyword: string) => void
  handleMessageSearch: () => void
}

interface IManageBarProps {
  isSelectedAll: boolean
  handleSelectAll: () => void
  handleUnselectAll: () => void
  handleDelete: () => void
}

export const ContainerHeader = ({
  isPc,
  isManageMode,
  setIsManageMode,
  openNewMessageModal,
}: IContainerHeaderProps) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Typography variant={isPc ? 'Title3Emphasis' : 'Body1Emphasis'}>
        {isManageMode ? '대상 리스트 관리' : '대상 리스트'}
      </Typography>
      {isManageMode ? (
        <CuButton
          TypographyProps={{ variant: 'CaptionEmphasis' }}
          variant="text"
          action={() => setIsManageMode(false)}
          message="리스트로 돌아가기"
        />
      ) : isPc ? (
        <CuButton
          TypographyProps={{ variant: 'CaptionEmphasis' }}
          variant="text"
          action={() => setIsManageMode(true)}
          message="관리"
        />
      ) : (
        <IconButton onClick={openNewMessageModal}>
          <PlusIcon width={'1.5rem'} height={'1.5rem'} />
        </IconButton>
      )}
    </Stack>
  )
}

export const SearchBar = ({
  setSearchKeyword,
  handleMessageSearch,
  isPc,
}: ISearchBarProps) => {
  return (
    <Stack spacing={'1.5rem'}>
      <Stack
        sx={isPc ? style.pcSearchWrapper : style.mobileSearchWrapper}
        direction={'row'}
        alignItems={'center'}
        spacing={'0.38rem'}
      >
        <SearchIcon width={'1.25rem'} height={'1.25rem'} />
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

export const ManageBar = ({
  isSelectedAll,
  handleSelectAll,
  handleUnselectAll,
  handleDelete,
}: IManageBarProps) => {
  return (
    <Stack spacing={'1.5rem'}>
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
