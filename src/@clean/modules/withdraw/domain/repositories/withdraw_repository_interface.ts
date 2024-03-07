import { Withdraw } from "../../../../shared/domain/entities/withdraw";

export interface IWithdrawRepository {
  createWithdraw(
    notebookSerialNumber: string,
  ): Promise<Withdraw>
}