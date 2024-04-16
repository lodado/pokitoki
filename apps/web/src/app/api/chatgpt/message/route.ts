import { NextRequest, NextResponse } from 'next/server'

import ChatGptService from '@/server/service/chatgpt/ChatGptService'

const { getChatDetail, sendChat } = ChatGptService

export const GET = async (req: NextRequest) => {
  const threadId = req.nextUrl.searchParams.get('threadId')
  if (!threadId) return Response.json({ success: false })

  const messages = await getChatDetail(threadId)
  return NextResponse.json({ success: true, data: messages })
}

export const POST = async (req: NextRequest) => {
  const { threadId, message } = await req.json()
  if (!threadId || !message) return Response.json({ success: false })

  const messages = await sendChat(threadId, message)
  return NextResponse.json({ success: true, data: messages })
}
