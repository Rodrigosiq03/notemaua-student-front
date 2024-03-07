/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegistryWithdraw, containerWithdraw } from "../../@clean/shared/infra/containers/withdraw_container"; 
import { createContext, PropsWithChildren, useState } from "react";
import { CreateWithdrawUsecase } from "../../@clean/modules/withdraw/usecases/create_withdraw_usecase";
import { Withdraw } from "../../@clean/shared/domain/entities/withdraw";

export type WithdrawContextType = {
  createWithdraw: (notebookSerialNumber: string) => Promise<Withdraw | undefined>

  withdrawCreated: Withdraw | undefined
}

const defaultWithdrawContext: WithdrawContextType = {
  createWithdraw: async (notebookSerialNumber: string) => undefined,
  withdrawCreated: undefined
}

export const WithdrawContext = createContext<WithdrawContextType>(defaultWithdrawContext)

const createWithdrawUsecase = containerWithdraw.get<CreateWithdrawUsecase>(RegistryWithdraw.CreateWithdrawUsecase)

export function WithdrawContextProvider({ children }: PropsWithChildren) {
  const [withdrawCreated, setWithdrawCreated] = useState<Withdraw>()

  async function createWithdraw(notebookSerialNumber: string,) {
    try {
      const withdraw = await createWithdrawUsecase.execute(notebookSerialNumber)
      setWithdrawCreated(withdraw)
      return withdraw
    } catch (error: any) {
      console.error('Something went wrong with createWithdraw: ',error)
    }
  }

  return (
    <WithdrawContext.Provider value={{ createWithdraw, withdrawCreated }}>
      {children}
    </WithdrawContext.Provider>
  )
}