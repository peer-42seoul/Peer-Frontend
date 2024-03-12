import type { Meta, StoryObj } from '@storybook/react'

import TextFieldWithLabel from '@/components/TextFieldWithLabel'
import { TagIcon } from '@/icons'

const meta: Meta<typeof TextFieldWithLabel> = {
  component: TextFieldWithLabel,
}

export default meta

type Story = StoryObj<typeof TextFieldWithLabel>

export const Default: Story = {
  args: {
    label: 'Label',
    size: 'medium',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Label',
    label_icon: (
      <TagIcon
        sx={{
          color: 'text.normal',
          height: '1rem',
          width: '1rem',
        }}
      />
    ),
    size: 'medium',
  },
}
