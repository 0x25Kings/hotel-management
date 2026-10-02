import { wait } from './api'
import { db } from '../mock/data'
export const paymentService = {
  getPayments: () => wait(db.payments),
  uploadPaymentProof: (bookingId, file, amount) => { db.payments.unshift({ id:'PAY-'+(db.payments.length+1), bookingId, customer:'Customer', amount, method:'Online', type:'Payment', proof:file.name, status:'Pending Verification', date:new Date().toISOString().slice(0,10) }); return wait(true) },
  review: (id, status) => { db.payments.find(x => x.id === id).status = status; return wait(db.payments) },
}
