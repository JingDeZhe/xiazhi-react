import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { TalkMenu } from './TalkMenu'
import { TalkContent } from './TalkContent'
import { server } from './db/server'
import { sessionDel, sessionGet, sessionSet } from '@/utils/main'
import { MainLayout } from './MainLayout'

export const talkLoader = async ({ params }) => {
  return server.getActiveContacts(params.userId)
}

const LAST_CONTACT_ID = 'LAST_TALK_CONTACT_ID'
export const Talk = () => {
  const navigate = useNavigate()
  const contacts = useLoaderData()
  const { state } = useLocation()

  const getLastContactId = () => {
    const id = state?.contactId || sessionGet(LAST_CONTACT_ID)
    if (id) {
      if (contacts.find((d) => d.id === id)) {
        sessionSet(LAST_CONTACT_ID, id)
        return id
      }
      sessionDel(LAST_CONTACT_ID)
    }
    return ''
  }

  const [contactId, setContactId] = useState(getLastContactId)
  const handleSelectContact = (id) => {
    sessionSet(LAST_CONTACT_ID, id)
    setContactId(id)
  }

  const refreshPage = () => {
    navigate('.', { replace: true })
  }
  return (
    <MainLayout className="chat-talk">
      <TalkMenu
        contacts={contacts}
        contactId={contactId}
        onSelect={handleSelectContact}
        onRefresh={refreshPage}
      ></TalkMenu>
      <TalkContent contactId={contactId}></TalkContent>
    </MainLayout>
  )
}
