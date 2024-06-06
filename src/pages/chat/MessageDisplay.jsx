import { server } from './db/server'
import Markdown from 'react-markdown'

export const MessageDisplay = ({ message }) => {
  const { message: content, type } = message
  const [avatar, setAvatar] = useState('/img/avatar-0.jpg')

  useEffect(() => {
    server.getAvatar(message.fromId).then(setAvatar)
  }, [])
  return (
    <div className={cls('message-display', type)}>
      <img className="message-display-avatar" src={avatar} />
      <Markdown className={cls('message-display-content', type)}>
        {content}
      </Markdown>
    </div>
  )
}
