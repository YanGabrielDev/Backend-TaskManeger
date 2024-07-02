import { Request, Response } from 'express'
import { UserService } from '../services/userService'
import { ApiError, BadRequestError } from '../erros'
import jwt from 'jsonwebtoken'
import { randomId } from '../utils/genereteRandomId'

export class UserController {
  public createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password, confirmPassword } = await req.body

      await UserService.validateUserCreation(email, password, confirmPassword)
      const user = await UserService.createUser(name, email, password)

      res.json(user)
    } catch (error) {
      if (error instanceof BadRequestError) {
        res.status(400).send({ message: error.message })
        return
      }
      if (error instanceof ApiError) {
        res.status(500).send({ message: error.message })
        return
      }
    }
  }

  public signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const user = await UserService.getUser(email, password)

      if (!user) {
        throw new BadRequestError('Usuario não encontrado!')
      }

      const accessToken = jwt.sign(req.body, randomId(), {
        // expiresIn: '1 days',
        expiresIn: '10s'
      })
      res.cookie('access_token', accessToken, {
        httpOnly: true
      });
      res.status(200).send({ message: 'Login realizado com sucesso!' })

    } catch (error) {
      console.error(error)

      if (error instanceof BadRequestError) {
        res.status(400).send({ error: error.message })
      } else {
        res.status(500).send({ error: 'Erro do servidor!' })
      }
    }
  }

  public getUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.query
      const user = await UserService.getUser(String(email), String(password))

      if (!user) {
        throw new BadRequestError('Usuario não encontrado!')
      }
      res.json(user)
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(500).send({ message: error.message })
        return
      }
    }
  }
}
