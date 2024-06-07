import { Button, Input } from 'antd'
import PinyinEngine from 'pinyin-engine'
import { Menu, Item, useContextMenu } from 'react-contexify'
import { useNavigate } from 'react-router-dom'

export const AddressMenu = ({ contacts, targetId, onSelect, onDelete }) => {
  const [queryText, setQueryText] = useState('')
  const navigate = useNavigate()

  const engine = useMemo(() => {
    return new PinyinEngine(contacts, ['nickname'])
  }, [contacts])
  const handleQuery = (e) => {
    setQueryText(e.target.value)
  }
  const filteredContacts = engine.query(queryText)

  const CONTACT_MENU = 'ADDRESS_CONTACT_MENU'
  const { show: showContactMenu } = useContextMenu({
    id: CONTACT_MENU,
  })
  let _menuTargetId = ''
  const handleContactMenu = (e) => {
    _menuTargetId = e.currentTarget.dataset.id
    showContactMenu({ event: e })
  }
  const handleContactMenuClick = ({ id }) => {
    if (id === 'chat') {
      onSelect(_menuTargetId)
      navigate('../talk', { state: { targetId: _menuTargetId } })
    } else if (id === 'delete') {
      onDelete(_menuTargetId)
    }
  }

  return (
    <div className="address-menu col-ctn border-r">
      <div className="address-menu-search v-center">
        <Input value={queryText} onInput={handleQuery}></Input>
        <Button>
          <i className="i-tabler-user-plus"></i>
        </Button>
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
                active: targetId === d.id,
              })}
              key={d.id}
              onClick={() => onSelect(d.id)}
              onContextMenu={handleContactMenu}
              data-id={d.id}
            >
              <img className="avatar" src={d.avatar} />
              <span className="flex-1">{d.nickname}</span>
            </div>
          )
        })}
      </Scrollbar>

      <Menu id={CONTACT_MENU}>
        <Item id="chat" onClick={handleContactMenuClick}>
          Chat
        </Item>
        <Item id="delete" onClick={handleContactMenuClick}>
          Delete
        </Item>
      </Menu>
    </div>
  )
}
