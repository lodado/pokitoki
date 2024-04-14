import { PokiTokiNavigation } from '@pokitoki/web'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PokiTokiNavigation> = {
  title: 'Example/Navigation',
  component: PokiTokiNavigation,
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof PokiTokiNavigation>

export const NavigationExample: Story = {
  args: {},
}
