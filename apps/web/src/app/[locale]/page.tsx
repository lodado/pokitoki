/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import { Card } from '@custompackages/designsystem'
import { useState } from 'react'

import { useI18n } from '@/lib/i18n'
import { getSpeech } from '@/lib/voice'

import Voice from './test/Voice'

const Page = () => {
  const [input, setInput] = useState('')
  const [responseList, setResponseList] = useState<any[]>([])

  const handleInput = (newInput: string) => {
    setInput(newInput)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    try {
      const res = await fetch('/api/chatgpt', {
        method: 'POST',
        body: JSON.stringify({ prompt: input }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = (await res.json()) as any

      setResponseList([...responseList, `request: ${input}, response : ${data.prompt}`])
      setInput('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Card
        variant="medium"
        subTitle="apple"
        mainTitle="apple"
        url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
        alt=""
      />
    </div>
  )
}

export default Page
