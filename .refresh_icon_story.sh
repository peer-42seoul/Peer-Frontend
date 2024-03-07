#!/bin/bash

# This script is used to refresh the icon storybook

# Get storybook code


# Go to the src directory
cd src

# Remove the old storybook
rm -rf ./stories/icons && mkdir ./stories/icons

# Get icons list
icons=$(awk 'BEGIN{ORS="\n"} {print $5}' ./icons/index.ts)

for icon in $icons
do
  echo "Creating story for $icon"
  # Create a new story for the icon
  echo "import type { Meta, StoryObj } from '@storybook/react'
  import { $icon } from '@/icons'

  const meta: Meta<typeof $icon> = {
    component: $icon,
  }
  export default meta

  type Story = StoryObj<typeof $icon>

  export const Default: Story = {}" > "./stories/icons/$icon.stories.tsx"
done

# Get sub directories
sub_dirs=$(cd ./icons &&ls -dF */ | tr -d '/')

echo "Sub directories: $sub_dirs"

for sub_dir in $sub_dirs
do
  # Make a new directory for the sub directory
  mkdir ./stories/icons/$sub_dir

  # Get icons list
  icons=$(awk 'BEGIN{ORS="\n"} {print $5}' ./icons/$sub_dir/index.ts)

  for icon in $icons
  do
    echo "Creating story for $icon"
    # Create a new story for the icon
    echo "import type { Meta, StoryObj } from '@storybook/react'
    import { $icon } from '@/icons/$sub_dir'

    const meta: Meta<typeof $icon> = {
      component: $icon,
    }
    export default meta

    type Story = StoryObj<typeof $icon>

    export const Default: Story = {}" > "./stories/icons/$sub_dir/$icon.stories.tsx"
  done
done
