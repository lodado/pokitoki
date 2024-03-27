import { NextAuthSessionResponse } from '@/server/service/auth/AuthService'

import { auth } from '../../lib/nextAuth/auth'

const getLoginSession = async () => {
  const session = await auth()

  if (session?.user)
    session.user = {
      name: session.user.name,
      email: session.user.email,
      picture: session.user.picture,
    } // filter out sensitive data

  return session as NextAuthSessionResponse
}

export default getLoginSession
