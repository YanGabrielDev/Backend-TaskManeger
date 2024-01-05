import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { iat, exp }: any = jwt.decode(String(token))

  if (!token) {
    return res.status(401).send({ error: 'unauthorized token' })
  }
  if (iat >= exp) {
    return res.status(401).send({ error: 'Token expirado!' })
  }

  next()
}
