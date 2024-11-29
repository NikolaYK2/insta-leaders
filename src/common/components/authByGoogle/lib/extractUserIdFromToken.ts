// Утилита для извлечения userId из токена
export const extractUserIdFromToken = (accessToken: string): string => {
  try {
    const payloadBase64 = accessToken.split('.')[1]
    const payload = JSON.parse(atob(payloadBase64))
    return payload.userId
  } catch (error) {
    console.error('Failed to parse userId from token:', error)
    throw new Error('Invalid token format')
  }
}
