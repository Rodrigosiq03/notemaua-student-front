import { decorate, injectable } from "inversify";
import { IUserRepository } from "../../../modules/user/domain/repositories/user_repository_interface";
import { User } from "../../domain/entities/user";
import { EntityError } from "../../domain/helpers/errors/domain_errors";
import { NoItemsFound } from "../../domain/helpers/errors/usecase_errors";

export class UserRepositoryMock implements IUserRepository {
  private users = [
    new User({ ra: '22.00680-0', email: '22.00680-0@maua.br', name: 'User 0', password: '123456' }),
    new User({ ra: '22.00680-1', email: '22.00680-1@maua.br', name: 'User 1', password: '123456' }),
    new User({ ra: '22.00680-2', email: '22.00680-2@maua.br', name: 'User 2', password: '123456' }),
    new User({ ra: '22.00680-3', email: '22.00680-3@maua.br', name: 'User 3' }),
  ]

  async login(email: string, password: string): Promise<string> {
    const user = this.users.find(user => user.email === email && user.password === password)

    if (!user) throw new NoItemsFound('email')

    return 'tokenHERE'
  }
  async forgotPassword(email: string): Promise<string> {
    const user = this.users.find(user => user.email === email)

    if (!user) throw new NoItemsFound('email')

    return 'email sent'
  }
  async confirmForgotPassword(email: string, password: string, createdAt: number): Promise<string> {
    const user = this.users.find(user => user.email === email)

    if (!user) throw new NoItemsFound('email')

    if (createdAt < 0) throw new EntityError('createdAt')

    user.setPassword = password

    return 'password updated'
  }
  async updatePassword(ra: string, password: string): Promise<string> {
    const user = this.users.find(user => user.ra === ra)

    if (!user) throw new NoItemsFound('ra')

    user.setPassword = password

    return 'password updated'
  }
  async deleteUser(ra: string): Promise<string> {
    const user = this.users.find(user => user.ra === ra)

    if (!user) throw new NoItemsFound('ra')

    this.users = this.users.filter(user => user.ra !== ra)

    return 'user deleted'
  }
  async firstAccess(ra: string): Promise<string> {
    const user = this.users.find(user => user.ra === ra)

    if (!user) throw new NoItemsFound('ra')
    if (user.password) throw new NoItemsFound('password')
    user.setPassword = '123456'

    return 'first access done!'
  }

}

decorate(injectable(), UserRepositoryMock)