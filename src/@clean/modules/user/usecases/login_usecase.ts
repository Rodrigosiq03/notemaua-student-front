import { EntityError } from '../../../shared/domain/helpers/errors/domain_errors'
import { User } from '../../../shared/domain/entities/user'
import { IUserRepository } from '../domain/repositories/user_repository_interface'

export class LoginUsecase {
  constructor(private repo: IUserRepository) { }

  async execute(email: string, password: string) {
    if (!User.validateEmail(email)) {
      throw new EntityError('email')
    }
    if (!User.validatePassword(password)) {
      throw new EntityError('password')
    }

    const token = await this.repo.login(email, password)

    return token
  }
}
