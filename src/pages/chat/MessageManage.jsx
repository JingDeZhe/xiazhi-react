import { localGet, localSet } from '@/utils/main'
import { server } from './db/server'
import { Button, Input, Popconfirm, Spin, message } from 'antd'
import Draggable from 'react-draggable'

export const MessageManage = ({ fromId, targetId, onClose }) => {
  const [target, setTarget] = useState(null)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const nodeRef = useRef(null)
  const scrollbar = useRef(null)

  useEffect(() => {
    refreshMessages()
  }, [fromId, targetId])

  useEffect(() => {
    if (scrollbar.current) {
      const { viewport } = scrollbar.current.osInstance().elements()
      viewport.scrollTop = viewport.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    server.getCharacter(fromId, targetId).then(setTarget)
  }, [targetId])

  const refreshMessages = () => {
    setLoading(true)
    server.getMessages(fromId, targetId).then((d) => {
      setMessages(d)
      setLoading(false)
    })
  }

  const handleDeleleAllMessages = () => {
    server.deleteAllMessages(fromId, targetId).then(() => {
      refreshMessages()
      message.success('Successful')
    })
  }

  const MESSAGE_MANAGE_POS = 'MESSAGE_MANAGE_POS'
  const defaultPosition = localGet(MESSAGE_MANAGE_POS) || { x: 100, y: 100 }
  const handleStop = (e, data) => {
    localSet(MESSAGE_MANAGE_POS, { x: data.x, y: data.y })
  }

  if (!target) return <></>

  return (
    <Draggable
      nodeRef={nodeRef}
      onStop={handleStop}
      defaultPosition={defaultPosition}
      handle=".handle"
    >
      <div className="message-manage full-ctn col-ctn" ref={nodeRef}>
        <i className="close-btn i-tabler-x" onClick={onClose}></i>
        <div className="mb-3 v-center p-2 handle">
          <span>{target.alias}</span>
        </div>
        <Spin
          wrapperClassName="ctn-body full-spin"
          className="full-ctn"
          spinning={loading}
        >
          <div className="col-ctn p-2">
            <Scrollbar
              options={{
                scrollbars: { autoHide: 'scroll', autoHideDelay: 500 },
              }}
              className="ctn-body"
              ref={scrollbar}
            >
              <div className="py-2 px-4">
                {messages.map((d) => {
                  return (
                    <div className={cls('message', d.type)} key={d.id}>
                      <div className={cls('message-content', d.type)}>
                        {d.message}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Scrollbar>
            <div className="mt-2 text-right space-x-2">
              <Popconfirm
                icon={null}
                description="Sure to delete all messages?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleDeleleAllMessages}
              >
                <Button danger>Delete All Messages</Button>
              </Popconfirm>
            </div>
          </div>
        </Spin>
      </div>
    </Draggable>
  )
}