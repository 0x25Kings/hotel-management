import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function UserLayout() {
  const { user, logout } = useAuth(); const nav = useNavigate()
  return <div className="min-h-screen"><header className="bg-primary text-white"><div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-2">
    <Link to="/" className="font-semibold">Casa Azul</Link>
    <nav className="flex flex-wrap gap-4 text-sm flex-1"><Link to="/rooms">Rooms</Link>{user && <><Link to="/dashboard">Dashboard</Link><Link to="/bookings">My Bookings</Link><Link to="/profile">Profile</Link></>}</nav>
    {user ? <button className="text-sm" onClick={() => { logout(); nav('/') }}>Logout</button> : <Link to="/login" className="text-sm">Login</Link>}
  </div></header><main className="max-w-6xl mx-auto px-4 py-8"><Outlet /></main></div>
}
