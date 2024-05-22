import { NextRequest, NextResponse } from 'next/server'

import { getLoginSession } from '@/hooks/login'
import ChatGptService from '@/server/service/chatgpt/ChatGptService'

const { getChatsByAssistantId, createChat, deleteChat } = ChatGptService

export const GET = async (req: NextRequest) => {
  try {
    const assistantId = req.nextUrl.searchParams.get('assistantId')
    if (!assistantId) throw new Error('Invalid assistant Id')

    const { user } = await getLoginSession()
    const userId = user.id

    const threads = await getChatsByAssistantId(userId, assistantId)
    return NextResponse.json({ threads })
  } catch (e) {
    console.log('error', e)

    return Response.json({}, { status: 400 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const { assistantId, threadName, threadCategory } = await req.json()
    if (!assistantId) throw new Error('Invalid assistant Id')

    const { user } = await getLoginSession()
    const userId = user.id

    const threadId = await createChat(userId, assistantId, threadName, threadCategory)

    return NextResponse.json({ threadId })
  } catch (e) {
    return Response.json({}, { status: 400 })
  }
}

export const DELETE = async (req: NextRequest) => {
  const threadId = req.nextUrl.searchParams.get('threadId')
  if (!threadId) return Response.json({ success: false })

  const { user } = await getLoginSession()
  const userId = user.id

  const result = await deleteChat(userId, threadId)
  return NextResponse.json({ success: result })
}
