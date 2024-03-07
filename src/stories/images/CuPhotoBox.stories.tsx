import type { Meta, StoryObj } from '@storybook/react'

import CuPhotoBox from '@/components/CuPhotoBox'

const meta: Meta<typeof CuPhotoBox> = {
  component: CuPhotoBox,
  decorators: [
    (Story: any) => {
      return (
        <div style={{ margin: '3em', width: '10rem', height: '15rem' }}>
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
    src: 'https://picsum.photos/200/300',
    alt: 'Image',
    imgStyle: {
      width: '100%',
      height: '100%',
    },
  },
}

export const Fallback: Story = {
  args: {
    src: '',
    alt: 'Image',
    imgStyle: {
      width: '100%',
      height: '100%',
    },
  },
}
