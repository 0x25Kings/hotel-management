import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const items = ['Dashboard','Bookings','Rooms','Add-ons','Inventory','Payments','Users','Settings']
const path = i => i === 'Dashboard' ? '/admin' : '/admin/' + i.toLowerCase().replace('-', '')
export default function AdminLayout() {
  const [open, setOpen] = useState(false); const { logout } = useAuth(); const nav = useNavigate()
  return <div className="min-h-screen md:flex">
    <aside className={`${open ? 'block' : 'hidden'} md:block bg-primary text-white md:w-56 p-4 space-y-1`}>
      <div className="font-semibold mb-4">Casa Azul Admin</div>
      {items.map(i => <NavLink key={i} to={path(i)} end={i === 'Dashboard'} onClick={() => setOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}`}>{i}</NavLink>)}
      <button className="px-3 py-2 text-sm" onClick={() => { logout(); nav('/') }}>Logout</button>
    </aside>
    <div className="flex-1"><button className="md:hidden m-3 px-3 py-2 border rounded-lg text-sm" onClick={() => setOpen(!open)}>☰ Menu</button><main className="p-6"><Outlet /></main></div>
  </div>
}
