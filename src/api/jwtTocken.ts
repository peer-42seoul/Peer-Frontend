import * as jose from 'jose'

// 서버 컴포넌트에서만 사용합니다.
export const getToken = async (apiType: number, secret: string) => {
  const payLoad = { apiType: apiType }
  const secretKey = await new TextEncoder().encode(secret)
  const token = await new jose.SignJWT(payLoad)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(secretKey)
  return token
}
