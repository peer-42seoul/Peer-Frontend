import type { Meta, StoryObj } from '@storybook/react'

import CuPhotoBox from '@/components/CuPhotoBox'

const meta: Meta<typeof CuPhotoBox> = {
  component: CuPhotoBox,
  decorators: [
    (Story: any) => {
      return (
        <div style={{ margin: '3em', width: '15rem', height: '10rem' }}>
          <Story />
        </div>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof CuPhotoBox>

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/300/200',
    alt: 'Image',
  },
}

export const Fallback: Story = {
  args: {
    src: 'not found image url',
    alt: 'Image',
  },
}
