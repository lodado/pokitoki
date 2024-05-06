import { Input } from '@custompackages/designsystem'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Input> = {
  title: 'example/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Input>

/**
 * ## 설치
 * 
 * 프로젝트에 @custompackages/designsystem이 설치되어 있는지 확인하세요.
 * 
 * 다음과 같이 Input 컴포넌트를 임포트할 수 있습니다
 * 
    ```jsx

     import { Input } from '@custompackages/designsystem'; 
     
     ```
     사용 예시는 Form Storybook을 참고 바랍니다 

     <br/>

     ### Props
 */
export const InputExample: Story = {
  args: {
    placeholder: 'example',
    disabled: false,
    readOnly: false,
    'data-invalid': false,
  },
}
