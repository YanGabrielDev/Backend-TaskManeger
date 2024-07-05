import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/userService';
import { BadRequestError, ApiError } from '../erros';
import { generateRandomId } from '../utils/genereteRandomId';

/**
 * Controller responsável por gerenciar as operações relacionadas ao usuário.
 */
export class UserController {
  /**
   * Cria um novo usuário.
   * @param {Request} req - Objeto de requisição do Express.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<void>}
   */
  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      await UserService.validateUserCreation(email, password, confirmPassword);
      const user = await UserService.createUser(name, email, password);

      res.json(user);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  /**
   * Autentica um usuário existente e emite um token de acesso.
   * @param {Request} req - Objeto de requisição do Express contendo email e senha.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<void>}
   */
  public signIn = async (req: Request, res: Response): Promise<void> => {
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

  /**
   * Invalida o token de acesso do usuário (logout).
   * @param {Request} req - Objeto de requisição do Express.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<void>}
   */
  public logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
      res.cookie('access_token', null, {
        sameSite: 'none',
        secure: true,
      });

      res.status(200).send({ message: 'Token invalidado com sucesso!' });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  /**
   * Retorna as informações de um usuário com base no email e senha.
   * @param {Request} req - Objeto de requisição do Express contendo email e senha.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<void>}
   */
  public getUser = async (req: Request, res: Response): Promise<void> => {
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

  /**
   * Trata erros específicos da aplicação e envia a resposta apropriada.
   * @param {Response} res - Objeto de resposta do Express.
   * @param {any} error - Objeto de erro capturado.
   * @private
   */
  private handleError(res: Response, error: any): void {
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
