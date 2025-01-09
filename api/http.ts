import axios from 'axios'

export const httpUser = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_AUTH
})

export const httpWithdraw = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_WITHDRAW
})
