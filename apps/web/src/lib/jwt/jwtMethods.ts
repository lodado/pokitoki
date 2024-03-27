// eslint-disable-next-line import/no-extraneous-dependencies
import { JWTPayload, jwtVerify, SignJWT } from 'jose'

import { JWT } from '@/server/service/auth/type'

const jwtMethods = {
  async encode({ token, secret, maxAge }: { secret?: string; token?: JWT & JWTPayload; maxAge?: number }) {
    try {
      const secretValue = new TextEncoder().encode(secret ?? process.env.AUTH_SECRET)
      // `jsonwebtoken`의 `sign` 메소드를 사용하여 토큰 인코딩
      let maxAgeValue = maxAge

      // @ts-ignore
      if (token!.exp) {
        maxAgeValue = Math.min(maxAgeValue!, Number(token!.exp))

        delete token!.exp
      }

      const encodedToken = new SignJWT(token)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(secretValue)

      return encodedToken
    } catch (error) {
      console.error('Error encoding token:', error)
      throw error
    }
  },
  async decode({ token, secret }: { secret?: string; token?: any }) {
    try {
      const secretValue = new TextEncoder().encode(secret ?? process.env.AUTH_SECRET)
      const decoded = await jwtVerify(token!, secretValue!)

      return decoded
    } catch (error) {
      // 디코딩 실패 시 null 반환
      return null
    }
  },
}

export default jwtMethods
