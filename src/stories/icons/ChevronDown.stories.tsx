import type { Meta, StoryObj } from '@storybook/react'
  import { ChevronDown } from '@/icons'

  const meta: Meta<typeof ChevronDown> = {
    component: ChevronDown,
  }
  export default meta

  type Story = StoryObj<typeof ChevronDown>

  export const Default: Story = {}
