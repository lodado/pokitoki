import { NextRequest, NextResponse } from 'next/server'

import ChatGptService from '@/server/service/chatgpt/ChatGptService'

const { getChatDetail, sendChat } = ChatGptService

export const GET = async (req: NextRequest) => {
  try {
    const threadId = req.nextUrl.searchParams.get('threadId')!
    const assistantId = req.nextUrl.searchParams.get('assistantId')!

    if (!threadId) throw new Error(`Could not find threadId`)
    if (!assistantId) throw new Error(`Could not find assistantId`)

    const messages = await getChatDetail(assistantId, threadId)
    return NextResponse.json({ data: messages })
  } catch (err) {
    console.log('error')

    return Response.json({}, { status: 400 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const { assistantId, threadId, message } = await req.json()
    if (!assistantId || !threadId || !message) throw new Error('invalid assistantId, threadId, message')

    const messages = await sendChat(assistantId, threadId, message)

    return NextResponse.json({ data: messages })
  } catch (e) {
    return Response.json({}, { status: 400 })
  }
}
