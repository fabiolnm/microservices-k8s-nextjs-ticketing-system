import jwt from 'jsonwebtoken'

export function jwtToken(id: string, email: string) {
  return { jwt: jwt.sign({ id, email }, process.env.JWT_KEY!) }
}