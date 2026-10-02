import { Link } from 'react-router-dom'
import useAsync from '../../hooks/useAsync'
import { bookingService } from '../../services/bookingService'
import { useAuth } from '../../context/AuthContext'
import { Spinner, StatusBadge, Table, EmptyState } from '../../components/common/ui'
import { peso } from '../../utils/format'
export default function MyBookings() {
  const { user } = useAuth(); const [bs] = useAsync(() => bookingService.getMyBookings(user.id))
  if (!bs) return <Spinner />
  return <div><h1 className="text-2xl font-semibold text-primary mb-4">My Bookings</h1>
    {bs.length ? <Table head={['ID','Room','Check-in','Check-out','Total','Payment','Status','Created','']}>{bs.map(b => <tr key={b.id}><td>{b.id}</td><td>{b.room}</td><td>{b.checkIn}</td><td>{b.checkOut}</td><td>{peso(b.total)}</td><td><StatusBadge value={b.paymentStatus} /></td><td><StatusBadge value={b.status} /></td><td>{b.created}</td><td><Link className="text-primary underline" to={`/bookings/${b.id}`}>View Details</Link></td></tr>)}</Table> : <EmptyState text="No bookings yet." />}</div>
}
