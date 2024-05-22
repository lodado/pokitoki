import { NextRequest, NextResponse } from 'next/server'

import { getLoginSession } from '@/hooks/login'
import { ChatGptRepository } from '@/server/repository'
import { ChatGptService } from '@/server/service/chatgpt'
import ConversationServiceInstance from '@/server/service/conversation/topic/ConversationService'

const { getThreadRecentHistory } = ChatGptService

export const GET = async () => {
  try {
    const { user } = await getLoginSession()
    const userId = user.id

    const topics = await getThreadRecentHistory({ userId })
    return NextResponse.json({ topics })
  } catch (e) {
    console.log(e)

    return Response.json({}, { status: 400 })
  }
}
