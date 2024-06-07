import { server } from './db/server'
import { useChatStore } from './store/main'
import Split from 'react-split'
import { MessageInput } from './MessageInput'
import { Spin } from 'antd'
import { MessageManage } from './MessageManage'
import { MessageDisplay } from './MessageDisplay'
import { EmptyInfo } from './EmptyInfo'

export const TalkContent = ({ targetId }) => {
  const user = useChatStore((s) => s.user)
  const [contact, setContact] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageManageVisible, setMessageManageVisible] = useState(false)
  const scrollbar = useRef(null)

  const refreshMessages = () => {
    return server.getMessages(user.id, targetId).then(setMessages)
  }
  useEffect(() => {
    if (!user?.id) return
    server.getUser(targetId).then(setContact)
    refreshMessages()
  }, [user, targetId])

  useEffect(() => {
    if (scrollbar.current) {
      const { viewport } = scrollbar.current.osInstance().elements()
      viewport.scrollTop = viewport.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (message) => {
    setLoading(true)
    server.sendMessage(user.id, targetId, message).then(() => {
      server
        .getMessages(user.id, targetId)
        .then(setMessages)
        .then(() => {
          setLoading(false)
        })
    })
  }

  const handleMessageManage = () => {
    setMessageManageVisible(true)
  }

  const handleCloseMessageManage = () => {
    setMessageManageVisible(false)
    refreshMessages()
  }

  return (
    <div className="talk-content col-ctn">
      {contact ? (
        <>
          <div className="header v-center">
            <div>{contact.nickname}</div>
            <div className="ml-auto">
              <i className="i-tabler-dots"></i>
            </div>
          </div>
          <Spin
            wrapperClassName="ctn-body full-spin"
            className="full-ctn"
            spinning={loading}
          >
            <Split
              direction="vertical"
              gutterSize={6}
              sizes={[70, 30]}
              minSize={100}
              className="split full-ctn"
              cursor="/img/row-resize.png"
            >
              <Scrollbar
                options={{
                  scrollbars: { autoHide: 'scroll', autoHideDelay: 500 },
                }}
                className="content"
                ref={scrollbar}
              >
                {messages.map((d) => (
                  <MessageDisplay key={d.id} message={d}></MessageDisplay>
                ))}
              </Scrollbar>
              <div className="footer">
                <MessageInput
                  onSend={handleSendMessage}
                  tools={() => (
                    <>
                      <i
                        className="i-tabler-message-2"
                        onClick={handleMessageManage}
                      ></i>
                    </>
                  )}
                ></MessageInput>
              </div>
            </Split>
          </Spin>
        </>
      ) : (
        <EmptyInfo>
          <i className="i-tabler-message-circle-bolt"></i>
        </EmptyInfo>
      )}

      {messageManageVisible && (
        <MessageManage
          fromId={user.id}
          targetId={targetId}
          onClose={handleCloseMessageManage}
        ></MessageManage>
      )}
    </div>
  )
}
