import { $host, $authhost } from "."
import jwt_decode from "jwt-decode"

export const registration = async (email, username, password) => {
  const { data, status } = await $host.post('api/user/reg', {email, username, password})
  if (status === 200) {
    localStorage.setItem('token', data)
    return jwt_decode(data)
  }else{
    throw new Error(data.message)
  }
}

export const login = async (email, password) => {
  const { data, status} = await $host.post('api/user/login', {email, password})
  if (status === 200) {
    localStorage.setItem('token', data)
    return jwt_decode(data)
  } else {
    throw new Error(data.message)
  }
}

export const check = async () => {
  const { data } = await $authhost.get('api/user/auth')
  localStorage.setItem('token', data)
  return jwt_decode(data)
}

export const changePassword = async (password, newPassword) => {
  const { data, status } = await $authhost.post('api/user/password', {  password, newPassword })
  if (status === 200) {
    return data
  } else {
    throw new Error(data.message)
  }
}