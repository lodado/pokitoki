import { cache } from 'react'

import { NextAuthSessionResponse } from '@/server/service/auth/type'

import { auth } from '../../lib/nextAuth/auth'

const getLoginSession = async () => {
  const session = await auth()

  if (session?.user) {
    session.user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      picture: session.user.picture,
    } // filter out sensitive data
  }

  return session as NextAuthSessionResponse
}

export default cache(getLoginSession)
