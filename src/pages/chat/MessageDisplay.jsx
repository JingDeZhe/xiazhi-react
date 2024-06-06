import { server } from './db/server'

export const MessageDisplay = ({ message }) => {
  const { message: content, type } = message
  const [avatar, setAvatar] = useState('/img/avatar-0.jpg')

  useEffect(() => {
    server.getAvatar(message.fromId).then(setAvatar)
  }, [])
  return (
    <div className={cls('message-display', type)}>
      <img className="message-display-avatar" src={avatar} />
      <div className={cls('message-display-content', type)}>{content}</div>
    </div>
  )
}
