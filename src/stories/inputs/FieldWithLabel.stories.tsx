import type { Meta, StoryObj } from '@storybook/react'

import FieldWithLabel from '@/components/FieldWithLabel'
import { PlusIcon, TagIcon } from '@/icons'
import { IconButton } from '@mui/material'

const meta: Meta<typeof FieldWithLabel> = {
  component: FieldWithLabel,
}

export default meta

type Story = StoryObj<typeof FieldWithLabel>

export const Default: Story = {
  render: (args) => (
    <FieldWithLabel {...args}>
      <input type="text" />
    </FieldWithLabel>
  ),
  args: {
    label: 'Label',
  },
}

export const WithIcon: Story = {
  render: (args) => (
    <FieldWithLabel {...args}>
      <input type="text" />
    </FieldWithLabel>
  ),
  args: {
    label: 'Label',
    labelIcon: (
      <TagIcon
        sx={{
          color: 'text.strong',
          height: '1rem',
          width: '1rem',
        }}
      />
    ),
  },
}

export const WithError: Story = {
  render: (args) => (
    <FieldWithLabel {...args}>
      <input type="text" />
    </FieldWithLabel>
  ),
  args: {
    label: 'Label',
    formHelperText: 'Error message',
  },
}

export const WithEndButton: Story = {
  render: (args) => (
    <FieldWithLabel
      {...args}
      endIconButton={
        <IconButton>
          <PlusIcon
            sx={{
              color: 'text.strong',
              height: '1rem',
              width: '1rem',
            }}
          />
        </IconButton>
      }
    >
      <input type="text" />
    </FieldWithLabel>
  ),
  args: {
    label: 'Label',
  },
}
