import { useLoaderData, useNavigate } from 'react-router-dom'
import { server } from './db/server'
import { AddressMenu } from './AddressMenu'
import { sessionDel, sessionGet, sessionSet } from '@/utils/main'
import { AddressContent } from './AddressContent'
import { MainLayout } from './MainLayout'

export const addressBookLoader = async ({ params }) => {
  return server.getContacts(params.userId)
}

export const AddressBook = () => {
  const navigate = useNavigate()
  const contacts = useLoaderData()

  const LAST_CONTACT_ID = 'LAST_ADDRESS_CONTACT_ID'
  const getLastContactId = () => {
    const id = sessionGet(LAST_CONTACT_ID)
    if (id) {
      if (contacts.find((d) => d.id === id)) return id
      sessionDel(LAST_CONTACT_ID)
    }
    return ''
  }
  const [contactId, setContactId] = useState(getLastContactId)
  const handleSelectItem = (id) => {
    sessionSet(LAST_CONTACT_ID, id)
    setContactId(id)
  }

  const handleDeleteContact = (id) => {
    server.deleteRelation(id).then(() => {
      sessionSet(LAST_CONTACT_ID, '')
      setContactId('')
      refreshPage()
    })
  }

  const handleChat = (contactId) => {
    server.activeContact(contactId).then(() => {
      navigate('../talk', { state: { contactId } })
    })
  }

  const refreshPage = () => {
    navigate('.', { replace: true })
  }
  return (
    <MainLayout>
      <AddressMenu
        contacts={contacts}
        contactId={contactId}
        onSelect={handleSelectItem}
        onDelete={handleDeleteContact}
        onRefresh={refreshPage}
        onChat={handleChat}
      ></AddressMenu>
      <AddressContent
        contactId={contactId}
        onDelete={handleDeleteContact}
        onRefresh={refreshPage}
        onChat={handleChat}
      ></AddressContent>
    </MainLayout>
  )
}
