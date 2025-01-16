import { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginResponse = {
  token: string
  message: string
}

type OAuthResponse = {
  token: string
}

type ForgotPasswordResponse = {
  message: string
}

type ConfirmForgotPasswordResponse = {
  message: string
}

type UpdatePasswordResponse = {
  ra: string
  name: string
  email: string
  role: string
  message: string
}

type DeleteUserResponse = {
  ra: string
  message: string
}

type GetUserResponse = {
  ra: string
  name: string
  email: string
  role: string
  message: string
}

export class UserRepositoryHttp {
  constructor(private readonly httpUser: AxiosInstance) {}

  async login(email: string, password: string): Promise<string> {
    try {
      const response = await this.httpUser.post<LoginResponse>('/login', { email, password })
      await AsyncStorage.setItem('timeLogin', JSON.stringify(new Date().getTime()))
      if (response.status === 200) {
          return response.data.token
        }
        return ''
    } catch (error: any) {
        throw new Error(error)
    }
  }
  async oauthLogin(authCode: string): Promise<string | undefined> {
    try {
      const response = await this.httpUser.post<OAuthResponse>('/oauth-user', {authCode})
      await AsyncStorage.setItem('timeLogin', JSON.stringify(new Date().getTime()))
      if (response.status === 200) {
        return response.data.token
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }
    
  async forgotPassword(email: string): Promise<string> {
    try {
      const response = await this.httpUser.post<ForgotPasswordResponse>('/forgot-password', { email })
      if (response.status === 200) {

        const timeNow = new Date().getTime()
        await AsyncStorage.setItem('createdAt', JSON.stringify(timeNow))

        return response.data.message
      }
      return ''
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async confirmForgotPassword(email: string, password: string): Promise<string> {
    try {
      const createdAtAS = await AsyncStorage.getItem('createdAt')
      const createdAt = createdAtAS ? Number(JSON.parse(createdAtAS)) : -1
      const timeNow = new Date().getTime()
      if (timeNow - createdAt > 1000 * 60 * 60) {
        throw new Error('Expired time')
      }

      const response = await this.httpUser.post<ConfirmForgotPasswordResponse>('/confirm-forgot-password', { email, password, createdAt })
      if (response.status === 200) {
        // console.log(response.data.message)
        return response.data.message
      }
      return ''
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async updatePassword(ra: string, password: string): Promise<string> {
    try {
      const token = await AsyncStorage.getItem('token')
      const response = await this.httpUser.put<UpdatePasswordResponse>('/update-user?ra='+ra, { password },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        return response.data.message
      }
      return ''
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async deleteUser(ra: string): Promise<string> {
    try {
      const response = await this.httpUser.delete<DeleteUserResponse>('/delete-user', { data: { ra } })
      if (response.status === 200) {
        return response.data.message
      }
      return ''
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async firstAccess(ra: string): Promise<string> {
    try {
      const response = await this.httpUser.post<string>('/first-access', { ra })
      if (response.status === 200) {
        return response.data
      }
      return ''
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async getUser(ra: string) {
    try {
      const token = await AsyncStorage.getItem('token')
      const response = await this.httpUser.get<GetUserResponse>(`/get-user?ra=${ra}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        return {
          ra: response.data.ra,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role
        }
      }

      return {
        ra: '',
        name: '',
        email: '',
        role: ''
      }

    } catch (error: any) {
      throw new Error(error)
    }
  }
}