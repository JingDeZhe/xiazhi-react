import { useLoaderData } from 'react-router-dom'
import { server } from './db/server'
import { AddressMenu } from './AddressMenu'
import { sessionDel, sessionGet, sessionSet } from '@/utils/main'
import { AddressContent } from './AddressContent'
import { MainLayout } from './MainLayout'

export const addressBookLoader = async ({ params }) => {
  return server.getContacts(params.userId)
}

export const AddressBook = () => {
  const contacts = useLoaderData()
  const LAST_TARGET_ID = 'LAST_ADDRESS_TARGET_ID'
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
    <MainLayout>
      <AddressMenu
        contacts={contacts}
        targetId={targetId}
        onSelect={handleSelectItem}
      ></AddressMenu>
      <AddressContent></AddressContent>
    </MainLayout>
  )
}
