import { Checkbox, CheckboxProps, SxProps } from '@mui/material'
import { CheckBoxEmpty, CheckBoxSelected } from '@/icons'

interface ICheckboxProps extends CheckboxProps {
  iconSx?: SxProps // 아이콘에 설정할 sx
}

export const CuCheckbox = (props: ICheckboxProps) => {
  return (
    <Checkbox
      {...props}
      icon={
        <CheckBoxEmpty sx={{ color: 'text.alternative', ...props.iconSx }} />
      }
      checkedIcon={
        <CheckBoxSelected sx={{ color: 'text.alternative', ...props.iconSx }} />
      }
    />
  )
}

export default CuCheckbox
