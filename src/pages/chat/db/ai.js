import { localGet, localSet } from '@/utils/main'
import ky from 'ky'

const API_KEY = 'KIMI_API_KEY'

export const chatWithOther = async (message) => {
  if (!localGet(API_KEY)) {
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
  if (localGet(API_KEY)) {
    return chatWithKimi(message)
  } else {
    return '缺少Kimi API Key……'
  }
}

export const chatWithKimi = async (message) => {
  return ky
    .post('https://api.moonshot.cn/v1/chat/completions', {
      json: {
        model: 'moonshot-v1-8k',
        messages: [{ role: 'user', content: message }],
        temperature: 0.3,
      },
      headers: {
        Authorization: `Bearer ${localGet(API_KEY)}`,
      },
    })
    .json()
    .then((d) => {
      return d.choices?.[0]?.message?.content || '出错了……'
    })
    .catch((err) => {
      return err
    })
}
