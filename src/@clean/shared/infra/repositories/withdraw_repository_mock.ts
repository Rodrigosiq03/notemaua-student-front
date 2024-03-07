import { decorate, injectable } from "inversify";
import { IWithdrawRepository } from "../../../modules/withdraw/domain/repositories/withdraw_repository_interface";
import { Withdraw } from "../../domain/entities/withdraw";
import { STATE } from "../../domain/enums/state_enum";
import { NoItemsFound } from "../../domain/helpers/errors/usecase_errors";

export class WithdrawRepositoryMock implements IWithdrawRepository {
  private inactiveWithdraws: Withdraw[] = [
    new Withdraw({
      notebookSerialNumber: 'ABC123',
      state: STATE.INACTIVE,
    }),
    new Withdraw({
      notebookSerialNumber: 'DEF456',
      state: STATE.INACTIVE,
    }),
  ]

  async createWithdraw(notebookSerialNumber: string): Promise<Withdraw> {
     const existingWithdraw = this.inactiveWithdraws.find(
      (w) => w.notebookSerialNumber === notebookSerialNumber,
    )

    if (!existingWithdraw) {
      throw new NoItemsFound('notebookSerialNumber')
    } 

    return new Withdraw({
      notebookSerialNumber: existingWithdraw.notebookSerialNumber,
      studentRA: '',
      initTime: 0,
      state: STATE.PENDING,
    })
  }

}

decorate(injectable(), WithdrawRepositoryMock)