import { Card } from '@custompackages/designsystem'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Card> = {
  title: 'Example/Card',
  component: Card,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['small', 'xsmall', 'medium', 'large'] },
    },
    subTitle: { control: 'text' },
    mainTitle: { control: 'text' },
    alt: { control: 'text' },
    url: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const CardExample: Story = {
  args: {
    variant: 'large',
    id: 1,
    subTitle: 'apple',
    mainTitle: 'apple',
    alt: '1',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  },
}
