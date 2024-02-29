import { Withdraw } from "../../../shared/domain/entities/withdraw"
import { EntityError } from "../../../shared/domain/helpers/errors/domain_errors"
import { IWithdrawRepository } from "../domain/repositories/withdraw_repository_interface"


export class CreateWithdrawUsecase {
  constructor(private repo: IWithdrawRepository) {}

  async execute(
    notebookSerialNumber: string,
    studentRA: string,
    name: string,
    initTime: number,
  ) {
    if (!Withdraw.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }
    if (!Withdraw.validateStudentRA(studentRA)) {
      throw new EntityError('studentRA')
    }
    if (!Withdraw.validateTime(initTime)) {
      throw new EntityError('initTime')
    }

    const withdrawUpdated = await this.repo.createWithdraw(
      notebookSerialNumber,
      studentRA,
      name,
      initTime,
    )

    return withdrawUpdated
  }
}