import { NextAuthSessionResponse } from '@/server/service/auth/type'

import { auth } from '../../lib/nextAuth/auth'

const getLoginSession = async () => {
  let session

  if (!session) {
    session = await auth()

    session.user = {
      name: session.user.name,
      email: session.user.email,
      picture: session.user.picture,
    } // filter out sensitive data
  }

  return session as NextAuthSessionResponse
}

export default getLoginSession
