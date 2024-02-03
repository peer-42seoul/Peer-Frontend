import MenuItem from '@mui/material/MenuItem'
import Select, { SelectProps } from '@mui/material/Select'
import { Typography } from '@mui/material'
import { TControl } from '@/types/TControl'
import { FieldValues, useController } from 'react-hook-form'

type TProps<T extends FieldValues> = SelectProps & TControl<T>

const ControlledMemberSelect = <T extends FieldValues>(props: TProps<T>) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
  })

  return (
    <Select
      {...field}
      {...(props as SelectProps)}
      sx={{
        width: ['100%', '4.5rem'],
        backgroundColor: 'background.secondary',
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((value) => {
        return (
          <MenuItem key={value} value={value}>
            <Typography variant="Caption">{`${value}명`}</Typography>
          </MenuItem>
        )
      })}
    </Select>
  )
}

export default ControlledMemberSelect
