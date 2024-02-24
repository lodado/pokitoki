import { SupabaseAdapter } from '@auth/supabase-adapter'

const supabaseAdapterWrapper = () => {
  const supaAdapter = SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }) as any

  const preprocessedUserData = ({ user, account }: any) => {
    const providerId = `prov@@#!#@${account?.provider}`

    return { ...user, id: user.id + providerId }
  }

  return () => {
    const findOrCreateUser = async ({ user, account }: any) => {
      const clonedUser = preprocessedUserData({ user, account })

      const row = await supaAdapter.getUserByAccount(account)

      // 이미 가입한 경우 pass, UX에 따라 수정해야할 수도 있음
      if (row) return true

      console.log('create user')

      const { id } = (await supaAdapter.createUser(clonedUser)) as { id: string }

      account.userId = id
      await supaAdapter.linkAccount(account)

      return true
    }

    return { ...supaAdapter, findOrCreateUser } as any
  }
}

const supabaseAdapterInstance =
  typeof window === 'undefined'
    ? supabaseAdapterWrapper()
    : () => {
        return () => {}
      }

export default supabaseAdapterInstance
