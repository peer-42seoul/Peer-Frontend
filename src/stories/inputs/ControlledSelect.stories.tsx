import type { Meta, StoryObj } from '@storybook/react'
import ControlledSelect from '@/components/ControlledSelect'
import { MenuItem } from '@mui/material'
import WithRHF from '../utils/WithRHF'

const meta: Meta<typeof ControlledSelect> = {
  component: ControlledSelect,
  decorators: [WithRHF(false)],
}

export default meta

type Story = StoryObj<typeof ControlledSelect>

export const Default: Story = {
  args: {
    name: 'name',
    sx: {
      height: '2rem',
      backgroundColor: 'background.tertiary',
      color: 'text.alternative',
      size: '12px',
      align: 'center',
      lineHeight: '18px',
      fontWeight: 400,
    },
    placeholder: '선택지를 입력해주세요.',
    variant: 'outlined',
    children: [
      <MenuItem
        key="1"
        value="1"
        sx={{
          color: 'text.alternative',
          size: '12px',
          align: 'center',
          lineHeight: '18px',
          fontWeight: 400,
        }}
      >
        menu item 1
      </MenuItem>,
      <MenuItem
        key="2"
        value="2"
        sx={{
          color: 'text.alternative',
          size: '12px',
          align: 'center',
          lineHeight: '18px',
          fontWeight: 400,
        }}
      >
        menu item 2
      </MenuItem>,
    ],
  },
}
