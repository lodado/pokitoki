import { BasicCard } from '@custompackages/designsystem'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BasicCard> = {
  title: 'Example/Card',
  component: BasicCard,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof BasicCard>

export const CardExample: Story = {
  args: {
    id: 1,
    subTitle: 'apple',
    mainTitle: 'apple',
    alt: '1',
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  },
}
