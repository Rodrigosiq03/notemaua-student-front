import { User } from "../../../shared/domain/entities/user"
import { EntityError } from "../../../shared/domain/helpers/errors/domain_errors"
import { IUserRepository } from "../domain/repositories/user_repository_interface"

export class FirstAccessUsecase {
  constructor(private repo: IUserRepository) { }

  async execute(ra: string): Promise<string> {
    if (!User.validateRa(ra)) throw new EntityError('ra')

    const firstAccess = await this.repo.firstAccess(ra)

    return firstAccess
  }
}