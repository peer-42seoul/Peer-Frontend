import { locationData } from '@/api/location'
import { FormControl, MenuItem, Typography } from '@mui/material'
import { TeamOperationForm } from '../../../types/types'
import CuSelect from '@/components/CuSelect'

export const dueList = [
  '1주일',
  '2주일',
  '3주일',
  '4주일',
  '1개월',
  '2개월',
  '3개월',
  '4개월',
  '5개월',
  '6개월',
  '7개월',
  '8개월',
  '9개월',
  '10개월',
  '11개월',
  '12개월 이상',
]

export const SettingSelect = ({
  type,
  value,
  parentLocation,
  setValue,
}: {
  type: string
  value: string
  parentLocation?: string
  setValue: (value: any) => void
}) => {
  if (type === 'location') {
    return (
      <FormControl sx={{ m: 0, minWidth: 80 }} size="small">
        <CuSelect value={value} setValue={setValue}>
          {!parentLocation &&
            locationData.map((region, idx) => (
              <MenuItem key={'region' + idx} value={region.name}>
                <Typography variant={'Caption'}>{region.name}</Typography>
              </MenuItem>
            ))}
          {parentLocation &&
            locationData
              .find((region) => region.name === parentLocation)
              ?.subArea?.map((region, idx) => (
                <MenuItem key={'region' + idx} value={region}>
                  <Typography variant={'Caption'}>{region}</Typography>
                </MenuItem>
              ))}
        </CuSelect>
      </FormControl>
    )
  } else if (type === 'operationForm') {
    return (
      <FormControl sx={{ m: 0, minWidth: 80 }} size="small">
        <CuSelect value={value} setValue={setValue}>
          {[
            TeamOperationForm.OFFLINE,
            TeamOperationForm.ONLINE,
            TeamOperationForm.MIX,
          ].map((operation, idx) => (
            <MenuItem key={'operation' + idx} value={operation}>
              <Typography variant={'Caption'}>
                {operation === TeamOperationForm.OFFLINE && '오프라인'}
                {operation === TeamOperationForm.ONLINE && '온라인'}
                {operation === TeamOperationForm.MIX && '온/오프라인'}
              </Typography>
            </MenuItem>
          ))}
        </CuSelect>
      </FormControl>
    )
  } else if (type === 'dueTo') {
    return (
      <FormControl sx={{ m: 0, minWidth: 80 }} size="small">
        <CuSelect value={value} setValue={setValue}>
          {dueList.map((dueTo, idx) => (
            <MenuItem key={'dueTo' + idx} value={dueTo}>
              <Typography variant={'Caption'}>{dueTo}</Typography>
            </MenuItem>
          ))}
        </CuSelect>
      </FormControl>
    )
  } else if (type == 'dueToSearch') {
    {
      return (
        <FormControl sx={{ m: 0, minWidth: 80 }} size="small">
          <CuSelect value={value ?? '선택안함'} setValue={setValue}>
            <MenuItem value={'선택안함'}>선택안함</MenuItem>
            {dueList.map((dueTo, idx) => (
              <MenuItem key={'dueTo' + idx} value={dueTo}>
                <Typography variant={'Caption'}>{dueTo}</Typography>
              </MenuItem>
            ))}
          </CuSelect>
        </FormControl>
      )
    }
  } else {
    return <div></div>
  }
}

export default SettingSelect
