import { useRequest } from 'ahooks'
import { server } from './db/server'
import { useChatStore } from './store/main'

export const TalkContent = ({ contactId }) => {
  const user = useChatStore((s) => s.user)
  const { data: contact, error } = useRequest(
    () => {
      return server.getUser(contactId)
    },
    { refreshDeps: [contactId] }
  )
  return (
    <div className="talk-content">
      {contact ? (
        <>
          <div className="header">
            <div>{contact.nickname}</div>
          </div>
        </>
      ) : (
        <div className="full-ctn all-center text-zinc-300 text-[8rem]">
          <i className="i-tabler-message-circle-bolt"></i>
        </div>
      )}
    </div>
  )
}
