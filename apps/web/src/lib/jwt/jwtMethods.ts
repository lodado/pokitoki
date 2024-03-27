import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'

import { JWT } from '@/server/service/auth/type'

const jwtMethods = {
  async encode({ token, secret, maxAge }: { secret?: string; token?: JWT & JwtPayload; maxAge?: number }) {
    try {
      const secretValue = secret ?? process.env.AUTH_SECRET
      // `jsonwebtoken`의 `sign` 메소드를 사용하여 토큰 인코딩
      let maxAgeValue = maxAge

      if (token!.exp) {
        maxAgeValue = Math.min(maxAgeValue!, Number(token!.exp))

        delete token!.exp
      }

      const encodedToken = jwt.sign(token!, secretValue!, { expiresIn: maxAgeValue })

      return encodedToken
    } catch (error) {
      console.error('Error encoding token:', error)
      throw error
    }
  },
  async decode({ token, secret }: { secret?: string; token?: string }) {
    try {
      const secretValue = secret ?? process.env.AUTH_SECRET
      const decoded = jwt.verify(token!, secretValue!)

      return decoded
    } catch (error) {
      // 디코딩 실패 시 null 반환
      return null
    }
  },
}

export default jwtMethods
