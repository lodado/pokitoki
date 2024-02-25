import { sql } from '@vercel/postgres'
import { Account } from 'next-auth'

/** next-auth에서 customAdapter 정식으로 잘 지원 안하는거 같은데
 * 타입 any로 설정해둠..
 */
export default function vercelPostgresAdapter(): any {
  const createUser = async (user: Omit<any, 'id'>): Promise<any> => {
    console.log('create user begin', user)

    const { rows } = await sql`
        INSERT INTO users (name, email, image, user_id) 
        VALUES (${user.name}, ${user.email}, ${user.image}, ${user.email}) 
        RETURNING id, name, email, email_verified, image`
    const newUser: any = {
      ...rows[0],
      id: rows[0].id.toString(),
      emailVerified: rows[0].email_verified,
      email: rows[0].email,
    }

    console.log('created user', newUser)

    return newUser
  }

  const getUserByOauthId = async (userId: string) => {
    const { rows } = await sql`
          SELECT *
          FROM users
          WHERE id = ${userId};
        `
    return {
      ...rows[0],
      id: rows[0].id.toString(),
      emailVerified: rows[0].email_verified,
      email: rows[0].email,
    }
  }

  const getUser = async (id: string) => {
    const { rows } = await sql`
          SELECT *
          FROM users
          WHERE id = ${id};
        `
    return {
      ...rows[0],
      id: rows[0].id.toString(),
      emailVerified: rows[0].email_verified,
      email: rows[0].email,
    }
  }

  const getUserByEmail = async (email: string) => {
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`
    return rows[0]
      ? {
          ...rows[0],
          id: rows[0].id.toString(),
          emailVerified: rows[0].email_verified,
          email: rows[0].email,
        }
      : null
  }

  const getUserByAccount = async ({
    provider,
    providerAccountId,
  }: {
    provider: string
    providerAccountId: string
  }): Promise<any | null> => {
    const { rows } = await sql`
      SELECT u.* 
      FROM users u join accounts a on u.id = a.user_id 
      WHERE a.provider_id = ${provider} 
      AND a.provider_account_id = ${providerAccountId}`
    const user = rows[0]
      ? {
          email: rows[0].email,
          emailVerified: rows[0].email_verified,
          id: rows[0].id,
        }
      : null
    return user
  }

  const updateUser = async (user: Partial<any> & Pick<any, 'id'>): Promise<any> => {
    const { rows } = await sql`
            UPDATE users
            SET name = ${user.name}, email = ${user.email}, image = ${user.image}
            WHERE id = ${user.id}
            RETURNING id, name, email, image;
            `
    const updatedUser: any = {
      ...rows[0],
      id: rows[0].id.toString(),
      emailVerified: rows[0].email_verified,
      email: rows[0].email,
    }
    return updatedUser
  }

  const deleteUser = async (userId: string) => {
    await sql`DELETE FROM users WHERE id = ${userId}`
  }

  const createSession = async ({
    sessionToken,
    userId,
    expires,
  }: {
    sessionToken: string
    userId: string
    expires: Date
  }): Promise<any> => {
    const expiresString = expires.toDateString()

    console.log('created Seesion', {
      sessionToken,
      userId,
      expires,
    })

    await sql`
        INSERT INTO auth_sessions (user_id, expires, session_token) 
        VALUES (${userId}, ${expiresString}, ${sessionToken})
      `
    const createdSession: any = {
      sessionToken,
      userId,
      expires,
    }

    console.log('is sessionCreated', createdSession)

    return createdSession
  }

  const getSessionAndUser = async (sessionToken: string): Promise<{ session: any; user: any } | null> => {
    console.log('wtf?', sessionToken)

    const session = await sql`
        SELECT * 
        FROM auth_sessions 
        WHERE session_token = ${sessionToken}`

    const { rows } = await sql`
        SELECT * 
        FROM users 
        WHERE id = ${session.rows[0].user_id}`
    const expiresDate = new Date(session.rows[0].expires)
    const sessionAndUser: { session: any; user: any } = {
      session: {
        sessionToken: session.rows[0].session_token,
        userId: session.rows[0].user_id,
        expires: expiresDate,
      },
      user: {
        id: rows[0].id,
        emailVerified: rows[0].email_verified,
        email: rows[0].email,
        name: rows[0].name,
        image: rows[0].image,
      },
    }

    return sessionAndUser
  }

  const findOrCreateUser = async ({ user, account }: any) => {
    try {
      const row = await getUserByOauthId(user.id)

      if (row) {
        return true
      }
    } catch (e) {
      // 유저가 없으면 생성함
    }

    const { id } = (await createUser(user)) as { id: string }
    account.userId = id
    await linkAccount(account)

    return true
  }

  const updateSession = async (session: Partial<any> & Pick<any, 'sessionToken'>): Promise<any | null | undefined> => {
    console.log('Unimplemented function! updateSession in vercelPostgresAdapter. Session:', JSON.stringify(session))
  }

  const deleteSession = async (sessionToken: string) => {
    await sql`
          DELETE FROM auth_sessions
          WHERE session_token = ${sessionToken};
        `
  }

  const linkAccount = async (account: any): Promise<any | null | undefined> => {
    console.log('linkAccount create begin', account)

    await sql`
        INSERT INTO accounts (
            user_id, 
            provider_id, 
            provider_type, 
            provider_account_id, 
            refresh_token,
            access_token,
            expires_at,
            token_type,
            scope,
            id_token
        ) 
        VALUES (
            ${account.userId}, 
            ${account.provider},
            ${account.type}, 
            ${account.providerAccountId}, 
            ${account.refresh_token},
            ${account.access_token}, 
            to_timestamp(${account.expires_at}),
            ${account.token_type},
            ${account.scope},
            ${account.id_token}
        )`

    console.log('linkAccount created ', account)
    return account
  }

  const unlinkAccount = async ({
    providerAccountId,
    provider,
  }: {
    providerAccountId: Account['providerAccountId']
    provider: Account['provider']
  }) => {
    await sql`
            DELETE FROM accounts 
            WHERE provider_account_id = ${providerAccountId} AND provider_id = ${provider}}`
  }

  const createVerificationToken = async ({ identifier, expires, token }: any): Promise<any | null | undefined> => {
    const { rows } = await sql`
        INSERT INTO verification_tokens (identifier, token, expires) 
        VALUES (${identifier}, ${token}, ${expires.toString()})`
    const createdToken: any = {
      identifier: rows[0].identifier,
      token: rows[0].token,
      expires: rows[0].expires,
    }
    return createdToken
  }

  // Return verification token from the database and delete it so it cannot be used again.
  const useVerificationToken = async ({ identifier, token }: { identifier: string; token: string }) => {
    const { rows } = await sql`
        SELECT * FROM verification_tokens 
        WHERE identifier = ${identifier} 
        AND token = ${token} AND expires > NOW()`
    await sql`
        DELETE FROM verification_tokens
        WHERE identifier = ${identifier}
        AND token = ${token}`
    return {
      expires: rows[0].expires,
      identifier: rows[0].identifier,
      token: rows[0].token,
    }
  }

  return {
    createUser,
    getUser,
    updateUser,
    getUserByEmail,
    getUserByAccount,
    deleteUser,
    getSessionAndUser,
    findOrCreateUser,
    createSession,
    updateSession,
    deleteSession,
    createVerificationToken,
    useVerificationToken,
    linkAccount,
    unlinkAccount,
  }
}
