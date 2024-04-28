import { NextRequest, NextResponse } from 'next/server'

import ChatGptService from '@/server/service/chatgpt/ChatGptService'

const { getChatDetail, sendChat } = ChatGptService

export const GET = async (req: NextRequest) => {
  const threadId = req.nextUrl.searchParams.get('threadId')!
  const assistantId = req.nextUrl.searchParams.get('assistantId')!

  if (!threadId) return Response.json({ success: false })

  const messages = await getChatDetail(assistantId, threadId)
  return NextResponse.json({ success: true, data: messages })
}

export const POST = async (req: NextRequest) => {
  try {
    const { threadId, message } = await req.json()
    if (!threadId || !message) throw new Error('invalid threadId, message')

    const messages = await sendChat(threadId, message)

    return NextResponse.json({ data: messages })
  } catch (e) {
    return Response.json({}, { status: 400 })
  }
}
