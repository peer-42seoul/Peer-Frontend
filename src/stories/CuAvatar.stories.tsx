import type { Meta, StoryObj } from '@storybook/react'

import CuAvatar from '../components/CuAvatar'
// import { AvatarProps } from '@mui/material'

const meta: Meta<typeof CuAvatar> = {
  component: CuAvatar,
}

export default meta

type Story = StoryObj<typeof CuAvatar>

export const Basic: Story = {}

export const Primary: Story = {
  args: {
    src: 'https://picsum.photos/32',
  },
}
