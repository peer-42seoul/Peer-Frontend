import type { Meta, StoryObj } from '@storybook/react'
  import { ClipboardIcon } from '@/icons'

  const meta: Meta<typeof ClipboardIcon> = {
    component: ClipboardIcon,
  }
  export default meta

  type Story = StoryObj<typeof ClipboardIcon>

  export const Default: Story = {}
