import type { Meta, StoryObj } from '@storybook/react'
    import { MessageIcon } from '@/icons/MyPage'

    const meta: Meta<typeof MessageIcon> = {
      component: MessageIcon,
    }
    export default meta

    type Story = StoryObj<typeof MessageIcon>

    export const Default: Story = {}
