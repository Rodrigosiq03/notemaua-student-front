import { User } from '../../../shared/domain/entities/user'
import { IUserRepository } from '../../user/domain/repositories/user_repository_interface'
import { EntityError } from '../../../shared/domain/helpers/errors/domain_errors'

export class ForgotPasswordUsecase {
  constructor(private repo: IUserRepository) { }

  async execute(email: string) {
    if (!User.validateEmail(email)) {
      throw new EntityError('email')
    }

    const user = this.repo.forgotPassword(email)

    return user
  }
}
