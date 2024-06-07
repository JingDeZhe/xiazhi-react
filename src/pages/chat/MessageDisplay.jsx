import { appendBase } from '@/utils/main'
import { server } from './db/server'
import Markdown from 'react-markdown'
import { Image } from 'antd'

export const MessageDisplay = ({ message }) => {
  const { message: content, type } = message
  const [avatar, setAvatar] = useState(appendBase('/img/avatar-0.jpg'))
  const isImageMessage = content.startsWith('fileStore:')

  useEffect(() => {
    server.getAvatar(message.fromId).then(setAvatar)
  }, [])
  return (
    <div className={cls('message-display', type)}>
      <img className="chat-avatar" src={avatar} />
      <div
        className={cls('message-display-content', type, {
          image: isImageMessage,
        })}
      >
        {isImageMessage ? (
          <ImageMessage content={content}></ImageMessage>
        ) : (
          <Markdown>{content}</Markdown>
        )}
      </div>
    </div>
  )
}

const ImageMessage = ({ content }) => {
  const [url, setUrl] = useState(appendBase('/img/empty-image.png'))

  useEffect(() => {
    server.readFile(content).then(setUrl)
  }, [])

  return <Image src={url} className="image-message"></Image>
}
