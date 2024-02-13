import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/nextAuth'

/**
 * https://github.com/nextauthjs/next-auth-v5-example/blob/main/app/api/protected/route.ts
 */
export const GET = auth(function GET(req: NextRequest) {
  // if (req?.auth?.user) return NextResponse.json({ data: 'Protected data' })

  return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
})
