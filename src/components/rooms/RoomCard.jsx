import { Link } from 'react-router-dom'
import { Card, Badge, Button } from '../common/ui'
import { peso } from '../../utils/format'
export default function RoomCard({ room }) {
  return <Card className="p-0 overflow-hidden flex flex-col">
    <div className="h-40 bg-secondary/20 flex items-center justify-center text-secondary text-sm">Room image</div>
    <div className="p-5 flex-1 flex flex-col gap-2">
      <div className="flex justify-between"><h3 className="font-semibold text-primary">{room.name}</h3><Badge t={room.available ? 'ok' : 'bad'}>{room.available ? 'Available' : 'Unavailable'}</Badge></div>
      <p className="text-xs text-muted">{room.type} · up to {room.capacity} guests</p>
      <p className="text-sm text-muted flex-1">{room.description}</p>
      <p className="font-semibold text-accent">{peso(room.price)} <span className="text-xs text-muted font-normal">/ night</span></p>
      <div className="flex gap-2"><Link to={`/rooms/${room.id}`} className="flex-1"><Button variant="outline" className="w-full">View Room</Button></Link>
      <Link to={`/book?room=${room.id}`} className="flex-1"><Button className="w-full" disabled={!room.available}>Book Now</Button></Link></div>
    </div></Card>
}
