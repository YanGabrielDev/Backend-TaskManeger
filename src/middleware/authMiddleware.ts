import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.path === '/user/login' || req.path === '/user') {
    next()
    return
  }
  const accessToken = req.headers['authorization']

  const { exp, iat } = jwt.decode(String(accessToken)) as JwtPayload

  if (!accessToken) {
    return res.status(401).send({ error: 'unauthorized token' })
  }
  if (iat && exp) {
    if (iat >= exp) {
      return res.status(401).send({ error: 'Token expirado!' })
    }
  }

  next()
}
