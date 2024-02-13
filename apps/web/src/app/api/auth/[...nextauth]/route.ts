import { NextApiRequest, NextApiResponse } from 'next'

import { AuthHandlers } from '@/lib/nextAuth/auth'

export const { GET, POST } = AuthHandlers
