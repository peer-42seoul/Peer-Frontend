import { Typography } from '@mui/material'
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
            <Typography variant="Body2" color={'text.normal'}>
              {dueTo}
            </Typography>
          </MenuItem>
        ))
        break
      case ComponentType.TeamSize:
        options = Array.from({ length: 9 }, (_, index) => (
          <MenuItem key={index + 2} value={index + 2}>
            <Typography variant="Body2" color={'text.normal'}>
              {index + 2} 명
            </Typography>
          </MenuItem>
        ))
        break
      case ComponentType.Place:
        options = [
          <MenuItem key={0} value={'ONLINE'}>
            <Typography variant="Body2" color={'text.normal'}>
              온라인
            </Typography>
          </MenuItem>,
          <MenuItem key={1} value={'OFFLINE'}>
            <Typography variant="Body2" color={'text.normal'}>
              오프라인
            </Typography>
          </MenuItem>,
          <MenuItem key={2} value={'MIX'}>
            <Typography variant="Body2" color={'text.normal'}>
              혼합
            </Typography>
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
          borderWidth: '0',
          backgroundColor: 'background.tertiary',
          height: '2rem',
        }}
        {...props}
        placeholder="모집 인원을 입력하세요."
      >
        {options}
      </Select>
    )
  },
)

export default BasicSelect
