import { Outlet, useParams } from 'react-router-dom'
import { ChatToolbar } from './ChatToolbar'
import './main.scss'
import { server } from './db/server'
import { useChatStore } from './store/main'

export const Chat = () => {
  const { userId } = useParams()
  const setUser = useChatStore((s) => s.setUser)
  useEffect(() => {
    server.getUser(userId).then(setUser)
  }, [userId])

  return (
    <div className="chat-ctn">
      <div className="chat">
        <ChatToolbar></ChatToolbar>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
