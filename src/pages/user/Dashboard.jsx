import { Link } from 'react-router-dom'
import useAsync from '../../hooks/useAsync'
import { bookingService } from '../../services/bookingService'
import { useAuth } from '../../context/AuthContext'
import { Button, Card, Spinner, StatusBadge, StatCard, ProgressBar } from '../../components/common/ui'
import { peso, nights } from '../../utils/format'
export default function Dashboard() {
  const { user } = useAuth(); const [bs] = useAsync(() => bookingService.getMyBookings(user.id))
  if (!bs) return <Spinner />
  const up = bs.find(b => b.status === 'Confirmed' || b.status === 'Pending')
  const paid = bs.reduce((t, b) => t + b.paid, 0), owed = bs.filter(b => b.status !== 'Cancelled').reduce((t, b) => t + (b.total - b.paid), 0)
  const hour = new Date().getHours(), greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  return <div className="space-y-8">
    <div className="flex justify-between items-end flex-wrap gap-3"><div><p className="text-sm text-muted">{greet}</p><h1 className="text-3xl font-semibold text-primary">{user.name.split(' ')[0]}, welcome back</h1></div><Link to="/book"><Button variant="accent">+ Book a Room</Button></Link></div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4"><StatCard label="Total bookings" value={bs.length} /><StatCard label="Upcoming" value={bs.filter(b => ['Pending','Confirmed'].includes(b.status)).length} /><StatCard label="Total paid" value={peso(paid)} /><StatCard label="Balance due" value={peso(owed)} hint="Across active bookings" /></div>
    <div className="grid lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2 p-0 overflow-hidden"><div className="bg-primary text-white px-5 py-3 flex justify-between items-center"><h2 className="text-lg">Upcoming Stay</h2>{up && <StatusBadge value={up.status} />}</div>
        {up ? <div className="p-5 grid sm:grid-cols-3 gap-4 text-sm"><div><p className="text-xs uppercase text-muted">Room</p><p className="font-medium mt-1">{up.room}</p></div><div><p className="text-xs uppercase text-muted">Check-in</p><p className="font-medium mt-1">{up.checkIn}</p></div><div><p className="text-xs uppercase text-muted">Check-out</p><p className="font-medium mt-1">{up.checkOut} <span className="text-muted">({nights(up.checkIn, up.checkOut)} nights)</span></p></div>
          <div className="sm:col-span-3"><Link to={`/bookings/${up.id}`} className="text-primary underline">View booking details →</Link></div></div> : <p className="p-5 text-muted text-sm">No upcoming stays. Ready for a getaway?</p>}</Card>
      <Card><h2 className="text-lg text-primary mb-3">Payment</h2>{up ? <div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-muted">Paid</span><span className="font-medium">{peso(up.paid)}</span></div><ProgressBar value={up.paid} max={up.total} /><div className="flex justify-between"><span className="text-muted">Remaining</span><span className="font-medium text-warn">{peso(up.total - up.paid)}</span></div><StatusBadge value={up.paymentStatus} /></div> : <p className="text-muted text-sm">Nothing due.</p>}</Card></div>
    <Card><div className="flex justify-between items-center mb-2"><h2 className="text-lg text-primary">Recent Bookings</h2><Link to="/bookings" className="text-sm text-primary underline">View all</Link></div>
      {bs.slice(0, 4).map(b => <Link key={b.id} to={`/bookings/${b.id}`} className="flex items-center justify-between gap-3 text-sm py-3 border-t hover:bg-surface -mx-2 px-2 rounded"><div><p className="font-medium">{b.room}</p><p className="text-xs text-muted">{b.id} · {b.checkIn} → {b.checkOut}</p></div><div className="flex items-center gap-3"><span className="hidden sm:inline">{peso(b.total)}</span><StatusBadge value={b.status} /></div></Link>)}</Card></div>
}
