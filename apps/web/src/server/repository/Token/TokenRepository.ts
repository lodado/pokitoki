import { supabaseInstance } from '@/lib/supabase'

import { Token } from './type'

async function getTokenUsage({ userId }: { userId: string }): Promise<Token> {
  const { data, error } = await supabaseInstance.from('token_management').select('token').eq('userId', userId)

  if (error) {
    console.error('Error fetching token usage:', error)
    throw error
  }

  return data.length > 0 ? data[0] : { token: 0 }
}

async function updateTokenUsage({ userId, token }: { userId: string; token: number }) {
  const { error } = await supabaseInstance
    .from('token_management')
    .upsert({ userId, token, updated_at: new Date() }, { onConflict: 'userId' })

  if (error) {
    throw error
  }
}

const TokenRepository = { getTokenUsage, updateTokenUsage }

export { TokenRepository }
