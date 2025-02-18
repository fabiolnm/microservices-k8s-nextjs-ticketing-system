import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export function currentUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { jwt: token } = req.session || {}
    if (token) {
      req.currentUser = jwt.verify(token, process.env.JWT_KEY!) as UserPayload
    }
  } catch (err) {
    // ignore errors, just let currentUser be undefined
    console.error(err)
  }
  next()
}
