import { Withdraw } from "../../../shared/domain/entities/withdraw"
import { EntityError } from "../../../shared/domain/helpers/errors/domain_errors"
import { IWithdrawRepository } from "../domain/repositories/withdraw_repository_interface"


export class CreateWithdrawUsecase {
  constructor(private repo: IWithdrawRepository) {}

  async execute(
    notebookSerialNumber: string,
  ) {
    if (!Withdraw.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }

    const withdrawUpdated = await this.repo.createWithdraw(
      notebookSerialNumber,
    )

    return withdrawUpdated
  }
}