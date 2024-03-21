type JWT = any

export default async function googleRefreshToken({ token }: JWT) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ID!,
      client_secret: process.env.GOOGLE_SECRET!,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    }),
    method: 'POST',
  })

  const tokens = await response.json()

  if (!response.ok) throw tokens

  console.log('refresh !!!', token, tokens)

  return {
    ...token, // Keep the previous token properties
    accessToken: tokens.access_token,
    expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),

    // Fall back to old refresh token, but note that
    // many providers may only allow using a refresh token once.
    refreshToken: tokens.refresh_token ?? token.refreshToken,
  }
}
