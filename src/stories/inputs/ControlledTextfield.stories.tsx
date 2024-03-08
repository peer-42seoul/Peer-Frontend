import type { Meta, StoryObj } from '@storybook/react'

import ControlledTextfield from '@/components/ControlledTextfield'
import WithRHF from '../utils/WithRHF'

const meta: Meta<typeof ControlledTextfield> = {
  component: ControlledTextfield,
  decorators: [WithRHF(false)],
}

export default meta

type Story = StoryObj<typeof ControlledTextfield>

export const Default: Story = {
  args: {
    name: 'name',
  },
}
