export interface IUserRepository {
  login(email: string, password: string): Promise<string>
  forgotPassword(email: string): Promise<string>
  confirmForgotPassword(email: string, password: string): Promise<string>
  updatePassword(ra: string, password: string): Promise<string>
  deleteUser(ra: string): Promise<string>
  firstAccess(ra: string): Promise<string>
}
