import { NextRequest, NextResponse } from 'next/server'

import ChatGptService from '@/server/service/chatgpt/ChatGptService'

const { getTutors, createTutor } = ChatGptService

export const GET = async () => {
  const assistants = await getTutors()
  return NextResponse.json({ success: !!assistants, data: assistants })
}

export const POST = async (req: NextRequest) => {
  const { name, instructions } = await req.json()
  if (!name || !instructions) return Response.json({ success: false })

  const assistantId = await createTutor({ name, instructions })
  return NextResponse.json({ success: !!assistantId })
}
