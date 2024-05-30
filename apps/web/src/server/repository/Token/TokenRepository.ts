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
  const { error: upsertError } = await supabaseInstance
    .from('token_management')
    .update({ userId, token, updated_at: new Date() })
    .eq('userId', userId)

  if (upsertError) {
    throw upsertError
  }
}

const TokenRepository = { getTokenUsage, updateTokenUsage }

export { TokenRepository }
