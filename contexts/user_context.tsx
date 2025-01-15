/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, PropsWithChildren, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserRepositoryHttp } from "@/api/repositories/user_repository_http";
import { httpUser } from "@/api/http";


export type UserContextType = {
  login(email: string, password: string): Promise<string | undefined>
  oauthLogin(authCode: string): Promise<string | undefined>
  forgotPassword: (email: string) => Promise<string | undefined>
  confirmForgotPassword: (email: string, newPassword: string) => Promise<string | undefined>
  firstAccess: (ra: string) => Promise<string | undefined>
  updatePassword: (ra: string, newPassword: string) => Promise<string | undefined>
  deleteUser: (ra: string) => Promise<string | undefined>
  isLogged: boolean
  setIsLogged: (isLogged: boolean) => void
  error: string | undefined
  getUser: () => Promise<object | undefined>
}

const defaultUserContext: UserContextType = {
  login: async (email: string, password: string) => '',
  oauthLogin: async (authCode: string) => '',
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

export function UserContextProvider({ children }: PropsWithChildren) {
  const [isLogged, setIsLogged] = useState(false)
  const [error, setError] = useState('')
  const repo = new UserRepositoryHttp(httpUser)

  async function oauthLogin(authCode: string) {
    try {
      const token = await repo.oauthLogin(authCode)
      if (!token) {
        return // ALTERAR POR FAVOR!!!!!!!!!!!!!!!!!
      }
      AsyncStorage.setItem('token', token)

      return token
    } catch (error: any) {
      console.error('Something went wrong with oauthLogin: ',error)
    }
  }

  async function login(email: string, password: string) {
    try {
      const token = await repo.login(email, password)
      AsyncStorage.setItem('studentRA', email.split('@')[0])
      AsyncStorage.setItem('token', token)

      return token
    } catch (error: any) {
      console.error('Something went wrong with login: ',error)
    }
  }

  async function forgotPassword(email: string) {
    try {
      const message = await repo.forgotPassword(email)

      setError(message)
      return message
    } catch (error: any) {
      console.error('Something went wrong with forgotPassword: ',error)
    }
  }

  async function confirmForgotPassword(email: string, newPassword: string) {
    try {
      const message = await repo.confirmForgotPassword(email, newPassword)
      
      return message
    } catch (error: any) {
      setError(error.message)
      console.error('Something went wrong with confirmForgotPassword: ',error)
    }
  }

  async function firstAccess(ra: string) {
    try {
      const message = await repo.firstAccess(ra)
      return message
    } catch (error: any) {
      console.error('Something went wrong with firstAccess: ',error)
    }
  }

  async function updatePassword(ra: string, newPassword: string) {
    try {
      const message = await repo.updatePassword(ra, newPassword)

      return message
    } catch (error: any) {
      console.error('Something went wrong with updatePassword: ',error)
    }
  }

  async function deleteUser(ra: string) {
    try {
      const ra = await AsyncStorage.getItem('studentRA')
      if(ra){
        const message = await repo.deleteUser(ra)
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
        const user = await repo.getUser(ra)
        return user
      }
    } catch (error: any) {
      console.error('Something went wrong with getUser: ',error)
    }
  }

  return (
    <UserContext.Provider value={{ 
      oauthLogin,
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