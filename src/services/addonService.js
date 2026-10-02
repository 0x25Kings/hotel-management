import { wait } from './api'
import { db } from '../mock/data'
export const addonService = { getAddOns: () => wait(db.addons) }
