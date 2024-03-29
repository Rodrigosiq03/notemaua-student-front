/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegistryUser, containerUser } from "../../@clean/shared/infra/containers/user_container"; 
import { createContext, PropsWithChildren, useState } from "react";
import { LoginUsecase } from "../../@clean/modules/user/usecases/login_usecase";
import { ForgotPasswordUsecase } from "../../@clean/modules/user/usecases/forgot_password_usecase";
import { ConfirmForgotPasswordUsecase } from "../../@clean/modules/user/usecases/confirm_forgot_password_usecase";
import { FirstAccessUsecase } from "../../@clean/modules/user/usecases/first_access_usecase";
import { UpdatePasswordUsecase } from "../../@clean/modules/user/usecases/update_password_usecase";
import { DeleteUserUsecase } from "../../@clean/modules/user/usecases/delete_user_usecase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserJsonProps } from "../../@clean/shared/domain/entities/user";
import { GetUserUsecase } from "../../@clean/modules/user/usecases/get_user_usecase";


export type UserContextType = {
  login(email: string, password: string): Promise<string | undefined>
  forgotPassword: (email: string) => Promise<string | undefined>
  confirmForgotPassword: (email: string, newPassword: string) => Promise<string | undefined>
  firstAccess: (ra: string) => Promise<string | undefined>
  updatePassword: (ra: string, newPassword: string) => Promise<string | undefined>
  deleteUser: (ra: string) => Promise<string | undefined>
  isLogged: boolean
  setIsLogged: (isLogged: boolean) => void
  error: string | undefined
  getUser: () => Promise<GetUserJsonProps | undefined>
}

const defaultUserContext: UserContextType = {
  login: async (email: string, password: string) => '',
  forgotPassword: async (email: string) => '',
  confirmForgotPassword: async (email: string, newPassword: string) => '',
  firstAccess: async (ra: string) => '',
  updatePassword: async (ra: string, newPassword: string) => '',
  deleteUser: async (ra: string) => '',
  isLogged: false,
  setIsLogged: (value: boolean) => {},
  error: undefined,
  getUser: async () => undefined
}

export const UserContext = createContext(defaultUserContext)

const loginUsecase = containerUser.get<LoginUsecase>(RegistryUser.LoginUsecase)
const forgotPasswordUsecase = containerUser.get<ForgotPasswordUsecase>(RegistryUser.ForgotPasswordUsecase)
const confirmForgotPasswordUsecase = containerUser.get<ConfirmForgotPasswordUsecase>(RegistryUser.ConfirmForgotPasswordUsecase)
const firstAccessUsecase = containerUser.get<FirstAccessUsecase>(RegistryUser.FirstAccessUsecase)
const updatePasswordUsecase = containerUser.get<UpdatePasswordUsecase>(RegistryUser.UodatePasswordUsecase)
const deleteUserUsecase = containerUser.get<DeleteUserUsecase>(RegistryUser.DeleteUserUsecase)
const getUserUsecase = containerUser.get<GetUserUsecase>(RegistryUser.GetUserUsecase)

export function UserContextProvider({ children }: PropsWithChildren) {
  const [isLogged, setIsLogged] = useState(false)
  const [error, setError] = useState('')

  async function login(email: string, password: string) {
    try {
      const token = await loginUsecase.execute(email, password)
      AsyncStorage.setItem('studentRA', email.split('@')[0])
      AsyncStorage.setItem('token', token)

      return token
    } catch (error: any) {
      console.error('Something went wrong with login: ',error)
    }
  }

  async function forgotPassword(email: string) {
    try {
      const message = await forgotPasswordUsecase.execute(email)

      setError(message)
      return message
    } catch (error: any) {
      console.error('Something went wrong with forgotPassword: ',error)
    }
  }

  async function confirmForgotPassword(email: string, newPassword: string) {
    try {
      const message = await confirmForgotPasswordUsecase.execute(email, newPassword)
      
      return message
    } catch (error: any) {
      setError(error.message)
      console.error('Something went wrong with confirmForgotPassword: ',error)
    }
  }

  async function firstAccess(ra: string) {
    try {
      const message = await firstAccessUsecase.execute(ra)

      return message
    } catch (error: any) {
      console.error('Something went wrong with firstAccess: ',error)
    }
  }

  async function updatePassword(ra: string, newPassword: string) {
    try {
      const message = await updatePasswordUsecase.execute(ra, newPassword)

      return message
    } catch (error: any) {
      console.error('Something went wrong with updatePassword: ',error)
    }
  }

  async function deleteUser(ra: string) {
    try {
      const ra = await AsyncStorage.getItem('studentRA')
      if(ra){
        const message = await deleteUserUsecase.execute(ra)
        return message
      }
    } catch (error: any) {
      console.error('Something went wrong with deleteUser: ',error)
    }
  }

  async function getUser() {
    try {
      const ra = await AsyncStorage.getItem('studentRA')
      
      if (ra) {
        const user = await getUserUsecase.execute(ra)
        return user
      }
    } catch (error: any) {
      console.error('Something went wrong with getUser: ',error)
    }
  }

  return (
    <UserContext.Provider value={{ 
      login, 
      forgotPassword, 
      confirmForgotPassword, 
      firstAccess, 
      updatePassword, 
      deleteUser, 
      isLogged, 
      setIsLogged, 
      error,
      getUser
    }}>
      {children}
    </UserContext.Provider>
  )
}