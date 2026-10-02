import { Link, useParams } from 'react-router-dom'
import useAsync from '../../hooks/useAsync'
import { roomService } from '../../services/roomService'
import { Badge, Button, Spinner } from '../../components/common/ui'
import { peso } from '../../utils/format'
export default function RoomDetails() {
  const { id } = useParams(); const [r] = useAsync(() => roomService.getRoom(id), [id])
  if (!r) return <Spinner />
  return <div className="grid md:grid-cols-2 gap-8"><div className="h-72 bg-secondary/20 rounded-lg flex items-center justify-center text-secondary">Room image</div>
    <div className="space-y-3"><h1 className="text-2xl font-semibold text-primary">{r.name}</h1><Badge t={r.available ? 'ok' : 'bad'}>{r.available ? 'Available' : 'Unavailable'}</Badge>
      <p className="text-muted">{r.description}</p><p className="text-sm">Capacity: {r.capacity} guests</p><p className="text-xl font-semibold text-accent">{peso(r.price)} <span className="text-sm text-muted font-normal">/ night</span></p>
      <ul className="text-sm list-disc ml-5 marker:text-accent">{r.amenities.map(a => <li key={a}>{a}</li>)}</ul>
      <Link to={`/book?room=${r.id}`}><Button disabled={!r.available}>Book Now</Button></Link></div></div>
}
