import type { Meta, StoryObj } from '@storybook/react'
  import { ArrowDown } from '@/icons'

  const meta: Meta<typeof ArrowDown> = {
    component: ArrowDown,
  }
  export default meta

  type Story = StoryObj<typeof ArrowDown>

  export const Default: Story = {}
