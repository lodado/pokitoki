import { OpenAI } from 'openai'

import { supabaseInstance } from '@/lib/supabase'

type MessageContentText = OpenAI.Beta.Threads.MessageContentText

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// ---------- openai func ----------

export const createAssistant = async (name: string, instructions: string) => {
  const { id: assistantId } = await openai.beta.assistants.create({
    name,
    instructions,
    model: 'gpt-3.5-turbo-1106',
    tools: [{ type: 'code_interpreter' }],
  })
  return assistantId
}

export const getAssistants = async () => {
  const { data: assistants } = await openai.beta.assistants.list()
  return assistants
}

export const createThread = async (assistantId: string) => {
  const { thread_id: threadId } = await openai.beta.threads.createAndRun({ assistant_id: assistantId })
  return threadId
}

export const getThreadMessages = async (threadId: string) => {
  const { data: threadMessages } = await openai.beta.threads.messages.list(threadId)
  return threadMessages as { content: MessageContentText[] }[]
}

export const createThreadMessage = async (threadId: string, content: string) => {
  const { content: messageContents } = await openai.beta.threads.messages.create(threadId, { role: 'user', content })
  return messageContents as MessageContentText[]
}

// TODO ---------------------------------------------------------

// ---------- supabase func ----------

// 사용자별 해당 튜터의 스레드(채팅방) 정보를 가져옴
export const getThreadIds = async (userId: string, assistantId: string) => {
  const { data: threadIds } = await supabaseInstance
    .from('threads')
    .select('threadId, threadName')
    .eq('userId', userId)
    .eq('assistantId', assistantId)
  return threadIds
}

// 사용자별 해당 튜터의 스레드(채팅방) 정보를 저장
export const insertThread = async (userId: string, assistantId: string, threadId: string, threadName: string) => {
  const { error } = await supabaseInstance
    .from('threads')
    .insert({ userId, assistantId, threadId, threadName } as never)

  return { isSuccess: !error, error }
}

// 사용자별 해당 튜터의 스레드(채팅방) 정보를 제거
export const deleteThread = async (userId: string, threadId: string) => {
  const { error } = await supabaseInstance.from('threads').delete().eq('userId', userId).eq('threadId', threadId)
  return { isSuccess: !error, error }
}

export default {
  createAssistant,
  getAssistants,
  createThread,
  getThreadMessages,
  createThreadMessage,
  getThreadIds,
  insertThread,
  deleteThread,
}
