import { NextRequest, NextResponse } from 'next/server'

import { getLoginSession } from '@/hooks/login'
import ChatGptService from '@/server/service/chatgpt/ChatGptService'

const { getChats, createChat, deleteChat } = ChatGptService

export const GET = async (req: NextRequest) => {
  const assistantId = req.nextUrl.searchParams.get('assistantId')
  if (!assistantId) return Response.json({ success: false })

  const { user } = await getLoginSession()
  const userId = user.id

  const threads = await getChats(userId, assistantId)
  return NextResponse.json({ success: true, data: threads })
}

export const POST = async (req: NextRequest) => {
  const { assistantId, threadName } = await req.json()
  if (!assistantId) return Response.json({ success: false })

  const { user } = await getLoginSession()
  const userId = user.id

  const threadId = await createChat(userId, assistantId, threadName)
  return NextResponse.json({ success: true, data: threadId })
}

export const DELETE = async (req: NextRequest) => {
  const threadId = req.nextUrl.searchParams.get('threadId')
  if (!threadId) return Response.json({ success: false })

  const { user } = await getLoginSession()
  const userId = user.id

  const result = await deleteChat(userId, threadId)
  return NextResponse.json({ success: result })
}
