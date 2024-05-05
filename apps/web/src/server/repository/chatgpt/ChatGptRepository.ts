import { OpenAI } from 'openai'

import { ChatMessage } from '@/app/api/chatgpt/message/type'
import { supabaseInstance } from '@/lib/supabase'

type MessageContentText = OpenAI.Beta.Threads.TextContentBlock

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export const ThreadPolling = async (assistantId: string, threadId: string, runId?: string) => {
  let waitCount = 0

  const run = runId
    ? { id: runId }
    : await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
        truncation_strategy: {
          type: 'last_messages',
          last_messages: 6,
        },
      })

  while (waitCount < 500) {
    // eslint-disable-next-line no-await-in-loop
    const { status } = await openai.beta.threads.runs.retrieve(threadId, run.id)

    if (status === 'completed') break
    // eslint-disable-next-line no-await-in-loop
    await sleep(1000)
    waitCount += 100
  }
}

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
  const { thread_id: threadId, id } = await openai.beta.threads.createAndRun({ assistant_id: assistantId })

  await ThreadPolling(assistantId, threadId, id)

  return threadId
}

export const getThreadMessages = async (
  assistantId: string,
  threadId: string,
  dataLimit: number,
  runRequired: boolean,
) => {
  if (runRequired) await ThreadPolling(assistantId, threadId)

  const { data: threadMessages } = await openai.beta.threads.messages.list(threadId, {
    limit: dataLimit,
  })

  if (!threadMessages || threadMessages.length === 0) {
    return []
  }

  const convertedMessages = threadMessages
    .map(({ id, created_at: createdAt, content }) => {
      return {
        id,
        createdAt,
        content: (content as MessageContentText[])[0]?.text.value,
      }
    })
    .filter(({ content }) => content)

  return convertedMessages as ChatMessage[]
}

export const createThreadMessage = async (assistantId: string, threadId: string, content: string) => {
  const { content: messageContents } = await openai.beta.threads.messages.create(threadId, { role: 'user', content })

  const messages = (messageContents as MessageContentText[]).map(({ text }) => text?.value)
  return messages
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
