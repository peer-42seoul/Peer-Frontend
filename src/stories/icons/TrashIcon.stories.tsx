import type { Meta, StoryObj } from '@storybook/react'
  import { TrashIcon } from '@/icons'

  const meta: Meta<typeof TrashIcon> = {
    component: TrashIcon,
  }
  export default meta

  type Story = StoryObj<typeof TrashIcon>

  export const Default: Story = {}
