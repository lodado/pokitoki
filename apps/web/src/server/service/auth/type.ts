import { Account, User } from 'next-auth'

export type JWT = {
  user: User
  account: Account
  error?: string

  userId: string
  expiresAt: number
  accessToken: string
  refreshToken?: string // 깃허브는 존재하지 않음
  provider: 'github' | 'kakao' | 'google' | 'naver'
}
