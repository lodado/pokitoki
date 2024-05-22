import { supabaseInstance } from '@/lib/supabase'

import { TopicConversation } from './type'

export async function getTopicConversations(): Promise<TopicConversation[]> {
  const { data, error } = await supabaseInstance
    .from('topic_conversations')
    .select('id, assistantId, description, title')
  if (error) {
    console.error('Error fetching topic conversations:', error)
    throw new Error('Failed to fetch topic conversations')
  }

  return data || []
}

const TopicRepository = { getTopicConversations }

export default TopicRepository
