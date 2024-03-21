import type { Meta, StoryObj } from '@storybook/react'
  import { AccountBox } from '@/icons'

  const meta: Meta<typeof AccountBox> = {
    component: AccountBox,
  }
  export default meta

  type Story = StoryObj<typeof AccountBox>

  export const Default: Story = {}
