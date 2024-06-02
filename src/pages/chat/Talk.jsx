import { useLoaderData } from 'react-router-dom'
import { TalkMenu } from './TalkMenu'
import {
  fmtHumanTime,
  randomAvatar,
  randomName,
  randomTime,
  uid,
} from '@/utils/main'

export const talkLoader = async () => {
  return new Array(20)
    .fill()
    .map((_, idx) => {
      const t = randomTime(10)
      return {
        id: uid(),
        nickname: randomName(Math.random() < 0.5 ? 1 : 2),
        avatar: randomAvatar(idx + 1),
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
