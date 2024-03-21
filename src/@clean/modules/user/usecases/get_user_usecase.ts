import { GetUserJsonProps, User } from "../../../shared/domain/entities/user";
import { EntityError } from "../../../shared/domain/helpers/errors/domain_errors";
import { IUserRepository } from "../domain/repositories/user_repository_interface";

export class GetUserUsecase {
  constructor(private userRepository: IUserRepository) {}

  async execute(ra: string): Promise<GetUserJsonProps> {
    if (!User.validateRa(ra)) throw new EntityError('ra')
    return this.userRepository.getUser(ra)
  }
}