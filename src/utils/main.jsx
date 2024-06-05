import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { nanoid } from 'nanoid'
export { randomName } from '@lotusloli/random-names'
export {
  set as kySet,
  get as kyGet,
  clear as kyClear,
  del as kyDel,
} from 'idb-keyval'

const DAY_MS = 24 * 60 * 60 * 1000

dayjs.extend(relativeTime)

export const uid = () => {
  return nanoid()
}

export const fmtTime = (t, fmt = 'YYYY-MM-DD HH:MM:ss') => {
  return dayjs(t).format(fmt)
}

export const fmtHumanTime = (t) => {
  const diff = dayjs().diff(t)
  if (diff < DAY_MS) {
    return dayjs(t).format('HH:MM:ss')
  } else {
    return dayjs(t).fromNow()
  }
}

export const randomTime = (maxDaysInPast = 365) => {
  const now = dayjs().valueOf()
  const t = now - Math.floor(Math.random() * maxDaysInPast * DAY_MS)
  return t
}

export const randomAvatar = (index = 1) => {
  const t = index.toString().padStart(3, '0')
  return `https://store-1258290249.cos.ap-guangzhou.myqcloud.com/image/avatar/avatar-${t}.png`
}

export const sample = (arr) => {
  const len = arr == null ? 0 : arr.length
  return len ? arr[Math.floor(Math.random() * len)] : undefined
}

export const random = (a = 1, b = 0) => {
  const lower = Math.min(a, b)
  const upper = Math.max(a, b)
  return lower + Math.random() * (upper - lower)
}

export const randomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b))
  const upper = Math.floor(Math.max(a, b))
  return Math.floor(lower + Math.random() * (upper - lower + 1))
}

export const sessionSet = (k, v) => {
  sessionStorage.setItem(k, v)
}

export const sessionGet = (k) => {
  return sessionStorage.getItem(k)
}

export const sessionDel = (k) => {
  sessionStorage.removeItem(k)
}
