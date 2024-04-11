import SearchOption from '@/app/panel/main-page/SearchOption'
import { Grid, Stack } from '@mui/material'
import SelectSort from '@/app/panel/main-page/SelectSort'
import { ProjectSort, ProjectType } from '@/types/IPostDetail'

interface ISearchOptionPanel {
  type: ProjectType
  sort: ProjectSort | undefined
  handleSort: (value: ProjectSort) => void
  isPc?: boolean
}

//SearchOption(세부옵션)과 SelectSort(정렬)를 합친 컴포넌트
const SearchOptionPanel = ({ type, isPc }: ISearchOptionPanel) => {
  return (
    <>
      <Grid container bgcolor={isPc ? 'Background.primary' : undefined}>
        <SearchOption type={type} />
      </Grid>
      <Stack direction="row" alignItems={'center'} justifyContent={'flex-end'}>
        <SelectSort />
      </Stack>
    </>
  )
}

export default SearchOptionPanel
