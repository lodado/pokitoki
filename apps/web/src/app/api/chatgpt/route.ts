/* eslint-disable no-await-in-loop */
import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const assistant = await openai.beta.assistants.retrieve('asst_1Y8I9ESwC8uEQ5jIoR4X8e8O') // TO DO - tutor 별로 assistant 생성
const thread = await openai.beta.threads.retrieve('thread_Cd6Rkq6vQJPCAsOUUbPkReJJ') // TO DO - 유저 대화창별로 thread 생성
async function handler(req: NextRequest, res: any) {
  try {
    const body = await req.json()

    const { excelJSON, prompt } = body

    const message = await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: prompt,
    })

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    })

    let cnt = 0

    // TO DO - polling logic 업그레이드
    while (cnt < 1000) {
      const { status } = await openai.beta.threads.runs.retrieve(thread.id, run.id)

      if (status === 'completed') break
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 500)
      })
      cnt += 10
    }

    const messages = await openai.beta.threads.messages.list(thread.id)
    // @ts-ignore
    const responseText = messages.data[0].content[0].text.value
    console.log(JSON.stringify(responseText), responseText)

    return NextResponse.json(
      { prompt: responseText },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.log('error', error)

    return NextResponse.json(
      // @ts-ignore
      { message: error?.message },
      {
        status: 400,
      },
    )
  }
}

export { handler as POST }
