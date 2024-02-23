import { SupabaseAdapter } from '@auth/supabase-adapter'

/**
 * 라이브러리가 타입을 export 안함 ㅠ
 */
const supaAdapter = {
  ...SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  }),
} as any

const findOrCreateUser = async ({ user, account }: any) => {
  console.log('findOrCreateUser', user, account)

  try {
    const row = await supaAdapter.getUser(user.id)

    if (row) {
      return true
    }
  } catch (e) {
    // 유저가 없으면 생성함
  }

  const { id } = (await supaAdapter.createUser(user)) as { id: string }
  account.userId = id
  await supaAdapter.linkAccount(account)

  return true
}

supaAdapter.findOrCreateUser = findOrCreateUser
export default supaAdapter
