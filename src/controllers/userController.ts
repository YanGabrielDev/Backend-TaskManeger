import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/userService';
import { BadRequestError, ApiError } from '../erros';
import { generateRandomId } from '../utils/genereteRandomId';

export class UserController {
  public createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      await UserService.validateUserCreation(email, password, confirmPassword);
      const user = await UserService.createUser(name, email, password);

      res.json(user);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.getUser(email, password);

      if (!user) {
        throw new BadRequestError('Usuário não encontrado!');
      }

      const accessToken = jwt.sign(req.body, generateRandomId(), {
        expiresIn: '1 days',
      });

      res.cookie('access_token', accessToken, {
        sameSite: 'none',
        secure: true,
      });

      res.status(200).send(user);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public getUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.query;
      const user = await UserService.getUser(String(email), String(password));

      if (!user) {
        throw new BadRequestError('Usuário não encontrado!');
      }

      res.json(user);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: any) {
    if (error instanceof BadRequestError) {
      res.status(400).send({ error: error.message });
    } else if (error instanceof ApiError) {
      res.status(500).send({ error: error.message });
    } else {
      console.error(error); // Log unexpected errors for debugging purposes
      res.status(500).send({ error: 'Erro do servidor!' });
    }
  }
}
