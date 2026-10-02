import { wait } from './api'
import { db } from '../mock/data'
export const bookingService = {
  getMyBookings: uid => wait(db.bookings.filter(b => b.userId === uid)),
  getAllBookings: () => wait(db.bookings),
  getBooking: id => wait(db.bookings.find(b => b.id === id)),
  // Backend must validate availability, totals and stock; client values are only a preview.
  createBooking: async (user, d) => { const b = { id:'BK-'+(1003+db.bookings.length), userId:user.id, customer:user.name, created:new Date().toISOString().slice(0,10), status:'Pending', ...d }; db.bookings.unshift(b); return wait(b) },
  updateStatus: (id, status) => { db.bookings.find(b => b.id === id).status = status; return wait(db.bookings) },
}
