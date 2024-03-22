import { ResponsiveLayout } from '@custompackages/designsystem'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ResponsiveLayout> = {
  title: 'Example/ResponsiveLayout',
  component: ResponsiveLayout,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    className: 'gap-5',
  },
}

export default meta
type Story = StoryObj<typeof ResponsiveLayout>

export const BasicResponsiveLayout: Story = {
  args: {
    children: <div className="h-screen bg-red-500" />,
  },
}
