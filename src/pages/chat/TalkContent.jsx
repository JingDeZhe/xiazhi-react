import { useRequest } from 'ahooks'
import { server } from './db/server'
import { useChatStore } from './store/main'
import Split from 'react-split'

export const TalkContent = ({ contactId }) => {
  const user = useChatStore((s) => s.user)
  const { data: contact, error } = useRequest(
    () => {
      return server.getUser(contactId)
    },
    { refreshDeps: [contactId] }
  )
  const { data: messages } = useRequest(
    () => {
      if (!user?.id) return []
      return server.getMessages(user.id, contactId)
    },
    { refreshDeps: [contactId, user] }
  )
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
            <div className="content">
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
            </div>
            <div className="footer"></div>
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
