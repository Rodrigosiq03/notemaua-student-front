/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { WithdrawRepositoryHttp } from "@/api/repositories/withdraw_repository_http"; 
import { createContext, PropsWithChildren, useState } from "react";
import { httpWithdraw } from "@/api/http";

export type WithdrawContextType = {
  createWithdraw: (notebookSerialNumber: string) => Promise<object | undefined>

  withdrawCreated: object | undefined

  error: any | undefined
}

const defaultWithdrawContext: WithdrawContextType = {
  createWithdraw: async (notebookSerialNumber: string) => undefined,
  withdrawCreated: undefined,
  error: undefined
}

export const WithdrawContext = createContext<WithdrawContextType>(defaultWithdrawContext)

export function WithdrawContextProvider({ children }: PropsWithChildren) {
  const [withdrawCreated, setWithdrawCreated] = useState()
  const [error, setError] = useState<any | undefined>()
  const repo = new WithdrawRepositoryHttp(httpWithdraw)

  async function createWithdraw(notebookSerialNumber: string,) {
    setError(undefined)
    try {
      const withdraw = await repo.createWithdraw(notebookSerialNumber)
      setWithdrawCreated(withdraw)
      return withdraw
    } catch (error: any) {
      setError(error)
      setTimeout(() => {
        console.error('Something went wrong with createWithdraw: ',error)
      }, 3000);
    }
  }

  return (
    <WithdrawContext.Provider value={{ createWithdraw, withdrawCreated, error }}>
      {children}
    </WithdrawContext.Provider>
  )
}