/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import { useState } from 'react'

import { SupabaseImage } from '@/components'
import { useI18n } from '@/lib/i18n'
import { getSpeech } from '@/lib/voice'

import Voice from './test/Voice'

const Page = () => {
  const t = useI18n('Index')

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
      <h1>{t('title')}</h1>

      <Voice onChange={handleInput} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
      <p>
        Response:{' '}
        {responseList.map((ele) => (
          <div
            onClick={() => {
              getSpeech(ele)
            }}
          >
            {ele}
          </div>
        ))}
      </p>
    </div>
  )
}

export default Page
