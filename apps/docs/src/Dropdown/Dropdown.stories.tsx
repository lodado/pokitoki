import { Dropdown } from '@custompackages/designsystem'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Dropdown> = {
  title: 'example/Dropdown',
  component: Dropdown,
  argTypes: {},
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Dropdown>

export const DropdownExample: Story = {
  args: {
    children: (
      <>
        <Dropdown>
          <Dropdown.Trigger>
            <button type="button">trigger dropdown !</button>
          </Dropdown.Trigger>

          <Dropdown.Content>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </>
    ),
  },
}
