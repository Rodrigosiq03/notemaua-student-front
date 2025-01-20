/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, PropsWithChildren, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserRepositoryHttp } from "@/api/repositories/user_repository_http";
import { httpUser } from "@/api/http";


export type UserContextType = {
  oauthLogin(authCode: string, codeVerifier: string): Promise<string | undefined | { token: string, ra: string }>
  deleteUser: () => Promise<boolean | undefined>
  isLogged: boolean
  setIsLogged: (isLogged: boolean) => void
  error: string | undefined
  getUser: () => Promise<Object | undefined>
}

const defaultUserContext: UserContextType = {
  oauthLogin: async (authCode: string, codeVerifier: string) => '',
  deleteUser: async () => undefined,
  getUser: async () => undefined,
  isLogged: false,
  setIsLogged: (value: boolean) => {},
  error: undefined,
}

export const UserContext = createContext(defaultUserContext)

export function UserContextProvider({ children }: PropsWithChildren) {
  const [isLogged, setIsLogged] = useState(false)
  const [error, setError] = useState('')
  const repo = new UserRepositoryHttp(httpUser)

  async function oauthLogin(authCode: string, codeVerifier: string) {
    try {
      const token = await repo.oauthLogin(authCode, codeVerifier)
      if (!token) {
        throw new Error('Token not found')
      }
      if (typeof token === 'string') {
        AsyncStorage.setItem('token', token)
      }
      if (typeof token === 'object') {
        AsyncStorage.setItem('token', token.token)
        AsyncStorage.setItem('studentRA', token.ra)
      }

      return token
    } catch (error: any) {
      console.error('Something went wrong with oauthLogin: ',error)
      throw new Error(error)
    }
  }

  async function deleteUser() {
    try {
      const token = await AsyncStorage.getItem('token')
      if(token){
        const message = await repo.deleteUser(token)
        return message
      }
    } catch (error: any) {
      console.error('Something went wrong with deleteUser: ',error)
    }
  }

  async function getUser() {
    try {
      const user = await repo.getUser()
      return user
    } catch (error: any) {
      console.error('Something went wrong with getUser: ',error)
    }
  }

  return (
    <UserContext.Provider value={{ 
      oauthLogin,
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