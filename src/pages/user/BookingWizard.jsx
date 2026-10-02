import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAsync from '../../hooks/useAsync'
import { roomService } from '../../services/roomService'
import { addonService } from '../../services/addonService'
import { bookingService } from '../../services/bookingService'
import { paymentService } from '../../services/paymentService'
import { useAuth } from '../../context/AuthContext'
import { Button, Card, Input, Select, Spinner, StatusBadge } from '../../components/common/ui'
import { peso, nights, stockStatus } from '../../utils/format'
const steps = ['Room', 'Add-ons', 'Type', 'Payment', 'Confirm']
export default function BookingWizard() {
  const [q] = useSearchParams(); const nav = useNavigate(); const { user } = useAuth()
  const [rooms] = useAsync(roomService.getRooms); const [addons] = useAsync(addonService.getAddOns)
  const [s, setS] = useState(0); const [d, setD] = useState({ roomId: q.get('room') || '', checkIn:'', checkOut:'', guests:1, type:'Online', method:'Cash', plan:'down' })
  const [qty, setQty] = useState({}); const [file, setFile] = useState(null); const [busy, setBusy] = useState(false)
  if (!rooms || !addons) return <Spinner />
  const room = rooms.find(r => r.id === d.roomId); const n = nights(d.checkIn, d.checkOut)
  const chosen = addons.filter(a => qty[a.id] > 0).map(a => ({ name: a.name, qty: qty[a.id], price: a.price }))
  const sub = room ? room.price * n : 0, add = chosen.reduce((t, a) => t + a.qty * a.price, 0), total = sub + add
  const due = d.method === 'Online' ? (d.plan === 'down' ? total * 0.25 : total) : 0
  const set = k => e => setD({ ...d, [k]: e.target.value })
  const valid = [room && n > 0 && +d.guests <= room?.capacity, true, true, d.method === 'Cash' || file, true][s]
  const confirm = async () => { setBusy(true)
    const b = await bookingService.createBooking(user, { roomId: room.id, room: room.name, checkIn: d.checkIn, checkOut: d.checkOut, guests: +d.guests, type: d.type, method: d.method, total, paid: 0, addons: chosen, paymentStatus: d.method === 'Online' ? 'Pending' : 'Pending' })
    if (file) await paymentService.uploadPaymentProof(b.id, file, due); nav(`/bookings/${b.id}`) }
  const Row = ({ a, b, bold }) => <div className={`flex justify-between text-sm ${bold ? 'font-semibold' : ''}`}><span>{a}</span><span>{b}</span></div>
  return <div className="max-w-2xl mx-auto"><h1 className="text-2xl font-semibold text-primary mb-4">Book a Room</h1>
    <div className="flex gap-2 mb-6 text-xs">{steps.map((t, i) => <div key={t} className={`flex-1 text-center py-1 border-b-2 ${i <= s ? 'border-primary text-primary' : 'border-gray-200 text-muted'}`}>{i + 1}. {t}</div>)}</div>
    <Card className="space-y-4">
      {s === 0 && <><Select label="Room" value={d.roomId} onChange={set('roomId')}><option value="">Select…</option>{rooms.filter(r => r.available).map(r => <option key={r.id} value={r.id}>{r.name} — {peso(r.price)}</option>)}</Select>
        <div className="grid grid-cols-2 gap-3"><Input label="Check-in" type="date" value={d.checkIn} onChange={set('checkIn')} /><Input label="Check-out" type="date" value={d.checkOut} onChange={set('checkOut')} /></div>
        <Input label={`Guests${room ? ` (max ${room.capacity})` : ''}`} type="number" min="1" value={d.guests} onChange={set('guests')} /></>}
      {s === 1 && addons.map(a => { const out = stockStatus(a) === 'Out of Stock'; return <div key={a.id} className={`flex items-center justify-between gap-3 border-b pb-3 ${out ? 'opacity-60' : ''}`}>
        <div><p className="font-medium text-sm">{a.name} <span className="text-xs text-muted">({a.category})</span></p><p className="text-xs text-muted">{a.description} · {peso(a.price)}</p>{out && <p className="text-bad text-xs">Out of Stock</p>}</div>
        <input type="number" min="0" max={a.stock} disabled={out} value={qty[a.id] || 0} onChange={e => setQty({ ...qty, [a.id]: +e.target.value })} className="w-16 border rounded-lg px-2 py-1" /></div> })}
      {s === 2 && <Select label="Booking type" value={d.type} onChange={set('type')}><option>Online</option><option>Walk-in</option></Select>}
      {s === 3 && <><Select label="Payment method" value={d.method} onChange={set('method')}><option>Cash</option><option>Online</option></Select>
        {d.method === 'Online' && <><Select label="Amount" value={d.plan} onChange={set('plan')}><option value="down">25% Down Payment</option><option value="full">Full Payment</option></Select>
          <div className="bg-surface p-3 rounded-lg text-sm"><p className="font-medium">Pay {peso(due)} to GCash 0917 123 4567 (Casa Azul), then upload proof.</p></div>
          <label className="block text-sm text-muted">Payment proof (JPG, PNG, PDF)<input type="file" accept=".jpg,.jpeg,.png,.pdf" className="block mt-1" onChange={e => setFile(e.target.files[0])} /></label>
          {file && <p className="text-sm">Selected: {file.name}</p>}</>}
        <div className="space-y-1 border-t pt-3"><Row a="Room subtotal" b={peso(sub)} /><Row a="Add-ons" b={peso(add)} /><Row a="Total" b={peso(total)} bold /><Row a="Required payment" b={peso(due)} /><Row a="Remaining balance" b={peso(total - due)} /></div></>}
      {s === 4 && <div className="space-y-1"><Row a="Room" b={room.name} /><Row a="Dates" b={`${d.checkIn} → ${d.checkOut} (${n} nights)`} /><Row a="Guests" b={d.guests} /><Row a="Add-ons" b={chosen.map(a => `${a.name} ×${a.qty}`).join(', ') || 'None'} /><Row a="Booking type" b={d.type} /><Row a="Payment method" b={d.method} />
        <Row a="Amount to pay" b={peso(due)} /><Row a="Remaining" b={peso(total - due)} /><Row a="Total" b={peso(total)} bold />
        {file && <p className="text-sm text-warn pt-2">Payment proof will be submitted. Waiting for admin verification. <StatusBadge value="Pending Verification" /></p>}</div>}
      <div className="flex justify-between pt-2"><Button variant="outline" disabled={s === 0} onClick={() => setS(s - 1)}>Back</Button>
        {s < 4 ? <Button disabled={!valid} onClick={() => setS(s + 1)}>Next</Button> : <Button disabled={busy} onClick={confirm}>Confirm Booking</Button>}</div></Card></div>
}
