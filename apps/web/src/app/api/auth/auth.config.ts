import { sql } from '@vercel/postgres'
import type { NextAuthConfig, Session, User } from 'next-auth'

/* 
  AccessToken이 만료되면 refreshToken을 사용해서 다시 받아오는 함수
  TO DO - 
  백엔드에 refresh logic 추가
*/
async function refreshAccessToken(token: any, user: any) {
  try {
    /* 
    const url = '리프레시를 위한 End Point'

    const params = {
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const res = await axios.post(url, null, {
      headers,
      params,
      auth: {
        username: process.env.CLIENT_ID as string,
        password: process.env.CLIENT_SECRET as string,
      },
    })

    const refreshedTokens = await res.data
    

    if (res.status !== 200) {
      throw refreshedTokens
    }

    */

    console.log(`refresh ${user.id}, ${user.name} ${user.email}`)

    return {
      ...token,
      accessTokenExpires: 5 * 60 * 1000 + Date.now(),
      /* 
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Math.round(Date.now() / 1000) + refreshedTokens.expires_in,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      */
    }
  } catch (err) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

/*
  TO DO - 백엔드에서 확인 후 생성 로직 추가
*/
async function createUser(user: User) {
  try {
    await sql`INSERT INTO users2 (id, name, email, password)
    VALUES (${user.id}, ${user.name}, ${user.email}, ${null});`
  } catch (error) {
    console.error('Failed to create user:', error)
  }
}

export const authConfig = {
  // strategy: 'database',
  // adapter: vercelPostgresAdapter(),

  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'github') {
        createUser(user)
        return true
      }

      console.log(`login ${user.id}, ${user.name} ${user.email}`)

      return true
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user

      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        return true
      }
      if (isLoggedIn) {
        return true
        // return Response.redirect(new URL('/dashboard', nextUrl))
      }

      return true
    },

    /**
     * JWT Callback
     * 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행
     * 반환된 값은 암호화되어 쿠키에 저장됨
     */
    async jwt({ token, account, user }) {
      const nowTime = Math.floor(Date.now() - 1000)

      if (account && user) {
        console.log(`create JWT ${JSON.stringify(account.providerAccountId)}`)

        return {
          accessToken: account.access_token,
          accessTokenExpires: nowTime + 3 * 60,
          // accessTokenExpires: account.expires_at,
          // refreshToken: account.refresh_token,
          user,
        }
      }

      const shouldRefreshTime = (token.accessTokenExpires as number) - 1 * 60 - nowTime

      // 토큰이 만료되지 않았을때는 원래사용하던 토큰을 반환
      if (shouldRefreshTime > 0) {
        return token
      }

      return refreshAccessToken(token, user)
    },

    /**
     * Session Callback
     * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
     * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
     * JWT 토큰의 정보를 Session에 유지 시킨다.
     */
    async session({ session, token }) {
      const createdSession = {
        ...session,
        user: token.user as User,
        accessToken: token.accessToken,
        error: token.error,
      }

      return createdSession
    },
  },
  providers: [], // Add providers with an empty array for now
} as NextAuthConfig
