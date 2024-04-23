/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import { BasicCard } from '@custompackages/designsystem'
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
      <BasicCard
        {...{
          id: 1,
          subTitle: 'apple',
          mainTitle: 'apple',
          alt: '1',
          url: 'https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/QBnOOoLaAfKPirc.png',
        }}
      />
    </div>
  )
}

export default Page
