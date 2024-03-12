import { NextRequest, NextResponse } from 'next/server'

import { getLoginSession } from '@/hooks/login'
import ChatGptService from '@/server/service/chatgpt/ChatGptService'

const { getChats, createChat } = ChatGptService

export const GET = async (req: NextRequest) => {
  const assistantId = req.nextUrl.searchParams.get('assistantId')
  if (!assistantId) return Response.json(false)

  const { user } = await getLoginSession()
  const userId = user.id

  const threadIds = await getChats(userId, assistantId)
  return NextResponse.json(threadIds)
}

export const POST = async (req: NextRequest) => {
  const { assistantId, threadName } = await req.json()
  if (!assistantId) return Response.json(false)

  const { user } = await getLoginSession()
  const userId = user.id

  const threadId = await createChat(userId, assistantId, threadName)
  return NextResponse.json({ threadId, threadName })
}
