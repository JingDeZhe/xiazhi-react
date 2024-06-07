import { Input } from 'antd'
import PinyinEngine from 'pinyin-engine'
import { Menu, Item, useContextMenu } from 'react-contexify'
import { server } from './db/server'
import { useNavigate } from 'react-router-dom'

export const TalkMenu = ({ contacts, contactId, onSelect, onRefresh }) => {
  const navigate = useNavigate()
  const [queryText, setQueryText] = useState('')

  const engine = useMemo(() => {
    return new PinyinEngine(contacts, ['alias'])
  }, [contacts])
  const handleQuery = (e) => {
    setQueryText(e.target.value)
  }
  const filteredContacts = engine.query(queryText)

  const CONTACT_MENU = 'TALK_CONTACT_MENU'
  const { show: showContactMenu } = useContextMenu({
    id: CONTACT_MENU,
  })
  let _menuId = ''
  const handleContactMenu = (e) => {
    _menuId = parseInt(e.currentTarget.dataset.id)
    showContactMenu({ event: e })
  }
  const handleContactMenuClick = ({ id }) => {
    if (id === 'hide') {
      server.deactiveContact(contactId).then(onRefresh)
    } else if (id === 'info') {
      navigate('../address-book', { state: { contactId } })
    }
  }

  return (
    <div className="talk-menu col-ctn border-r">
      <div className="talk-menu-search v-center">
        <Input
          value={queryText}
          onInput={handleQuery}
          placeholder="search"
        ></Input>
      </div>
      <Scrollbar
        className="ctn-body"
        options={{ scrollbars: { autoHide: 'scroll', autoHideDelay: 500 } }}
        defer
      >
        {filteredContacts.map((d) => {
          return (
            <div
              className={cls('avatar-info', {
                active: contactId === d.id,
              })}
              key={d.id}
              onClick={() => onSelect(d.id)}
              onContextMenu={handleContactMenu}
              data-id={d.id}
            >
              <img className="chat-avatar" src={d.avatar} />
              <div className="info">
                <div className="flex gap-2">
                  <span className="flex-1">{d.nickname}</span>
                  <span className="text-fade-2 truncate mr-1">
                    {d.lastMessageTime}
                  </span>
                </div>
                <div className="text-fade-1">{d.lastMessage}</div>
              </div>
            </div>
          )
        })}
      </Scrollbar>

      <Menu id={CONTACT_MENU}>
        <Item id="hide" onClick={handleContactMenuClick}>
          Hide
        </Item>
        <Item id="info" onClick={handleContactMenuClick}>
          Info
        </Item>
      </Menu>
    </div>
  )
}
