type JWT = any

/*
 * github는 refresh token이 없다
 */
export default async function githubfreshToken({ token }: JWT) {
  throw token
}
