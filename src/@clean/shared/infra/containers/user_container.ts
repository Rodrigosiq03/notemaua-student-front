import 'reflect-metadata'
import { Container } from 'inversify'
import { httpUser } from '../http'
import { UserRepositoryMock } from '../repositories/user_repository_mock'
import { UserRepositoryHttp } from '../repositories/user_repository_http'
import { STAGE } from '../../domain/enums/stage_enum'
import { LoginUsecase } from '../../../modules/user/usecases/login_usecase'
import { UpdatePasswordUsecase } from '../../../modules/user/usecases/update_password_usecase'
import { ForgotPasswordUsecase } from '../../../modules/user/usecases/forgot_password_usecase'
import { ConfirmForgotPasswordUsecase } from '../../../modules/user/usecases/confirm_forgot_password_usecase'
import { FirstAccessUsecase } from '../../../modules/user/usecases/first_access_usecase'

export const RegistryUser = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),
  UserRepositoryMock: Symbol.for('UserRepositoryMock'),
  UserRepositoryHttp: Symbol.for('UserRepositoryHttp'),
  LoginUsecase: Symbol.for('LoginUsecase'),
  UodatePasswordUsecase: Symbol.for('UodatePasswordUsecase'),
  ForgotPasswordUsecase: Symbol.for('ForgotPasswordUsecase'),
  ConfirmForgotPasswordUsecase: Symbol.for('ConfirmPasswordUsecase'),
  FirstAccessUsecase: Symbol.for('FirstAccessUsecase'),
  DeleteUserUsecase: Symbol.for('DeleteUserUsecase'),
}

export const containerUser = new Container()

containerUser.bind(RegistryUser.AxiosAdapter).toConstantValue(httpUser)

containerUser.bind(RegistryUser.UserRepositoryMock).to(UserRepositoryMock)
containerUser.bind(RegistryUser.UserRepositoryHttp).toDynamicValue((context) => {
  return new UserRepositoryHttp(context.container.get(RegistryUser.AxiosAdapter))
})

containerUser.bind(RegistryUser.LoginUsecase).toDynamicValue((context) => {
  if (process.env.EXPO_PUBLIC_STAGE === STAGE.TEST) {
    return new LoginUsecase(context.container.get(RegistryUser.UserRepositoryMock))
  } else if (process.env.EXPO_PUBLIC_STAGE === STAGE.PROD || process.env.EXPO_PUBLIC_STAGE === STAGE.DEV) {
    return new LoginUsecase(context.container.get(RegistryUser.UserRepositoryHttp))
  } else {
    throw new Error('Invalid stage')
  }
})

containerUser.bind(RegistryUser.UodatePasswordUsecase).toDynamicValue((context) => {
  if (process.env.EXPO_PUBLIC_STAGE === STAGE.TEST) {
    return new UpdatePasswordUsecase(context.container.get(RegistryUser.UserRepositoryMock))
  } else if (process.env.EXPO_PUBLIC_STAGE === STAGE.PROD || process.env.EXPO_PUBLIC_STAGE === STAGE.DEV) {
    return new UpdatePasswordUsecase(context.container.get(RegistryUser.UserRepositoryHttp))
  } else {
    throw new Error('Invalid stage')
  }
})

containerUser.bind(RegistryUser.ForgotPasswordUsecase).toDynamicValue((context) => {
  if (process.env.EXPO_PUBLIC_STAGE === STAGE.TEST) {
    return new ForgotPasswordUsecase(context.container.get(RegistryUser.UserRepositoryMock))
  } else if (process.env.EXPO_PUBLIC_STAGE === STAGE.PROD || process.env.EXPO_PUBLIC_STAGE === STAGE.DEV) {
    return new ForgotPasswordUsecase(context.container.get(RegistryUser.UserRepositoryHttp))
  } else {
    throw new Error('Invalid stage')
  }
})

containerUser.bind(RegistryUser.ConfirmForgotPasswordUsecase).toDynamicValue((context) => {
  if (process.env.EXPO_PUBLIC_STAGE === STAGE.TEST) {
    return new ConfirmForgotPasswordUsecase(context.container.get(RegistryUser.UserRepositoryMock))
  } else if (process.env.EXPO_PUBLIC_STAGE === STAGE.PROD || process.env.EXPO_PUBLIC_STAGE === STAGE.DEV) {
    return new ConfirmForgotPasswordUsecase(context.container.get(RegistryUser.UserRepositoryHttp))
  } else {
    throw new Error('Invalid stage')
  }
})

containerUser.bind(RegistryUser.FirstAccessUsecase).toDynamicValue((context) => {
  if (process.env.EXPO_PUBLIC_STAGE === STAGE.TEST) {
    return new FirstAccessUsecase(context.container.get(RegistryUser.UserRepositoryMock))
  } else if (process.env.EXPO_PUBLIC_STAGE === STAGE.PROD || process.env.EXPO_PUBLIC_STAGE === STAGE.DEV) {
    return new FirstAccessUsecase(context.container.get(RegistryUser.UserRepositoryHttp))
  } else {
    throw new Error('Invalid stage')
  }
})

