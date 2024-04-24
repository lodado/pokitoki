import { Badge } from '@custompackages/designsystem'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Badge> = {
  title: 'example/Badge',
  component: Badge,
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Badge>

export const NavigationExample: Story = {
  args: {
    children: (
      <>
        <div style={{ width: '4px', height: '4px', background: 'white' }}> </div> <span>test text</span>
      </>
    ),
  },
}
