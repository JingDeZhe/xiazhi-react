import { useLoaderData } from 'react-router-dom'
import { TalkMenu } from './TalkMenu'
import { TalkContent } from './TalkContent'
import { server } from './db/server'
import { sessionDel, sessionGet, sessionSet } from '@/utils/main'

export const talkLoader = async ({ params }) => {
  return server.getContacts(params.userId)
}

const LAST_TARGET_ID = 'LAST_TARGET_ID'
export const Talk = () => {
  const items = useLoaderData()

  const getLastTargetId = () => {
    const id = sessionGet(LAST_TARGET_ID)
    if (id) {
      if (items.find((d) => d.id === id)) return id
      sessionDel(LAST_TARGET_ID)
    }
    return ''
  }

  const [targetId, setTargetId] = useState(getLastTargetId)
  const handleSelectItem = (id) => {
    sessionSet(LAST_TARGET_ID, id)
    setTargetId(id)
  }
  return (
    <div className="chat-talk">
      <TalkMenu
        items={items}
        targetId={targetId}
        onSelect={handleSelectItem}
      ></TalkMenu>
      <TalkContent targetId={targetId}></TalkContent>
    </div>
  )
}
