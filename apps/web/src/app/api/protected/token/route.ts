import { NextRequest, NextResponse } from 'next/server'

import { getLoginSession } from '@/hooks/login'
import ConversationServiceInstance from '@/server/service/conversation/topic/ConversationService'
import TokenServiceInstance from '@/server/service/Token/TokenService'

const { getTokenUsage } = TokenServiceInstance

export const GET = async () => {
  try {
    const { user } = await getLoginSession()
    const userId = user.id

    const token = await getTokenUsage({ userId })
    return NextResponse.json({ token })
  } catch (e) {
    return Response.json({}, { status: 400 })
  }
}
