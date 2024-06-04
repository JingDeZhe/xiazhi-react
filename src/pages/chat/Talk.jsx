import { useLoaderData } from 'react-router-dom'
import { TalkMenu } from './TalkMenu'
import {
  fmtHumanTime,
  random,
  randomAvatar,
  randomInt,
  randomName,
  randomTime,
  uid,
} from '@/utils/main'
import { TalkContent } from './TalkContent'

export const talkLoader = async () => {
  return new Array(20)
    .fill()
    .map((_, idx) => {
      const t = randomTime(10)
      return {
        id: uid(),
        nickname: randomName(random() < 0.5 ? 1 : 2),
        avatar: randomAvatar(randomInt(100)),
        lastMessage: '早上好呀',
        lastMessageTime: fmtHumanTime(t),
        lastMessageTime0: t,
      }
    })
    .sort((a, b) => b.lastMessageTime0 - a.lastMessageTime0)
}

export const Talk = () => {
  const items = useLoaderData()
  const [activeId, setActiveId] = useState('')
  const handleSelectItem = (id) => {
    setActiveId(id)
  }
  const activeItem = items.find((d) => d.id === activeId)
  return (
    <div className="chat-talk">
      <TalkMenu
        items={items}
        activeId={activeId}
        onSelect={handleSelectItem}
      ></TalkMenu>
      <TalkContent targetId={activeId}></TalkContent>
    </div>
  )
}
