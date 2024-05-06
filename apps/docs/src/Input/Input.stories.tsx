import { Input } from '@custompackages/designsystem'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Input> = {
  title: 'example/Input',
  component: Input,
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Input>

export const InputExample: Story = {
  args: {
    placeholder: 'example',
    disabled: false,
    readOnly: false,
    'data-invalid': false,
  },
}
