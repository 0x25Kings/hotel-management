import { useState } from 'react'
import useAsync from '../../hooks/useAsync'
import { bookingService } from '../../services/bookingService'
import { paymentService } from '../../services/paymentService'
import { addonService } from '../../services/addonService'
import { roomService } from '../../services/roomService'
import { userService } from '../../services/userService'
import { Button, Card, Input, Select, Spinner, StatusBadge, Table } from '../../components/common/ui'
import { peso, stockStatus } from '../../utils/format'
const H = ({ children }) => <h1 className="text-2xl font-semibold text-primary mb-4">{children}</h1>
export function AdminDashboard() {
  const [bs] = useAsync(bookingService.getAllBookings); const [ad] = useAsync(addonService.getAddOns); const [ps] = useAsync(paymentService.getPayments)
  if (!bs || !ad || !ps) return <Spinner />
  const low = ad.filter(a => stockStatus(a) !== 'In Stock')
  const cards = [['Total Bookings', bs.length], ['Pending', bs.filter(b => b.status === 'Pending').length], ['Confirmed', bs.filter(b => b.status === 'Confirmed').length], ['Pending Payments', ps.filter(p => p.status === 'Pending Verification').length], ['Low Stock Items', low.length]]
  return <div><H>Dashboard</H><div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">{cards.map(([t, v]) => <Card key={t}><p className="text-xs text-muted">{t}</p><p className="text-2xl font-semibold text-primary">{v}</p></Card>)}</div>
    <div className="grid lg:grid-cols-2 gap-4"><Card><h2 className="font-semibold mb-2">Recent Bookings</h2>{bs.slice(0, 4).map(b => <p key={b.id} className="text-sm py-1 border-t flex justify-between"><span>{b.id} · {b.customer}</span><StatusBadge value={b.status} /></p>)}</Card>
      <Card><h2 className="font-semibold mb-2">Low Stock Add-ons</h2>{low.map(a => <p key={a.id} className="text-sm py-1 border-t flex justify-between"><span>{a.name} ({a.stock})</span><StatusBadge value={stockStatus(a)} /></p>)}</Card></div></div>
}
export function AdminBookings() {
  const [bs, reload] = useAsync(bookingService.getAllBookings); const [q, setQ] = useState(''); const [st, setSt] = useState('')
  if (!bs) return <Spinner />
  const act = async (id, s) => { if (confirm(`Mark booking ${id} as ${s}?`)) { await bookingService.updateStatus(id, s); reload() } }
  const list = bs.filter(b => (b.customer + b.id).toLowerCase().includes(q.toLowerCase()) && (!st || b.status === st))
  return <div><H>Bookings</H><div className="grid grid-cols-2 gap-3 max-w-lg mb-4"><Input label="Search" onChange={e => setQ(e.target.value)} /><Select label="Status" onChange={e => setSt(e.target.value)}><option value="">All</option>{['Pending','Confirmed','Cancelled','Completed'].map(s => <option key={s}>{s}</option>)}</Select></div>
    <Table head={['ID','Customer','Room','Check-in','Check-out','Type','Payment','Status','Actions']}>{list.map(b => <tr key={b.id}><td>{b.id}</td><td>{b.customer}</td><td>{b.room}</td><td>{b.checkIn}</td><td>{b.checkOut}</td><td>{b.type}</td><td><StatusBadge value={b.paymentStatus} /></td><td><StatusBadge value={b.status} /></td>
      <td className="space-x-2 text-primary"><button onClick={() => act(b.id, 'Confirmed')}>Confirm</button><button onClick={() => act(b.id, 'Cancelled')}>Cancel</button><button onClick={() => act(b.id, 'Completed')}>Complete</button></td></tr>)}</Table></div>
}
export function AdminPayments() {
  const [ps, reload] = useAsync(paymentService.getPayments)
  if (!ps) return <Spinner />
  const rv = async (id, s) => { await paymentService.review(id, s); reload() }
  return <div><H>Payments</H><Table head={['ID','Booking','Customer','Amount','Method','Type','Proof','Status','Date','Actions']}>{ps.map(p => <tr key={p.id}><td>{p.id}</td><td>{p.bookingId}</td><td>{p.customer}</td><td>{peso(p.amount)}</td><td>{p.method}</td><td>{p.type}</td><td className="text-primary underline">{p.proof}</td><td><StatusBadge value={p.status} /></td><td>{p.date}</td>
    <td className="space-x-2 text-primary"><button onClick={() => rv(p.id, 'Approved')}>Approve</button><button onClick={() => rv(p.id, 'Rejected')}>Reject</button></td></tr>)}</Table></div>
}
const kinds = {
  rooms: ['Rooms', roomService.getRooms, ['Name','Type','Capacity','Price','Status'], r => [r.name, r.type, r.capacity, peso(r.price), <StatusBadge value={r.available ? 'In Stock' : 'Out of Stock'} />]],
  addons: ['Add-ons', addonService.getAddOns, ['Name','Category','Price','Stock','Status'], a => [a.name, a.category, peso(a.price), a.stock, <StatusBadge value={stockStatus(a)} />]],
  inventory: ['Inventory', addonService.getAddOns, ['Item','Category','Current','Minimum','Status'], a => [a.name, a.category, a.stock, a.min, <StatusBadge value={stockStatus(a)} />]],
  users: ['Users', userService.getUsers, ['ID','Name','Email','Phone','Role','Registered'], u => [u.id, u.name, u.email, u.phone, u.role, u.created]],
}
export function AdminTable({ kind }) {
  const [title, fn, head, row] = kinds[kind]; const [rows] = useAsync(fn, [kind])
  if (!rows) return <Spinner />
  return <div><H>{title}</H><Table head={head}>{rows.map((r, i) => <tr key={i}>{row(r).map((c, j) => <td key={j}>{c}</td>)}</tr>)}</Table></div>
}
