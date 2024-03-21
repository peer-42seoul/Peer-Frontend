import { MenuItem, Typography } from '@mui/material'
import CuSelect from '@/components/CuSelect'
import useMainOptionsStore from '@/states/main-page/useMainOptionsStore'

const SelectSort = () => {
  const { sort, setSort } = useMainOptionsStore()

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
