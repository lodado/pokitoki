import { Form } from '@custompackages/designsystem'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Form> = {
  title: 'example/Form',
  component: Form,
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Form>

export const FormExample: Story = {
  render: () => {
    return (
      <Form>
        <Form.Field className="FormField" name="email">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Email</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your email
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="email" required />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="question">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Question</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter a question
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea className="Textarea" required />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button type="submit" className="Button" style={{ marginTop: 10 }}>
            Post question
          </button>
        </Form.Submit>
      </Form>
    )
  },
}
