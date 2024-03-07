import type { Meta, StoryObj } from '@storybook/react'
  import { ArrowUp } from '@/icons'

  const meta: Meta<typeof ArrowUp> = {
    component: ArrowUp,
  }
  export default meta

  type Story = StoryObj<typeof ArrowUp>

  export const Default: Story = {}
