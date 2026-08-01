import { ref } from 'vue'
import api from '@/api'

const user = ref(null)

export function useAuth() {
  const getCsrfCookie = () => api.get('/sanctum/csrf-cookie')

  const login = async (email, password) => {
    await getCsrfCookie()
    await api.post('/api/login', { email, password })
    await fetchUser()
  }

  const register = async (name, email, password, password_confirmation) => {
    await getCsrfCookie()
    await api.post('/api/register', { name, email, password, password_confirmation })
    await fetchUser()
  }

  const logout = async () => {
    await api.post('/api/logout')
    user.value = null
  }

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/api/user')
      user.value = data
    } catch {
      user.value = null
    }
  }

  return { user, login, register, logout, fetchUser }
}