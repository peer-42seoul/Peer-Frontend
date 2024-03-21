import type { Meta, StoryObj } from '@storybook/react'
  import { ImageIcon } from '@/icons'

  const meta: Meta<typeof ImageIcon> = {
    component: ImageIcon,
  }
  export default meta

  type Story = StoryObj<typeof ImageIcon>

  export const Default: Story = {}
