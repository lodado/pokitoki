import { NextRequest, NextResponse } from 'next/server'

import ConversationServiceInstance from '@/server/service/conversation/ConversationService'

const { getTopicConversation } = ConversationServiceInstance

export const GET = async () => {
  try {
    const topics = await getTopicConversation()
    return NextResponse.json({ topics })
  } catch (e) {
    return Response.json({}, { status: 400 })
  }
}
