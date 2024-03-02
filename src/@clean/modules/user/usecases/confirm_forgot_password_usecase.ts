import { User } from '../../../shared/domain/entities/user'
import { IUserRepository } from '../domain/repositories/user_repository_interface'
import { EntityError } from '../../../shared/domain/helpers/errors/domain_errors'

export class ConfirmForgotPasswordUsecase {
  constructor(private repo: IUserRepository) { }

  async execute(email: string, newPassword: string, createdAt: Date) {
    if (!User.validateEmail(email)) {
      throw new EntityError('email')
    }
    if (!User.validatePassword(newPassword)) {
      throw new EntityError('newPassword')
    }

    const updatedUser = await this.repo.confirmForgotPassword(email, newPassword, createdAt)

    return updatedUser
  }
}
