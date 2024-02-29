import { User } from "../../../shared/domain/entities/user";
import { EntityError } from "../../../shared/domain/helpers/errors/domain_errors";
import { IUserRepository } from "../domain/repositories/user_repository_interface";

export class UpdatePasswordUsecase {
  constructor(private repo: IUserRepository) { }

  async execute(ra: string, newPassword: string): Promise<string> {
    if (!User.validateRa(ra)) throw new EntityError('ra')
    if (!User.validatePassword(newPassword)) throw new EntityError('newPassword')

    const updatedUserPwd = await this.repo.updatePassword(ra, newPassword)

    return updatedUserPwd
  }
}
