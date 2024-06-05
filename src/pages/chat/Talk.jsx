import { useLoaderData } from 'react-router-dom'
import { TalkMenu } from './TalkMenu'
import { TalkContent } from './TalkContent'
import { server } from './db/server'
import { sessionDel, sessionGet, sessionSet } from '@/utils/main'

export const talkLoader = async ({ params }) => {
  return server.getContacts(params.userId)
}

const LAST_CONTACT_ID = 'LAST_CONTACT_ID'
export const Talk = () => {
  const items = useLoaderData()

  const getLastContactId = () => {
    const id = sessionGet(LAST_CONTACT_ID)
    if (id) {
      if (items.find((d) => d.id === id)) return id
      sessionDel(LAST_CONTACT_ID)
    }
    return ''
  }

  const [contactId, setContactId] = useState(getLastContactId)
  const handleSelectItem = (id) => {
    sessionSet(LAST_CONTACT_ID, id)
    setContactId(id)
  }
  return (
    <div className="chat-talk">
      <TalkMenu
        items={items}
        contactId={contactId}
        onSelect={handleSelectItem}
      ></TalkMenu>
      <TalkContent contactId={contactId}></TalkContent>
    </div>
  )
}
