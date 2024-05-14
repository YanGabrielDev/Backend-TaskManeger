import { BadRequestError } from '../erros'
import { UserCollection } from '../models/mongo'

export class UserService {
  static validateUserEmail(email: string) {
    const validateEmailRegex = /^\S+@\S+\.\S+$/
    return validateEmailRegex.test(email)
  }

  static async validateUserCreation(
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    const existenteUser = await UserCollection.findOne({ email })
    const isValidEmail = UserService.validateUserEmail(email)
    if (password !== confirmPassword) {
      throw new BadRequestError(
        'As senhas precisão ser iguais para a criação do usuário!',
      )
    }
    if (!isValidEmail) {
      throw new BadRequestError('Email invalido!')
    }
    if (existenteUser) {
      throw new BadRequestError('Email de usuário ja existente!')
    }
  }

  static async createUser(name: string, email: string, password: string) {
    const user = new UserCollection({ email, name, password })
    await user.save()
    return user
  }

  static async getUser(email: string, password: string) {
    const user = UserCollection.findOne({ email, password })
    return user
  }
}
