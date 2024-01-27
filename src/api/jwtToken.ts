import * as jose from 'jose'

// 서버 컴포넌트에서만 사용합니다.
export const getToken = async (payLoad: any, secret: string) => {
  const secretKey = await new TextEncoder().encode(secret)
  const token = await new jose.SignJWT(payLoad)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secretKey)
  return token
}
