import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ProjectSort } from './MainPage'

interface ISelectSortProps {
  sort: ProjectSort | undefined
  setSort: (value: ProjectSort) => void
}

const SelectSort = ({ sort, setSort }: ISelectSortProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as ProjectSort)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select value={sort ?? 'latest'} onChange={handleChange}>
        <MenuItem value={'latest'}>최신순</MenuItem>
        <MenuItem value={'hit'}>인기순</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SelectSort
