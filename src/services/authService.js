import { wait } from './api'
import { db } from '../mock/data'
export const authService = {
  login: async (email, password) => {
    if (!email.includes('@')) throw new Error('Invalid email')
    if (!password) throw new Error('Incorrect password')
    const isAdmin = email.includes('admin')
    const u = db.users.find(x => x.email === email) || { id: isAdmin ? 'admin' : 'u1', name: isAdmin ? 'Admin' : 'Maria Santos', email, phone:'0917 000 1111', created:'2026-06-01' }
    return wait({ token: 'mock-token', user: { ...u, role: isAdmin ? 'ADMIN' : 'USER' } })
  },
  register: async d => { const u = { id:'u'+Date.now(), name:`${d.first} ${d.last}`, email:d.email, phone:d.phone, role:'USER', active:true, created:new Date().toISOString().slice(0,10) }; db.users.push(u); return wait({ token:'mock-token', user:u }) },
}
