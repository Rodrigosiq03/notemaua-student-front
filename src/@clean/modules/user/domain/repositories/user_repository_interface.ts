import { GetUserJsonProps } from "../../../../shared/domain/entities/user"

export interface IUserRepository {
  login(email: string, password: string): Promise<string>
  forgotPassword(email: string): Promise<string>
  confirmForgotPassword(email: string, password: string, createdAt: Date): Promise<string>
  updatePassword(ra: string, password: string): Promise<string>
  deleteUser(ra: string): Promise<string>
  firstAccess(ra: string): Promise<string>
  getUser(ra: string): Promise<GetUserJsonProps>
}
