import { Routes, Route, Link } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'
import Landing from './pages/user/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/user/Dashboard'
import Rooms from './pages/user/Rooms'
import RoomDetails from './pages/user/RoomDetails'
import BookingWizard from './pages/user/BookingWizard'
import MyBookings from './pages/user/MyBookings'
import BookingDetails from './pages/user/BookingDetails'
import Profile from './pages/user/Profile'
import { AdminDashboard, AdminBookings, AdminPayments, AdminTable } from './pages/admin/Admin'
export default function App() {
  return <Routes>
    <Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} />
    <Route element={<UserLayout />}>
      <Route path="/" element={<Landing />} /><Route path="/rooms" element={<Rooms />} /><Route path="/rooms/:id" element={<RoomDetails />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} /><Route path="/book" element={<BookingWizard />} /><Route path="/bookings" element={<MyBookings />} /><Route path="/bookings/:id" element={<BookingDetails />} /><Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
    <Route element={<ProtectedRoute role="ADMIN" />}><Route element={<AdminLayout />}>
      <Route path="/admin" element={<AdminDashboard />} /><Route path="/admin/bookings" element={<AdminBookings />} /><Route path="/admin/payments" element={<AdminPayments />} />
      <Route path="/admin/rooms" element={<AdminTable kind="rooms" />} /><Route path="/admin/addons" element={<AdminTable kind="addons" />} /><Route path="/admin/inventory" element={<AdminTable kind="inventory" />} /><Route path="/admin/users" element={<AdminTable kind="users" />} />
      <Route path="/admin/settings" element={<p className="text-muted">Settings: coming soon.</p>} />
    </Route></Route>
    <Route path="*" element={<div className="p-10 text-center">Not found. <Link to="/" className="text-primary underline">Home</Link></div>} />
  </Routes>
}
