import MenuItem from '@mui/material/MenuItem'
import Select, { SelectProps } from '@mui/material/Select'
import { Dispatch, SetStateAction, forwardRef } from 'react'

export enum ComponentType {
  Month = 'Month',
  TeamSize = 'TeamSize',
  Place = 'Place',
}

interface IBasicSelectProps extends SelectProps {
  type: ComponentType
  value?: string
  setvalue?: Dispatch<SetStateAction<string>>
}

const BasicSelect = forwardRef<HTMLInputElement, IBasicSelectProps>(
  function BasicSelect(props: IBasicSelectProps, ref) {
    let options = null

    switch (props.type) {
      case ComponentType.Month:
        options = [
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
        ].map((dueTo, idx) => (
          <MenuItem key={'dueTo' + idx} value={dueTo}>
            {dueTo}
          </MenuItem>
        ))
        break
      case ComponentType.TeamSize:
        options = Array.from({ length: 9 }, (_, index) => (
          <MenuItem key={index + 2} value={index + 2}>
            {index + 2}
          </MenuItem>
        ))
        break
      case ComponentType.Place:
        options = [
          <MenuItem key={0} value={'ONLINE'}>
            온라인
          </MenuItem>,
          <MenuItem key={1} value={'OFFLINE'}>
            오프라인
          </MenuItem>,
          <MenuItem key={2} value={'MIX'}>
            혼합
          </MenuItem>,
        ]
        break
      default:
        return null
    }

    return (
      <Select
        ref={ref}
        sx={{
          width: ['100%', '26rem'],
          height: '2rem',
          backgroundColor: 'background.tertiary',
          borderWidth: '0',
        }}
        style={{ borderColor: 'none' }}
        variant="outlined"
        {...props}
      >
        {options}
      </Select>
    )
  },
)

export default BasicSelect
