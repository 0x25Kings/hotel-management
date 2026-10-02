import { Link } from 'react-router-dom'
import useAsync from '../../hooks/useAsync'
import { roomService } from '../../services/roomService'
import RoomCard from '../../components/rooms/RoomCard'
import Slideshow from '../../components/common/Slideshow'
import { Button, Card } from '../../components/common/ui'
export default function Landing() {
  const [rooms] = useAsync(roomService.getRooms)
  return <div className="space-y-12">
    <Slideshow><p className="text-accent text-sm tracking-widest uppercase mb-3">Welcome</p><h1 className="text-4xl md:text-5xl font-bold">Casa Azul Resort</h1><p className="text-white/85 mt-3 max-w-xl">Simple, comfortable stays by the sea. Reserve your room in a few steps.</p>
      <div className="flex justify-center gap-3 mt-6 flex-wrap"><Link to="/rooms"><Button variant="accent">Book a Room</Button></Link><Link to="/login"><Button variant="outline" className="!text-white !border-white/60 hover:!bg-white/10">Login</Button></Link><Link to="/register"><Button variant="outline" className="!text-white !border-white/60 hover:!bg-white/10">Register</Button></Link></div></Slideshow>
    <section><h2 className="text-xl font-semibold text-primary mb-4">Featured Rooms</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{rooms?.slice(0, 3).map(r => <RoomCard key={r.id} room={r} />)}</div></section>
    <section><h2 className="text-xl font-semibold text-primary mb-4">How Booking Works</h2><div className="grid sm:grid-cols-4 gap-4">{['Choose a room','Pick dates & add-ons','Pay online or cash','Get confirmed'].map((s, i) => <Card key={s}><span className="text-accent font-bold">{i + 1}</span><p className="text-sm mt-1">{s}</p></Card>)}</div></section>
    <section><h2 className="text-xl font-semibold text-primary mb-2">Add-ons</h2><p className="text-muted text-sm">Food, drinks and bundles such as breakfast, coffee and the family package.</p></section>
    <footer className="border-t pt-6 text-xs text-muted">© 2026 Casa Azul Resort</footer></div>
}
