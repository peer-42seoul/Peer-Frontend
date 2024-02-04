import { MenuItem, Typography } from '@mui/material'
import { ProjectSort } from '../MainPage'
import CuSelect from '@/components/CuSelect'

interface ISelectSortProps {
  sort: ProjectSort | undefined
  setSort: (value: ProjectSort) => void
}

const SelectSort = ({ sort, setSort }: ISelectSortProps) => {
  return (
    <CuSelect value={sort ?? 'latest'} setValue={setSort}>
      <MenuItem value={'latest'}>
        <Typography variant={'Caption'}>최신순</Typography>
      </MenuItem>
      <MenuItem value={'hit'}>
        <Typography variant={'Caption'}>인기순</Typography>
      </MenuItem>
    </CuSelect>
  )
}

export default SelectSort
