import { auth } from '../../lib/nextAuth/auth'

const getLoginSession = async () => {
  const session = await auth()

  return session
}

export default getLoginSession
