import SearchOption from '@/app/panel/main-page/SearchOption'
import { Grid, Stack } from '@mui/material'
import SelectSort from '@/app/panel/main-page/SelectSort'
import { ProjectType } from '@/types/IPostDetail'
import { ProjectSort } from '@/app/panel/MainPage'

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

// interface IInfinityScrollPanel {
//   spinner: boolean
//   target: RefObject<HTMLDivElement>
// }
//
// export const InfinityScrollPanel = ({
//   spinner,
//   target,
// }: IInfinityScrollPanel) => {
//   return spinner ? (
//     <CircularProgress />
//   ) : (
//     <Box
//       sx={{
//         bottom: 0,
//         height: '1vh',
//         paddingY: '0.25rem',
//       }}
//       ref={target}
//     />
//   )
// }

export default SearchOptionPanel
