import type { Meta, StoryObj } from '@storybook/react'
    import { MyPageIcon } from '@/icons/Nav'

    const meta: Meta<typeof MyPageIcon> = {
      component: MyPageIcon,
    }
    export default meta

    type Story = StoryObj<typeof MyPageIcon>

    export const Default: Story = {}
