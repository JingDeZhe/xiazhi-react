import { useLoaderData } from 'react-router-dom'
import { TalkMenu } from './TalkMenu'
import { fmtHumanTime, randTime, uid } from '@/utils/main'

export const talkLoader = async () => {
  return new Array(20)
    .fill()
    .map((_, idx) => {
      const t = randTime(10)
      return {
        id: uid(),
        nickname: `张三${idx}`,
        avatar: '/img/avatar-0.jpg',
        lastMessage: '早上好呀🤠',
        lastMessageTime: fmtHumanTime(t),
        lastMessageTime0: t,
      }
    })
    .sort((a, b) => b.lastMessageTime0 - a.lastMessageTime0)
}

export const Talk = () => {
  const items = useLoaderData()
  return (
    <div className="chat-talk">
      <TalkMenu items={items}></TalkMenu>
    </div>
  )
}
