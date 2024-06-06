import { localGet, localSet } from '@/utils/main'
import ky from 'ky'

const API_KEY = 'KIMI_API_KEY'

export const chatWithOther = async (key, character, message) => {
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
    return chatWithKimi(character, message)
  } else {
    return '缺少Kimi API Key……'
  }
}

const failList = []
export const chatWithKimi = async (character, message) => {
  return ky
    .post('https://api.moonshot.cn/v1/chat/completions', {
      json: {
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: character,
          },
          { role: 'user', content: message },
        ],
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
      if (err.type === 'rate_limit_reached_error') {
        return '你说话太快了，请说慢点，比如说间隔2秒以上'
      }
      return err.message
    })
}
