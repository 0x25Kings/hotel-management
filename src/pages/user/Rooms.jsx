import { useState } from 'react'
import useAsync from '../../hooks/useAsync'
import { roomService } from '../../services/roomService'
import RoomCard from '../../components/rooms/RoomCard'
import { Select, Spinner, EmptyState } from '../../components/common/ui'
export default function Rooms() {
  const [rooms] = useAsync(roomService.getRooms); const [f, setF] = useState({ type:'', cap:'', price:'', avail:'' })
  if (!rooms) return <Spinner />
  const list = rooms.filter(r => (!f.type || r.type === f.type) && (!f.cap || r.capacity >= +f.cap) && (!f.price || r.price <= +f.price) && (!f.avail || r.available))
  const set = k => e => setF({ ...f, [k]: e.target.value })
  return <div><h1 className="text-2xl font-semibold text-primary mb-4">Rooms</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <Select label="Type" onChange={set('type')}><option value="">All</option>{[...new Set(rooms.map(r => r.type))].map(t => <option key={t}>{t}</option>)}</Select>
      <Select label="Min capacity" onChange={set('cap')}><option value="">Any</option>{[2,3,4,5].map(n => <option key={n}>{n}</option>)}</Select>
      <Select label="Max price" onChange={set('price')}><option value="">Any</option>{[2000,3000,5000].map(n => <option key={n}>{n}</option>)}</Select>
      <Select label="Availability" onChange={set('avail')}><option value="">All</option><option value="1">Available only</option></Select></div>
    {list.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{list.map(r => <RoomCard key={r.id} room={r} />)}</div> : <EmptyState text="No rooms match your filters." />}</div>
}
