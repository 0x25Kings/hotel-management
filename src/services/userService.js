import { wait } from './api'
import { db } from '../mock/data'
export const userService = { getUsers: () => wait(db.users) }
