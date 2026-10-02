import { createContext, useContext, useState } from 'react'
import { authService } from '../services/authService'
const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)
export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => JSON.parse(localStorage.getItem('session') || 'null'))
  const save = s => { setSession(s); localStorage.setItem('session', JSON.stringify(s)) }
  const login = async (e, p) => { const s = await authService.login(e, p); save(s); return s.user }
  const register = async d => { const s = await authService.register(d); save(s); return s.user }
  const logout = () => { setSession(null); localStorage.removeItem('session') }
  return <Ctx.Provider value={{ user: session?.user, token: session?.token, login, register, logout }}>{children}</Ctx.Provider>
}
