import { wait } from './api'
import { db } from '../mock/data'
export const roomService = {
  getRooms: () => wait(db.rooms),
  getRoom: id => wait(db.rooms.find(r => r.id === id)),
  updateRoom: (id, patch) => { Object.assign(db.rooms.find(r => r.id === id), patch); return wait(db.rooms) },
}
