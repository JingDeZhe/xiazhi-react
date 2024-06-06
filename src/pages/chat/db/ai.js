import { localGet, localSet } from '@/utils/main'
import ky from 'ky'

const API_KEY = 'KIMI_API_KEY'

let isAsked = false
export const chatWithOther = async (key, character, message) => {
  if (!isAsked && !localGet(API_KEY)) {
    const key = window.prompt(
      '请输入Kimi API Key以进行聊天，不然无法正常对话',
      ''
    )
    if (!key) {
      window.alert('空的API Key，对话功能将千篇一律')
    } else {
      localSet(API_KEY, key)
    }
  }
  isAsked = true
  if (localGet(API_KEY)) {
    return chatWithKimi(key, character, message)
  } else {
    return '缺少Kimi API Key……'
  }
}

const historyMap = new Map()
export const chatWithKimi = async (key, character, message) => {
  let t = historyMap.get(key)
  if (!t) historyMap.set(key, (t = []))
  t.push({ role: 'user', content: message })
  if (t.length > 3) {
    t.splice(0, t.length - 3)
  }
  const messages = [...t]
  if (character) {
    messages.unshift({
      role: 'system',
      content: character,
    })
  }
  return ky
    .post('https://api.moonshot.cn/v1/chat/completions', {
      json: {
        model: 'moonshot-v1-8k',
        messages,
        temperature: 0.3,
      },
      headers: {
        Authorization: `Bearer ${localGet(API_KEY)}`,
      },
    })
    .json()
    .then((d) => {
      const content = d.choices[0].message.content
      t.push({ role: 'assistant', content })
      return content
    })
    .catch((err) => {
      if (err.type === 'rate_limit_reached_error') {
        return '你说话太快了，请说慢点，比如说每句话间隔至少2秒以上。'
      }
      return err.message
    })
}
