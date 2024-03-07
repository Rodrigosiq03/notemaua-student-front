import { AxiosInstance } from "axios";
import { IWithdrawRepository } from "../../../modules/withdraw/domain/repositories/withdraw_repository_interface";
import { JsonWithdrawProps, Withdraw } from "../../domain/entities/withdraw";
import { decorate, injectable } from "inversify";
import { STATE } from "../../domain/enums/state_enum";

export class WithdrawRepositoryHttp implements IWithdrawRepository {
  constructor(private readonly httpWithdraw: AxiosInstance) {}

  async createWithdraw(notebookSerialNumber: string): Promise<Withdraw> {
    try {
      const response = await this.httpWithdraw.post<Withdraw>('/create-withdraw', {
        notebookSerialNumber
      })

      if (response.status === 200) {
        return response.data
      }

      throw new Error('Error creating withdraw')
    } catch (error: any) {
      throw new Error(error)
    }
  }

}

decorate(injectable(), WithdrawRepositoryHttp)