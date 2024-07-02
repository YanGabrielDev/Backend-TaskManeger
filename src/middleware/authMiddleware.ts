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
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ error: 'Token de acesso não encontrado' });
  }

  const { exp, iat } = jwt.decode(String(accessToken)) as JwtPayload

  if (!accessToken) {
    return res.status(401).send({ error: 'unauthorized token' })
  }
  if (iat && exp) {

    if (Date.now() >= exp * 1000) {
      return res.status(401).json({ message: 'Token expirado!' });
    }
  }

  next()
}
