import { Withdraw } from "../../../../shared/domain/entities/withdraw";

export interface IWithdrawRepository {
  createWithdraw(
    notebookSerialNumber: string,
    studentRA: string,
    name: string,
    initTime: number,
  ): Promise<Withdraw>
}