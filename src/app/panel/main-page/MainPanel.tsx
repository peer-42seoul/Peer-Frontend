import SearchOption from '@/app/panel/main-page/SearchOption'
import { Box, CircularProgress, Grid, Stack } from '@mui/material'
import SelectSort from '@/app/panel/main-page/SelectSort'
import { ProjectType } from '@/types/IPostDetail'
import { IDetailOption, ProjectSort } from '@/app/panel/MainPage'
import { RefObject } from 'react'

interface ISearchOptionPanel {
  openOption: boolean
  setOpenOption: (value: boolean) => void
  handleOption: (value: IDetailOption) => void
  type: ProjectType | undefined
  sort: ProjectSort | undefined
  handleSort: (value: ProjectSort) => void
  isPc?: boolean
}

//SearchOption(세부옵션)과 SelectSort(정렬)를 합친 컴포넌트
const SearchOptionPanel = ({
  openOption,
  setOpenOption,
  handleOption,
  type,
  sort,
  handleSort,
  isPc,
}: ISearchOptionPanel) => {
  return (
    <>
      <Grid container bgcolor={isPc ? 'Background.primary' : undefined}>
        <SearchOption
          openOption={openOption}
          setOpenOption={setOpenOption}
          setDetailOption={handleOption}
          type={type}
        />
      </Grid>
      <Stack direction="row" alignItems={'center'} justifyContent={'flex-end'}>
        <SelectSort sort={sort} setSort={handleSort} />
      </Stack>
    </>
  )
}

interface IInfinityScrollPanel {
  spinner: boolean
  target: RefObject<HTMLDivElement>
}

export const InfinityScrollPanel = ({
  spinner,
  target,
}: IInfinityScrollPanel) => {
  return spinner ? (
    <CircularProgress />
  ) : (
    <Box
      sx={{
        bottom: 0,
        height: '1vh',
      }}
      ref={target}
    />
  )
}

export default SearchOptionPanel
