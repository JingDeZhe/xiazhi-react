import { useRequest } from 'ahooks'
import { server } from './db/server'
import { useChatStore } from './store/main'
import Split from 'react-split'
import { MessageInput } from './MessageInput'

export const TalkContent = ({ contactId }) => {
  const user = useChatStore((s) => s.user)
  const { data: contact } = useRequest(
    () => {
      return server.getUser(contactId)
    },
    { refreshDeps: [contactId] }
  )

  const scrollbar = useRef(null)
  const { data: messages, refresh: refreshMessage } = useRequest(
    () => {
      if (!user?.id) return []
      return server.getMessages(user.id, contactId)
    },
    { refreshDeps: [contactId, user] }
  )

  useEffect(() => {
    if (scrollbar.current) {
      const { viewport } = scrollbar.current.osInstance().elements()
      viewport.scrollTop = viewport.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (message) => {
    server.sendMessage(user.id, contactId, message).then(refreshMessage)
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
          <Split
            direction="vertical"
            gutterSize={6}
            sizes={[70, 30]}
            minSize={100}
            className="split ctn-body"
            cursor="/img/row-resize.png"
          >
            <Scrollbar
              options={{
                scrollbars: { autoHide: 'scroll', autoHideDelay: 500 },
              }}
              className="content"
              ref={scrollbar}
            >
              {messages.map((d) => {
                return (
                  <div className={cls('message', d.type)} key={d.id}>
                    <img
                      className="message-avatar"
                      src={d.type === 'self' ? user.avatar : contact.avatar}
                    />
                    <div className={cls('message-content', d.type)}>
                      {d.message}
                    </div>
                  </div>
                )
              })}
            </Scrollbar>
            <div className="footer">
              <MessageInput onSend={handleSendMessage}></MessageInput>
            </div>
          </Split>
        </>
      ) : (
        <div className="full-ctn all-center text-zinc-300 text-[8rem]">
          <i className="i-tabler-message-circle-bolt"></i>
        </div>
      )}
    </div>
  )
}
