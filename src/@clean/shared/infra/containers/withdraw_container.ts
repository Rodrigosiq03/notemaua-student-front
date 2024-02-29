import { Container } from 'inversify'
import 'reflect-metadata'
import { httpWithdraw } from '../http'
import { WithdrawRepositoryMock } from '../repositories/withdraw_repository_mock'
import { WithdrawRepositoryHttp } from '../repositories/withdraw_repository_http'
import { CreateWithdrawUsecase } from '../../../modules/withdraw/usecases/create_withdraw_usecase'
import { STAGE } from '../../domain/enums/stage_enum'

export const RegistryWithdraw = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),
  WithdrawRepositoryMock: Symbol.for('WithdrawRepositoryMock'),
  WithdrawRepositoryHttp: Symbol.for('WithdrawRepositoryHttp'),
  CreateWithdrawUsecase: Symbol.for('CreateWithdrawUsecase'),
}

export const containerWithdraw = new Container()

containerWithdraw.bind(RegistryWithdraw.AxiosAdapter).toConstantValue(httpWithdraw)

containerWithdraw.bind(RegistryWithdraw.WithdrawRepositoryMock).to(WithdrawRepositoryMock)
containerWithdraw.bind(RegistryWithdraw.WithdrawRepositoryHttp).toDynamicValue((context) => {
  return new WithdrawRepositoryHttp(context.container.get(RegistryWithdraw.AxiosAdapter))
})

containerWithdraw.bind(RegistryWithdraw.CreateWithdrawUsecase).toDynamicValue((context) => {
  if (process.env.EXPO_PUBLIC_STAGE === STAGE.TEST) {
    return new CreateWithdrawUsecase(context.container.get(RegistryWithdraw.WithdrawRepositoryMock))
  } else if (process.env.EXPO_PUBLIC_STAGE === STAGE.PROD || process.env.EXPO_PUBLIC_STAGE === STAGE.DEV) {
    return new CreateWithdrawUsecase(context.container.get(RegistryWithdraw.WithdrawRepositoryHttp))
  } else {
    throw new Error('Invalid stage')
  }
})