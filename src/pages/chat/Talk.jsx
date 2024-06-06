import { useLoaderData } from 'react-router-dom'
import { TalkMenu } from './TalkMenu'
import { TalkContent } from './TalkContent'
import { server } from './db/server'
import { sessionDel, sessionGet, sessionSet } from '@/utils/main'
import { MainLayout } from './MainLayout'

export const talkLoader = async ({ params }) => {
  return server.getActiveContacts(params.userId)
}

const LAST_TARGET_ID = 'LAST_TALK_TARGET_ID'
export const Talk = () => {
  const contacts = useLoaderData()

  const getLastTargetId = () => {
    const id = sessionGet(LAST_TARGET_ID)
    if (id) {
      if (contacts.find((d) => d.id === id)) return id
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
    <MainLayout className="chat-talk">
      <TalkMenu
        contacts={contacts}
        targetId={targetId}
        onSelect={handleSelectItem}
      ></TalkMenu>
      <TalkContent targetId={targetId}></TalkContent>
    </MainLayout>
  )
}
