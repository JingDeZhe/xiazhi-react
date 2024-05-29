import { Outlet } from 'react-router-dom'
import { ChatToolbar } from './ChatToolbar'
import './main.scss'

export const Chat = () => {
  return (
    <div className="chat-ctn">
      <div className="chat">
        <ChatToolbar></ChatToolbar>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
