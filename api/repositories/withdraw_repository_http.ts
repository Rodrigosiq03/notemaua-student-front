import { AxiosError, AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class WithdrawRepositoryHttp {
  constructor(private readonly httpWithdraw: AxiosInstance) {}

  async createWithdraw(notebookSerialNumber: string) {
    try {
      const token = await AsyncStorage.getItem('token')
      const response = await this.httpWithdraw.post('/create-withdraw', {
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