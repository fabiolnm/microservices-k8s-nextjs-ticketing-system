import { Request, Response, NextFunction } from 'express'

export function errorHandler(
  err: Error, req: Request, res: Response, next: NextFunction
) {
  const { message } = err

  res.status(400).send({ message })
}