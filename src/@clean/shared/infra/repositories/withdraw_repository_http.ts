import { AxiosError, AxiosInstance } from "axios";
import { IWithdrawRepository } from "../../../modules/withdraw/domain/repositories/withdraw_repository_interface";
import { JsonWithdrawProps, Withdraw } from "../../domain/entities/withdraw";
import { decorate, injectable } from "inversify";
import { STATE } from "../../domain/enums/state_enum";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class WithdrawRepositoryHttp implements IWithdrawRepository {
  constructor(private readonly httpWithdraw: AxiosInstance) {}

  async createWithdraw(notebookSerialNumber: string): Promise<Withdraw | undefined> {
    try {
      const token = await AsyncStorage.getItem('token')
      const response = await this.httpWithdraw.post<Withdraw | undefined>('/create-withdraw', {
          notebookSerialNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.status === 201) {
        return response.data
      }else{
        return undefined
      }
    } catch (error: any) {
      if (error.response.data === 'The notebook is already in use') {
        throw new Error('O notebook já está em uso')
      }
      if (error.response.data === 'The student already got a notebook') {
        throw new Error('O estudante já realizou uma retirada')
      }
      console.error('Something went wrong with createWithdraw: ',error.response.data)
      throw new Error(error)
    }
  }

}

decorate(injectable(), WithdrawRepositoryHttp)