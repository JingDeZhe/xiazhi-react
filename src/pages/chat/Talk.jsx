import { useLoaderData } from 'react-router-dom'
import { TalkMenu } from './TalkMenu'
import { uid } from '@/utils/main'

export const talkLoader = async () => {
  return [
    {
      id: uid(),
      nickname: '张三',
      lastMessage: '早上好呀🤠',
      lastMessageTime: Date.now(),
    },
    {
      id: uid(),
      nickname: '李四',
      lastMessage: '早上好呀🤠',
      lastMessageTime: Date.now(),
    },
  ]
}

export const Talk = () => {
  const items = useLoaderData()
  return (
    <div className="chat-talk">
      <TalkMenu items={items}></TalkMenu>
    </div>
  )
}
