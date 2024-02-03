import { MenuItem, TextField, Typography } from '@mui/material'
import { ProjectSort } from '../MainPage'

interface ISelectSortProps {
  sort: ProjectSort | undefined
  setSort: (value: ProjectSort) => void
}

const SelectSort = ({ sort, setSort }: ISelectSortProps) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSort(event.target.value as ProjectSort)
  }

  return (
    <>
      <TextField
        select
        size="small"
        value={sort ?? 'latest'}
        onChange={(e) => handleChange(e)}
        sx={{ m: 1, minWidth: 120 }}
      >
        <MenuItem value={'latest'}>
          <Typography variant={'Caption'}>최신순</Typography>
        </MenuItem>
        <MenuItem value={'hit'}>
          <Typography variant={'Caption'}>인기순</Typography>
        </MenuItem>
      </TextField>
    </>
  )
}

export default SelectSort
