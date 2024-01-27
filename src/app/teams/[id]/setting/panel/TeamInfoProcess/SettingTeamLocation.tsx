import { MenuItem, Select, Stack, Typography } from '@mui/material'
import { GeoClearIcon } from '../Icons'
import { Control, Controller } from 'react-hook-form'
import { locationData } from '@/api/location'
import { ISetupTeam } from '../SettingTeamInfo'

interface ISettingTeamLocation {
  teamLocation: string[]
  control: Control<ISetupTeam, any>
}

const SettingTeamLocation = ({
  teamLocation,
  control,
}: ISettingTeamLocation) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={'0.5rem'}
      mx={'0.5rem'}
    >
      <Stack direction={'row'} alignItems={'flex-start'} spacing={'0.35rem'}>
        <GeoClearIcon />
        <Typography>활동지역</Typography>
      </Stack>
      <Stack direction={'row'} spacing={1}>
        <Controller
          name="region.0"
          control={control}
          defaultValue={teamLocation[0]}
          render={({ field }) => (
            <Select
              size="small"
              variant="outlined"
              defaultValue={teamLocation[0]}
              sx={{
                m: 0,
                minWidth: '8rem',
              }}
              {...field}
            >
              {locationData.map((region) => (
                <MenuItem key={region.name} value={region.name}>
                  {region.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="region.1"
          control={control}
          defaultValue={teamLocation[1]}
          render={({ field }) => (
            <Select
              size="small"
              variant="outlined"
              defaultValue={teamLocation[1]}
              sx={{
                m: 0,
                minWidth: '8rem',
              }}
              {...field}
            >
              {locationData.find((region) => region.name === teamLocation[0])
                ?.subArea ? (
                locationData
                  .find((region) => region.name === teamLocation[0])
                  ?.subArea?.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))
              ) : (
                <MenuItem key={'region'} value={''}></MenuItem>
              )}
            </Select>
          )}
        />
      </Stack>
    </Stack>
  )
}

export default SettingTeamLocation
