import type { Meta, StoryObj } from '@storybook/react'
  import { CheckBoxEmpty } from '@/icons'

  const meta: Meta<typeof CheckBoxEmpty> = {
    component: CheckBoxEmpty,
  }
  export default meta

  type Story = StoryObj<typeof CheckBoxEmpty>

  export const Default: Story = {}
