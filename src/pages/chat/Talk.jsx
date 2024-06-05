import { useLoaderData } from 'react-router-dom'
import { TalkMenu } from './TalkMenu'
import { TalkContent } from './TalkContent'
import { server } from './db/server'

export const talkLoader = async ({ params }) => {
  return server.getContacts(params.userId)
}

export const Talk = () => {
  const items = useLoaderData()
  const [activeId, setActiveId] = useState('')
  const handleSelectItem = (id) => {
    setActiveId(id)
  }
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
