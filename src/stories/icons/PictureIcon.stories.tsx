import type { Meta, StoryObj } from '@storybook/react'
  import { PictureIcon } from '@/icons'

  const meta: Meta<typeof PictureIcon> = {
    component: PictureIcon,
  }
  export default meta

  type Story = StoryObj<typeof PictureIcon>

  export const Default: Story = {}
