import { NextRequest, NextResponse } from 'next/server'

import ChatGptService from '@/server/service/chatgpt/ChatGptService'

const { getAssistants, createAssistant } = ChatGptService

export const GET = async () => {
  const assistants = await getAssistants()
  return NextResponse.json(assistants)
}

export const POST = async (req: NextRequest) => {
  const { name, instructions } = await req.json()
  if (!name || !instructions) return Response.json(false)
  const assistantId = await createAssistant({ name, instructions })
  return NextResponse.json(!!assistantId)
}
