import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { nanoid } from 'nanoid'

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

export const randTime = (maxDaysInPast = 365) => {
  const now = dayjs().valueOf()
  const t = now - Math.floor(Math.random() * maxDaysInPast * DAY_MS)
  return t
}
