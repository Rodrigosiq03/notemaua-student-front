import { AxiosInstance } from "axios";
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
      throw new Error(error)
    }
  }

}

decorate(injectable(), WithdrawRepositoryHttp)