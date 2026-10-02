import { useParams } from 'react-router-dom'
import useAsync from '../../hooks/useAsync'
import { bookingService } from '../../services/bookingService'
import { Card, Spinner, StatusBadge } from '../../components/common/ui'
import { peso } from '../../utils/format'
const L = ({ a, b }) => <div className="flex justify-between text-sm py-1"><span className="text-muted">{a}</span><span>{b}</span></div>
export default function BookingDetails() {
  const { id } = useParams(); const [b] = useAsync(() => bookingService.getBooking(id), [id])
  if (!b) return <Spinner />
  return <div className="max-w-2xl space-y-4"><h1 className="text-2xl font-semibold text-primary">Booking {b.id}</h1>
    {b.paymentStatus === 'Pending' && b.method === 'Online' && <p className="text-warn text-sm">Payment proof submitted. Waiting for admin verification.</p>}
    <Card><h2 className="font-semibold mb-2">Booking Information</h2><L a="Booking date" b={b.created} /><L a="Type" b={b.type} /><L a="Status" b={<StatusBadge value={b.status} />} /></Card>
    <Card><h2 className="font-semibold mb-2">Stay</h2><L a="Room" b={b.room} /><L a="Check-in" b={b.checkIn} /><L a="Check-out" b={b.checkOut} /><L a="Guests" b={b.guests} /></Card>
    <Card><h2 className="font-semibold mb-2">Add-ons</h2>{b.addons.length ? b.addons.map(a => <L key={a.name} a={`${a.name} × ${a.qty}`} b={peso(a.qty * a.price)} />) : <p className="text-sm text-muted">None</p>}</Card>
    <Card><h2 className="font-semibold mb-2">Payment</h2><L a="Total" b={peso(b.total)} /><L a="Paid" b={peso(b.paid)} /><L a="Remaining" b={peso(b.total - b.paid)} /><L a="Method" b={b.method} /><L a="Status" b={<StatusBadge value={b.paymentStatus} />} /></Card></div>
}
