import 'react-contexify/dist/ReactContexify.css'
import './main.scss'
import { Outlet, useParams } from 'react-router-dom'
import { ChatToolbar } from './ChatToolbar'
import { server } from './db/server'
import { useChatStore } from './store/main'
import { ConfigProvider } from 'antd'

export const Chat = () => {
  const { userId } = useParams()
  const setUser = useChatStore((s) => s.setUser)
  useEffect(() => {
    server.getUser(userId).then(setUser)
  }, [userId])

  return (
    <ConfigProvider
      theme={{
        components: {
          Descriptions: {
            titleMarginBottom: '0.5rem',
            itemPaddingBottom: '0.2rem',
          },
        },
      }}
    >
      <div className="chat-ctn" onContextMenu={(e) => e.preventDefault()}>
        <div className="chat">
          <ChatToolbar></ChatToolbar>
          <Outlet></Outlet>
        </div>
      </div>
    </ConfigProvider>
  )
}
