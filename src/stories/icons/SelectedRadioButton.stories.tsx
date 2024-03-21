import type { Meta, StoryObj } from '@storybook/react'
  import { SelectedRadioButton } from '@/icons'

  const meta: Meta<typeof SelectedRadioButton> = {
    component: SelectedRadioButton,
  }
  export default meta

  type Story = StoryObj<typeof SelectedRadioButton>

  export const Default: Story = {}
